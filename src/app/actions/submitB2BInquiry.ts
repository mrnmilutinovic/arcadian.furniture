"use server";

import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";

export interface B2BState {
  success: boolean;
  message: string;
}

const INQUIRY_LABELS: Record<string, string> = {
  retailer: "Become a Retailer",
  distributor: "Become a Distributor",
  club: "Order for a Club/Venue",
  rental: "Long-term Rental for a Club/Venue",
};

export async function submitB2BInquiry(
  _prevState: B2BState,
  formData: FormData,
): Promise<B2BState> {
  const inquiryType = (formData.get("inquiryType") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!inquiryType || !company || !name || !email) {
    return { success: false, message: "required" };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return { success: false, message: "email" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey || !ownerEmail) {
    console.error("RESEND_API_KEY or OWNER_EMAIL is not configured");
    return { success: false, message: "generic" };
  }

  const resend = new Resend(apiKey);
  const inquiryLabel = INQUIRY_LABELS[inquiryType] || inquiryType;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Arcadian B2B <b2b@arcadiantables.com>",
        to: ownerEmail,
        subject: `New B2B Inquiry: ${inquiryLabel} — ${company}`,
        html: `
          <h2>New B2B Inquiry</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Inquiry Type</td><td style="padding:8px 0;font-weight:600;">${inquiryLabel}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Company</td><td style="padding:8px 0;font-weight:600;">${company}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Contact Person</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Email</td><td style="padding:8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px 16px 8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>` : ""}
            ${message ? `<tr><td style="padding:8px 16px 8px 0;color:#666;">Message</td><td style="padding:8px 0;">${message}</td></tr>` : ""}
          </table>
          <p style="margin-top:24px;color:#999;font-size:12px;">Submitted at ${new Date().toISOString()}</p>
        `,
      }),
      resend.emails.send({
        from: "Arcadian <hello@arcadiantables.com>",
        to: email,
        subject: "Thank you for your B2B inquiry",
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
            <h2 style="font-size:24px;">Thank you, ${name}!</h2>
            <p style="color:#555;line-height:1.6;">We've received your B2B inquiry regarding <strong>${inquiryLabel.toLowerCase()}</strong> for <strong>${company}</strong>.</p>
            <p style="color:#555;line-height:1.6;">Our team will review your request and get back to you within 48 hours to discuss next steps.</p>
            <table style="border-collapse:collapse;margin:24px 0;width:100%;border-top:1px solid #eee;">
              <tr><td style="padding:12px 0;color:#666;border-bottom:1px solid #eee;">Inquiry Type</td><td style="padding:12px 0;text-align:right;font-weight:600;border-bottom:1px solid #eee;">${inquiryLabel}</td></tr>
              <tr><td style="padding:12px 0;color:#666;border-bottom:1px solid #eee;">Company</td><td style="padding:12px 0;text-align:right;border-bottom:1px solid #eee;">${company}</td></tr>
              <tr><td style="padding:12px 0;color:#666;">Contact</td><td style="padding:12px 0;text-align:right;">${name}</td></tr>
            </table>
            <p style="color:#999;font-size:13px;line-height:1.5;">If you have any questions, just reply to this email or reach out at hello@arcadiantables.com.</p>
            <p style="color:#999;font-size:13px;">— The Arcadian Team</p>
          </div>
        `,
      }),
    ]);

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: "b2b_inquiry_submitted",
      properties: {
        inquiry_type: inquiryType,
        inquiry_label: inquiryLabel,
        company,
        contact_name: name,
        phone: phone || undefined,
        has_message: !!message,
      },
    });

    posthog.identify({
      distinctId: email,
      properties: {
        email,
        name,
        company,
        phone: phone || undefined,
        b2b_inquiry_at: new Date().toISOString(),
        b2b_inquiry_type: inquiryType,
      },
    });

    await posthog.flush();

    return { success: true, message: "success" };
  } catch (error) {
    console.error("B2B inquiry submission error:", error);

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email || "anonymous",
      event: "b2b_inquiry_failed",
      properties: {
        inquiry_type: inquiryType,
        error_message: error instanceof Error ? error.message : "Unknown error",
      },
    });

    await posthog.flush();

    return { success: false, message: "generic" };
  }
}
