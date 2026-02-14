# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Arcadian gaming tables Next.js 16 application. The integration includes:

- **Client-side initialization** via `instrumentation-client.ts` using the Next.js 16 instrumentation API
- **Server-side tracking** via `src/lib/posthog-server.ts` for server actions
- **Reverse proxy configuration** in `next.config.ts` to bypass ad blockers
- **Environment variables** stored securely in `.env.local`
- **15 custom events** tracking key user interactions across the conversion funnel

## Events Instrumented

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `newsletter_subscribed` | User subscribes to email updates via the newsletter form | `src/app/actions/subscribe.ts` |
| `newsletter_subscription_failed` | Newsletter subscription attempt failed due to an error | `src/app/actions/subscribe.ts` |
| `order_submitted` | User successfully submits an order for a gaming table | `src/app/actions/submitOrder.ts` |
| `order_submission_failed` | Order submission failed due to validation or server error | `src/app/actions/submitOrder.ts` |
| `table_size_selected` | User selects a table size (standard or grand) in the order form | `src/app/[locale]/order/OrderForm.tsx` |
| `finish_color_selected` | User selects a wood finish color (dawn or shadow) | `src/app/[locale]/order/OrderForm.tsx` |
| `felt_color_selected` | User selects a felt color in the order form | `src/app/[locale]/order/OrderForm.tsx` |
| `extra_felt_added` | User adds an extra felt to their order | `src/app/[locale]/order/OrderForm.tsx` |
| `reserve_table_clicked` | User clicks the reserve table CTA button from pricing section | `src/app/components/PricingSection.tsx` |
| `hero_cta_clicked` | User clicks the main CTA button in the hero section | `src/app/components/Hero.tsx` |
| `instagram_link_clicked` | User clicks the Instagram link in the footer | `src/app/components/Footer.tsx` |
| `language_switched` | User switches the site language | `src/app/components/LanguageSwitcher.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- **Analytics basics**: [https://eu.posthog.com/project/114628/dashboard/524827](https://eu.posthog.com/project/114628/dashboard/524827)

### Insights
1. **Newsletter to Order Conversion Funnel**: [https://eu.posthog.com/project/114628/insights/raoOoqF3](https://eu.posthog.com/project/114628/insights/raoOoqF3)
2. **Orders & Newsletter Subscriptions Over Time**: [https://eu.posthog.com/project/114628/insights/uqlTCXhR](https://eu.posthog.com/project/114628/insights/uqlTCXhR)
3. **Table Size Preference**: [https://eu.posthog.com/project/114628/insights/esVMxj4F](https://eu.posthog.com/project/114628/insights/esVMxj4F)
4. **CTA Click Performance**: [https://eu.posthog.com/project/114628/insights/iJIcVdec](https://eu.posthog.com/project/114628/insights/iJIcVdec)
5. **Error Events Monitor**: [https://eu.posthog.com/project/114628/insights/uCmoPGGv](https://eu.posthog.com/project/114628/insights/uCmoPGGv)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
