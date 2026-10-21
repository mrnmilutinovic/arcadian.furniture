import { list } from "@vercel/blob";
import { ArrowDownToLineIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  BLOB_LOGO_PREFIX,
  BLOB_PHOTO_PREFIX,
  BLOB_PHOTO_THUMBS_PREFIX,
  boilerplate,
  brandColors,
  brandFonts,
  logoColors,
  talkingPoints,
  voiceTraits,
} from "@/lib/brand";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Footer } from "../../components/Footer";
import { CopyButton } from "./CopyButton";

export const metadata: Metadata = {
  title: "Brand Guidelines & Press Kit | Arcadian",
  description:
    "Download Arcadian logos, colors, typography and product photography. Guidelines for press, partners and creators featuring Arcadian board game tables.",
  alternates: {
    canonical: "/brand",
  },
  openGraph: {
    title: "Brand Guidelines & Press Kit | Arcadian",
    description:
      "Logos, colors, typography and product photography for press, partners and creators.",
    type: "website",
  },
};

// Always list the latest assets from blob storage
export const dynamic = "force-dynamic";

interface LogoVariant {
  name: string;
  previewUrl: string;
  files: { format: string; name: string; url: string }[];
}

interface DownloadFile {
  name: string;
  url: string;
  thumbnailUrl: string;
}

const coreLogos = [
  {
    name: "Arcadian Wordmark",
    file: "/focus-logo.svg",
    description: "Primary horizontal lockup",
  },
  {
    name: "Arcadian Mark",
    file: "/new-logo.svg",
    description: "Standalone symbol",
  },
  {
    name: "App Icon",
    file: "/arcadian-icon.svg",
    description: "Circular avatar / profile image",
  },
];

const logoDos = [
  "Place the logo on Ink or dark photography for maximum contrast.",
  "Keep clear space around the logo equal to the height of the mark's crown.",
  "Use the provided SVG files whenever possible; PNG for slides and social.",
];

const logoDonts = [
  "Stretch, rotate, or skew the logo.",
  "Recolor the logo outside the provided versions.",
  "Add shadows, outlines, gradients or other effects.",
  "Place the logo on busy backgrounds where it loses legibility.",
];

function getName(pathname: string) {
  return pathname.split("/").pop() ?? pathname;
}

function getBaseName(pathname: string) {
  return getName(pathname)
    .replace(/\.[^.]+$/, "")
    .toLowerCase();
}

async function getBlobAssets() {
  try {
    const [logoResult, photoResult] = await Promise.all([
      list({ prefix: BLOB_LOGO_PREFIX, limit: 1000 }),
      list({ prefix: BLOB_PHOTO_PREFIX, limit: 1000 }),
    ]);

    // Group SVG + PNG exports of the same logo into one variant
    const variants = new Map<string, LogoVariant>();
    for (const blob of logoResult.blobs) {
      const name = getName(blob.pathname);
      const match = name.match(/^(.+?)(@\dx)?\.(svg|png)$/i);
      if (!match) continue;
      const key = match[1].toLowerCase();
      const format = match[3].toUpperCase();
      const variant = variants.get(key) ?? {
        name: key,
        previewUrl: blob.url,
        files: [],
      };
      if (format === "SVG") variant.previewUrl = blob.url;
      variant.files.push({ format, name, url: blob.url });
      variants.set(key, variant);
    }
    const logos = [...variants.values()]
      .map((variant) => ({
        ...variant,
        files: variant.files.sort((a, b) => b.format.localeCompare(a.format)),
      }))
      .sort((a, b) => {
        const priority = (name: string) =>
          name.endsWith("background-logo") ? 0 : 1;
        return (
          priority(a.name) - priority(b.name) ||
          a.name.localeCompare(b.name, undefined, { numeric: true })
        );
      });

    const images = photoResult.blobs.filter((blob) =>
      /\.(jpe?g|png|webp|avif)$/i.test(blob.pathname),
    );
    const thumbnails = new Map(
      images
        .filter((blob) => blob.pathname.startsWith(BLOB_PHOTO_THUMBS_PREFIX))
        .map((blob) => [getBaseName(blob.pathname), blob.url]),
    );
    const photos: DownloadFile[] = images
      .filter((blob) => !blob.pathname.startsWith(BLOB_PHOTO_THUMBS_PREFIX))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .map((blob) => ({
        name: getName(blob.pathname),
        url: blob.url,
        thumbnailUrl: thumbnails.get(getBaseName(blob.pathname)) ?? blob.url,
      }));

    return { logos, photos };
  } catch {
    return { logos: [], photos: [] };
  }
}

