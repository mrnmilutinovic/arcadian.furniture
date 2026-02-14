"use server";

import { Resend } from "resend";

export interface OrderState {
  success: boolean;
  message: string;
}

const FELT_NAMES: Record<string, string> = {
  "light-blue": "Light Blue",
  blue: "Blue",
  red: "Red",
  green: "Green",
  "light-green": "Light Green",
  lime: "Lime",
  petrol: "Petrol",

  yellow: "Yellow",
  antracit: "Anthracite",
};

export async function submitOrder(
  _prevState: OrderState,
  formData: FormData,
): Promise<OrderState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const tableSize = formData.get("tableSize") as string;
  const finishColor = formData.get("finishColor") as string;
  const feltColor = formData.get("feltColor") as string;
  const extraFeltCount = Number(formData.get("extraFeltCount") || 0);
  const extraFeltColors = formData.getAll("extraFeltColors") as string[];
  const ref = (formData.get("ref") as string)?.trim() || "";

  if (!name || !email || !phone || !tableSize || !finishColor || !feltColor) {
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

  const tableName = tableSize === "grand" ? "The Grand" : "The Standard";
  const extraFeltUnitPrice = tableSize === "grand" ? 30 : 20;
  const extraFeltTotal = extraFeltCount * extraFeltUnitPrice;
  const basePrice = tableSize === "grand" ? 2390 : 1920;
  const totalPrice = basePrice + extraFeltTotal;
  const tablePrice = `€${totalPrice.toLocaleString("en-IE")}`;
  const finishName =
    finishColor === "shadow" ? "Pan's Shadow" : "Arcadian Dawn";
  const feltName = FELT_NAMES[feltColor] || feltColor;

  const extraFeltRows = extraFeltColors
    .map(
      (c, i) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#666;">Extra Felt #${i + 1}</td><td style="padding:8px 0;">${FELT_NAMES[c] || c}</td></tr>`,
    )
    .join("");

  const extraFeltCustomerRows = extraFeltColors
    .map(
      (c, i) =>
        `<tr><td style="padding:12px 0;color:#666;border-bottom:1px solid #eee;">Extra Felt #${i + 1}</td><td style="padding:12px 0;text-align:right;border-bottom:1px solid #eee;">${FELT_NAMES[c] || c}</td></tr>`,
    )
    .join("");

  try {
    await Promise.all([
      // Owner notification
      resend.emails.send({
        from: "Arcadian Orders <orders@arcadiantables.com>",
        to: ownerEmail,
        subject: `New Order: ${tableName} — ${name}`,
        html: `
          <h2>New Order Received</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Email</td><td style="padding:8px 0;">${email}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Table</td><td style="padding:8px 0;font-weight:600;">${tableName} — ${tablePrice}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Finish</td><td style="padding:8px 0;">${finishName}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;color:#666;">Felt</td><td style="padding:8px 0;">${feltName}</td></tr>
            ${extraFeltRows}
            ${extraFeltCount > 0 ? `<tr><td style="padding:8px 16px 8px 0;color:#666;">Extra Felts</td><td style="padding:8px 0;">${extraFeltCount} × €${extraFeltUnitPrice} = €${extraFeltTotal}</td></tr>` : ""}
            ${ref ? `<tr><td style="padding:8px 16px 8px 0;color:#666;">Referred by</td><td style="padding:8px 0;font-weight:600;">${ref}</td></tr>` : ""}
          </table>
          <p style="margin-top:24px;color:#999;font-size:12px;">Submitted at ${new Date().toISOString()}</p>
        `,
      }),
      // Customer confirmation
      resend.emails.send({
        from: "Arcadian <hello@arcadiantables.com>",
        to: email,
        subject: "Your Arcadian Order Confirmation",
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
            <h2 style="font-size:24px;">Thank you, ${name}!</h2>
            <p style="color:#555;line-height:1.6;">We've received your order for the <strong>${tableName}</strong> in <strong>${finishName}</strong> with <strong>${feltName}</strong> felt${extraFeltCount > 0 ? ` and ${extraFeltCount} extra felt${extraFeltCount > 1 ? "s" : ""}` : ""}.</p>
            <p style="color:#555;line-height:1.6;">No payment has been taken yet. We'll be in touch shortly to confirm your spot in the 2026 Q1 batch and arrange payment details.</p>
            <table style="border-collapse:collapse;margin:24px 0;width:100%;border-top:1px solid #eee;">
              <tr><td style="padding:12px 0;color:#666;border-bottom:1px solid #eee;">Table</td><td style="padding:12px 0;text-align:right;font-weight:600;border-bottom:1px solid #eee;">${tableName}</td></tr>
              <tr><td style="padding:12px 0;color:#666;border-bottom:1px solid #eee;">Finish</td><td style="padding:12px 0;text-align:right;border-bottom:1px solid #eee;">${finishName}</td></tr>
              <tr><td style="padding:12px 0;color:#666;border-bottom:1px solid #eee;">Felt</td><td style="padding:12px 0;text-align:right;border-bottom:1px solid #eee;">${feltName}</td></tr>
              ${extraFeltCustomerRows}
              <tr><td style="padding:12px 0;color:#666;border-bottom:1px solid #eee;">Price</td><td style="padding:12px 0;text-align:right;font-weight:600;border-bottom:1px solid #eee;">${tablePrice}</td></tr>
              <tr><td style="padding:12px 0;color:#666;">Est. Delivery</td><td style="padding:12px 0;text-align:right;">Q3 2026</td></tr>
            </table>
            <p style="color:#999;font-size:13px;line-height:1.5;">If you have any questions, just reply to this email or reach out at hello@arcadiantables.com.</p>
            <p style="color:#999;font-size:13px;">— The Arcadian Team</p>
          </div>
        `,
      }),
    ]);

    return {
      success: true,
      message: "success",
    };
  } catch (error) {
    console.error("Order submission error:", error);
    return { success: false, message: "generic" };
  }
}
