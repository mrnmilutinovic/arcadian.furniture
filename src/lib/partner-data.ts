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

export async function getPartnerLinkCount(partnerId: string): Promise<number> {
  return prisma.referralLink.count({ where: { partnerId } });
}

export async function referralCodeExists(code: string): Promise<boolean> {
  const link = await prisma.referralLink.findUnique({ where: { code } });
  return link !== null;
}
