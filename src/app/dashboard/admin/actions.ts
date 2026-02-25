"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSuperAdminSession } from "@/lib/roles";

const CODE_REGEX = /^[a-z0-9.-]+$/;

async function requireSuperAdmin() {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session || !isSuperAdminSession(session)) {
    redirect("/dashboard");
  }
  return { hdrs, session };
}

function getSafeErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return "Failed to create partner.";
}

export async function createPartnerAccount(formData: FormData) {
  const { hdrs } = await requireSuperAdmin();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const refCode = String(formData.get("refCode") ?? "")
    .trim()
    .toLowerCase();
  const refLabel = String(formData.get("refLabel") ?? "Primary").trim();

  if (!email || !companyName || !contactName || !refCode) {
    redirect("/dashboard/admin?error=All+fields+are+required");
  }

  if (refCode.length < 3 || refCode.length > 40 || !CODE_REGEX.test(refCode)) {
    redirect(
      "/dashboard/admin?error=Referral+code+must+be+3-40+chars+with+lowercase+letters,+numbers,+dots,+or+hyphens",
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    redirect("/dashboard/admin?error=User+with+this+email+already+exists");
  }

  const existingCode = await prisma.referralLink.findUnique({
    where: { code: refCode },
  });
  if (existingCode) {
    redirect("/dashboard/admin?error=Referral+code+already+exists");
  }

  try {
    const generatedPassword = crypto.randomBytes(24).toString("hex");

    const createUserResult = await auth.api.createUser({
      headers: hdrs,
      body: {
        email,
        password: generatedPassword,
        name: contactName,
        role: "partner",
      },
    });

    if (!createUserResult?.user?.id) {
      throw new Error("Failed to create auth user.");
    }

    const partner = await prisma.partner.create({
      data: {
        userId: createUserResult.user.id,
        companyName,
        contactName,
      },
    });

    await prisma.referralLink.create({
      data: {
        partnerId: partner.id,
        code: refCode,
        label: refLabel || "Primary",
      },
    });

    let magicLinkSent = true;
    try {
      await auth.api.signInMagicLink({
        headers: hdrs,
        body: {
          email,
          callbackURL: "/",
          errorCallbackURL: "/login",
        },
      });
    } catch {
      magicLinkSent = false;
    }

    revalidatePath("/dashboard/admin");
    if (magicLinkSent) {
      redirect("/dashboard/admin?success=1");
    }
    redirect("/dashboard/admin?success=1&warning=magic-link-not-sent");
  } catch (error) {
    const message = encodeURIComponent(getSafeErrorMessage(error));
    redirect(`/dashboard/admin?error=${message}`);
  }
}
