import "dotenv/config";
import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 4) {
    console.log(
      "Usage: npx tsx prisma/seed-partner.ts <email> <password> <companyName> <refCode> [contactName] [refLabel]",
    );
    process.exit(1);
  }

  const email = args[0] as string;
  const password = args[1] as string;
  const companyName = args[2] as string;
  const refCode = args[3] as string;
  const contactName = args[4] ?? companyName;
  const refLabel = args[5] ?? "Primary";

  console.log(`Creating partner account for ${email}...`);

  // Create user via Better Auth (handles password hashing)
  const signUpResult = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: contactName,
    },
  });

  if (!signUpResult?.user) {
    console.error("Failed to create user");
    process.exit(1);
  }

  const userId = signUpResult.user.id;
  console.log(`User created: ${userId}`);

  // Create Partner record
  const partner = await prisma.partner.create({
    data: {
      userId,
      companyName,
      contactName,
    },
  });
  console.log(`Partner created: ${partner.id}`);

  // Create ReferralLink
  const link = await prisma.referralLink.create({
    data: {
      partnerId: partner.id,
      code: refCode,
      label: refLabel,
    },
  });
  console.log(`Referral link created: ${link.code}`);

  console.log("\nDone! Partner can now log in at /dashboard/login");
  console.log(`Referral URL: https://www.arcadiantables.com/?ref=${refCode}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
