import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const allowedRoles = new Set(["partner", "super_admin"]);

async function main() {
  const [emailArg, roleArg] = process.argv.slice(2);
  const email = (emailArg ?? "").trim().toLowerCase();
  const role = (roleArg ?? "").trim().toLowerCase();

  if (!email || !role) {
    console.log(
      "Usage: npx tsx prisma/set-user-role.ts <email> <partner|super_admin>",
    );
    process.exit(1);
  }

  if (!allowedRoles.has(role)) {
    console.log("Role must be one of: partner, super_admin");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log(`User not found: ${email}`);
    process.exit(1);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { role },
  });

  console.log(`Updated ${email} -> role=${role}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
