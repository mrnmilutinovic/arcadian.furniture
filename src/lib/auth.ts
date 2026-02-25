import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { defaultRoles } from "better-auth/plugins/admin/access";
import { magicLink } from "better-auth/plugins/magic-link";
import { Resend } from "resend";
import { prisma } from "./prisma";

const authEmailFrom =
  process.env.AUTH_FROM_EMAIL ?? "Arcadian Login <hello@arcadiantables.com>";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  plugins: [
    admin({
      defaultRole: "partner",
      adminRoles: ["super_admin"],
      roles: {
        super_admin: defaultRoles.admin,
        partner: defaultRoles.user,
      },
    }),
    magicLink({
      expiresIn: 60 * 15,
      disableSignUp: true,
      sendMagicLink: async ({ email, url }) => {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          throw new Error("RESEND_API_KEY is not configured.");
        }

        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: authEmailFrom,
          to: email,
          subject: "Your Arcadian sign-in link",
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;line-height:1.6;color:#1a1918;">
              <h2 style="font-size:24px;margin-bottom:12px;">Sign in to Arcadian Partner Portal</h2>
              <p style="color:#555;">Use the button below to sign in. This link expires in a few minutes.</p>
              <p style="margin:24px 0;">
                <a href="${url}" style="display:inline-block;background:#d4c4a8;color:#1a1918;text-decoration:none;padding:10px 16px;border-radius:6px;font-weight:600;letter-spacing:0.04em;">Sign in</a>
              </p>
              <p style="color:#777;font-size:13px;">If the button does not work, copy this URL into your browser:</p>
              <p style="word-break:break-all;color:#444;font-size:13px;">${url}</p>
            </div>
          `,
        });
      },
    }),
    nextCookies(),
  ],
});
