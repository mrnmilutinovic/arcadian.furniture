const SUPER_ADMIN_ROLE = "super_admin";

function readRole(user: unknown): string | null {
  if (!user || typeof user !== "object") return null;
  if (!("role" in user)) return null;
  const role = (user as { role?: unknown }).role;
  return typeof role === "string" ? role : null;
}

export function isSuperAdminUser(user: unknown): boolean {
  return readRole(user) === SUPER_ADMIN_ROLE;
}

export function isSuperAdminSession(
  session: { user?: unknown } | null | undefined,
): boolean {
  return isSuperAdminUser(session?.user);
}
