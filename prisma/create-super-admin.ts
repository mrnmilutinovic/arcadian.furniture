import "dotenv/config";
import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

async function main() {
  const [emailArg, passwordArg, nameArg] = process.argv.slice(2);

  const email = (emailArg ?? "").trim().toLowerCase();
  const password = (passwordArg ?? "").trim();
  const name = (nameArg ?? "Super Admin").trim();

  if (!email || !password) {
    console.log(
      "Usage: npx tsx prisma/create-super-admin.ts <email> <password> [name]",
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.log("Password must be at least 8 characters.");
    process.exit(1);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    const signUpResult = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!signUpResult?.user?.id) {
      console.log("Failed to create auth user.");
      process.exit(1);
    }

    await prisma.user.update({
      where: { id: signUpResult.user.id },
      data: { role: "super_admin" },
    });

    console.log(`Created super admin: ${email}`);
  } else {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { role: "super_admin" },
    });
    console.log(`Updated existing user to super_admin: ${email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
