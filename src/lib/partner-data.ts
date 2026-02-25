import { prisma } from "./prisma";

export async function getPartnerByUserId(userId: string) {
  return prisma.partner.findUnique({
    where: { userId },
    include: {
      referralLinks: {
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function getPartnerWithLinks(partnerId: string) {
  return prisma.partner.findUnique({
    where: { id: partnerId },
    include: {
      referralLinks: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function getAllReferralCodes(partnerId: string) {
  const links = await prisma.referralLink.findMany({
    where: { partnerId, isActive: true },
    select: { code: true, label: true },
    orderBy: { createdAt: "asc" },
  });
  return links;
}
