"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  getPartnerByUserId,
  getPartnerLinkCount,
  referralCodeExists,
} from "@/lib/partner-data";
import { prisma } from "@/lib/prisma";

const CODE_REGEX = /^[a-z0-9-]+$/;
const MAX_LINKS = 10;

async function getAuthenticatedPartner() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");
  const partner = await getPartnerByUserId(session.user.id);
  if (!partner) throw new Error("Partner not found");
  return partner;
}

export async function createReferralLink(formData: {
  label: string;
  code?: string;
}) {
  const partner = await getAuthenticatedPartner();

  const count = await getPartnerLinkCount(partner.id);
  if (count >= MAX_LINKS) {
    return { error: "Maximum of 10 referral links reached." };
  }

  const label = formData.label.trim();
  if (!label) {
    return { error: "Label is required." };
  }

  let code = formData.code?.trim().toLowerCase() || "";
  if (!code) {
    code = crypto.randomBytes(4).toString("hex");
  }

  if (code.length < 3 || code.length > 40) {
    return { error: "Code must be between 3 and 40 characters." };
  }
  if (!CODE_REGEX.test(code)) {
    return {
      error: "Code can only contain lowercase letters, numbers, and hyphens.",
    };
  }

  if (await referralCodeExists(code)) {
    return { error: "This referral code is already in use." };
  }

  await prisma.referralLink.create({
    data: {
      partnerId: partner.id,
      code,
      label,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function toggleReferralLink(id: string) {
  const partner = await getAuthenticatedPartner();

  const link = await prisma.referralLink.findUnique({ where: { id } });
  if (!link || link.partnerId !== partner.id) {
    return { error: "Link not found." };
  }

  await prisma.referralLink.update({
    where: { id },
    data: { isActive: !link.isActive },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteReferralLink(id: string) {
  const partner = await getAuthenticatedPartner();

  const link = await prisma.referralLink.findUnique({ where: { id } });
  if (!link || link.partnerId !== partner.id) {
    return { error: "Link not found." };
  }

  const activeCount = await prisma.referralLink.count({
    where: { partnerId: partner.id, isActive: true },
  });
  if (link.isActive && activeCount <= 1) {
    return { error: "You must keep at least one active link." };
  }

  await prisma.referralLink.delete({ where: { id } });

  revalidatePath("/dashboard");
  return { success: true };
}