function SectionHeader({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 md:mb-14 grid gap-4 md:grid-cols-[120px_1fr]">
      <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
        {index}
      </span>
      <div>
        <h2 className="font-serif text-4xl md:text-5xl mb-3">{title}</h2>
        <p className="font-sans text-lg text-ink/60 max-w-2xl">{description}</p>
      </div>
    </div>
  );
}

function DownloadLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/60 transition-colors hover:text-accent"
      download={name}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      Download
      <ArrowDownToLineIcon className="size-3" />
    </a>
  );
}

export default async function BrandPage() {
  const { logos, photos } = await getBlobAssets();

  return (
    <div className="min-h-screen bg-paper">
      <header className="pt-28 md:pt-36 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Brand" }]}
          />
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            Brand <span className="italic text-ink/50">Guidelines</span>
          </h1>
          <p className="font-sans text-xl text-ink/60 max-w-2xl mb-10">
            Everything you need to feature Arcadian — logos, colors, typography,
            photography and copy. Free to use for press, partners and creators
            writing about Arcadian.
          </p>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest text-ink/50">
            <a className="hover:text-accent transition-colors" href="#logo">
              01 Logo
            </a>
            <a className="hover:text-accent transition-colors" href="#color">
              02 Color
            </a>
            <a
              className="hover:text-accent transition-colors"
              href="#typography"
            >
              03 Typography
            </a>
            <a className="hover:text-accent transition-colors" href="#voice">
              04 Voice
            </a>
            <a className="hover:text-accent transition-colors" href="#about">
              05 About Arcadian
            </a>
            <a
              className="hover:text-accent transition-colors"
              href="#photography"
            >
              06 Photography
            </a>
          </nav>
        </div>
      </header>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto divide-y divide-ink/10 border-t border-ink/10">
          {/* Logo */}
          <section className="py-16 md:py-24 scroll-mt-24" id="logo">
            <SectionHeader
              description="The laurel-crowned head is the heart of our identity. Always use the original files — never redraw or recreate the mark."
              index="01"
              title="Logo"
            />

            <div className="grid gap-4 md:grid-cols-3 mb-12">
              {coreLogos.map((logo) => (
                <div key={logo.file}>
                  <div className="relative mb-4 flex aspect-[4/3] items-center justify-center rounded-sm bg-[#181818] p-10">
                    <Image
                      alt={logo.name}
                      className="max-h-full w-auto object-contain"
                      height={160}
                      src={logo.file}
                      unoptimized
                      width={320}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-xl">{logo.name}</p>
                      <p className="font-sans text-sm text-ink/50">
                        {logo.description} · SVG
                      </p>
                    </div>
                    <DownloadLink href={logo.file} name={getName(logo.file)} />
                  </div>
                </div>
              ))}
            </div>

            {logos.length > 0 && (
              <div className="mb-12">
                <h3 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-4">
                  All logo variants
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {logos.map((logo) => (
                    <div key={logo.name}>
                      <div
                        className={`relative mb-3 aspect-[4/3] rounded-sm border border-ink/10 ${
                          logo.name.startsWith("light-background")
                            ? "bg-paper"
                            : "bg-[#181818]"
                        }`}
                      >
                        <Image
                          alt={logo.name}
                          className="object-contain p-5"
                          fill
                          sizes="(min-width: 768px) 25vw, 50vw"
                          src={logo.previewUrl}
                        />
                      </div>
                      <p className="truncate font-sans text-sm mb-1">
                        {logo.name}
                      </p>
                      <div className="flex gap-4">
                        {logo.files.map((file) => (
                          <a
                            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-ink/60 transition-colors hover:text-accent"
                            download={file.name}
                            href={file.url}
                            key={file.url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {file.format}
                            <ArrowDownToLineIcon className="size-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-ink/10 p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 mb-4">
                  Do
                </p>
                <ul className="space-y-3 font-sans text-ink/70">
                  {logoDos.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-ink/10 p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4">
                  Don&apos;t
                </p>
                <ul className="space-y-3 font-sans text-ink/70">
                  {logoDonts.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Color */}
          <section className="py-16 md:py-24 scroll-mt-24" id="color">
            <SectionHeader
              description="Earthy, warm and timeless — drawn from oak, paper and the felt of a well-loved game table. Accent is used sparingly."
              index="02"
              title="Color"
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[...brandColors, ...logoColors].map((color) => (
                <div key={color.name}>
                  <div
                    className="mb-3 aspect-square rounded-sm border border-ink/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="font-serif text-xl">{color.name}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase text-ink/60">
                      {color.hex}
                    </span>
                    <CopyButton className="text-ink/40" value={color.hex} />
                  </div>
                  <p className="mt-1 font-sans text-sm text-ink/50">
                    {color.usage}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="py-16 md:py-24 scroll-mt-24" id="typography">
            <SectionHeader
              description="All typefaces are free on Google Fonts. Headlines are set in serif, often with an italic accent word."
              index="03"
              title="Typography"
            />
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {brandFonts.map((font) => (
                <div
                  className="grid gap-2 py-8 md:grid-cols-[120px_1fr_auto] md:items-baseline md:gap-8"
                  key={font.name}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                    {font.role}
                  </span>
                  <div>
                    <p className={`${font.className} text-4xl md:text-5xl`}>
                      {font.name}
                    </p>
                    <p className="mt-2 font-sans text-sm text-ink/50">
                      {font.description}
                    </p>
                  </div>
                  <a
                    className="font-mono text-[10px] uppercase tracking-widest text-ink/60 transition-colors hover:text-accent"
                    href={font.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Google Fonts ↗
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Voice */}
          <section className="py-16 md:py-24 scroll-mt-24" id="voice">
            <SectionHeader
              description="How Arcadian sounds — like a host welcoming friends to game night."
              index="04"
              title="Voice"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {voiceTraits.map((item) => (
                <div className="border border-ink/10 p-6" key={item.trait}>
                  <h3 className="font-serif text-2xl mb-2">{item.trait}</h3>
                  <p className="font-sans text-ink/60 mb-6">
                    {item.description}
                  </p>
                  <div className="space-y-3 font-serif text-lg italic">
                    <p>
                      <span className="mr-3 font-mono text-[10px] not-italic uppercase tracking-widest text-emerald-700">
                        Do
                      </span>
                      &ldquo;{item.do}&rdquo;
                    </p>
                    <p className="text-ink/50">
                      <span className="mr-3 font-mono text-[10px] not-italic uppercase tracking-widest text-accent">
                        Don&apos;t
                      </span>
                      &ldquo;{item.dont}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About */}
          <section className="py-16 md:py-24 scroll-mt-24" id="about">
            <SectionHeader
              description="Ready-to-use copy for articles, listings and partner pages."
              index="05"
              title="About Arcadian"
            />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-clay p-6 md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                    Boilerplate
                  </p>
                  <CopyButton className="text-ink/60" value={boilerplate} />
                </div>
                <p className="font-sans text-lg leading-relaxed text-ink/80">
                  {boilerplate}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-4">
                  Key messages
                </p>
                <ol className="space-y-4">
                  {talkingPoints.map((point, i) => (
                    <li className="flex gap-4" key={point}>
                      <span className="font-mono text-xs text-ink/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-sans text-ink/70">{point}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Photography */}
          <section className="py-16 md:py-24 scroll-mt-24" id="photography">
            <SectionHeader
              description="High-resolution product photography. Please credit “Arcadian” when publishing."
              index="06"
              title="Photography"
            />
            {photos.length === 0 ? (
              <p className="font-sans text-ink/50">
                Photography is being updated. Email{" "}
                <a
                  className="text-accent"
                  href="mailto:hello@arcadiantables.com"
                >
                  hello@arcadiantables.com
                </a>{" "}
                for high-resolution images.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {photos.map((photo) => (
                  <a
                    className="group relative aspect-[4/3] overflow-hidden bg-clay"
                    download={photo.name}
                    href={photo.url}
                    key={photo.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt={photo.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      src={photo.thumbnailUrl}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="truncate font-sans text-xs">
                        {photo.name}
                      </span>
                      <ArrowDownToLineIcon className="size-4 shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Contact */}
          <section className="py-16 md:py-24">
            <div className="grid gap-4 md:grid-cols-[120px_1fr]">
              <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Press
              </span>
              <div>
                <p className="font-serif text-3xl md:text-4xl mb-4">
                  Need something else?{" "}
                  <span className="italic text-ink/50">
                    Interviews, samples or custom assets.
                  </span>
                </p>
                <a
                  className="font-mono text-sm uppercase tracking-widest text-accent hover:underline underline-offset-4"
                  href="mailto:hello@arcadiantables.com"
                >
                  hello@arcadiantables.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
