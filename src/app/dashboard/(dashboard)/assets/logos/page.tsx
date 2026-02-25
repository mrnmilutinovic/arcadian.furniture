import { list } from "@vercel/blob";
import { LogosTabs } from "./LogosTabs";

interface LogoFile {
  url: string;
  pathname: string;
}

function getName(pathname: string) {
  const name = pathname.split("/").pop();
  return name ?? pathname;
}

function getPriority(pathname: string) {
  const name = getName(pathname).toLowerCase();
  if (name.includes("dark-background-logo")) return 0;
  if (name.includes("light-background-logo")) return 1;
  return 2;
}

function sortLogoFiles(files: LogoFile[]) {
  return [...files].sort((a, b) => {
    const aPriority = getPriority(a.pathname);
    const bPriority = getPriority(b.pathname);
    if (aPriority !== bPriority) return aPriority - bPriority;
    return getName(a.pathname).localeCompare(getName(b.pathname));
  });
}

export default async function LogosPage() {
  let files: LogoFile[] = [];
  let loadError = false;

  try {
    const result = await list({
      prefix: "branding/logo/",
      limit: 1000,
    });
    files = result.blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
    }));
  } catch {
    loadError = true;
  }

  const svgFiles = sortLogoFiles(
    files.filter((file) => file.pathname.toLowerCase().endsWith(".svg")),
  );
  const pngFiles = sortLogoFiles(
    files.filter((file) => file.pathname.toLowerCase().endsWith(".png")),
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Logos
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          Logos and brand marks loaded from Vercel Blob (`branding/logo`).
        </p>
      </div>

      <div className="w-full rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6">
        <div className="mb-5">
          <h2 className="font-serif text-lg text-[#f3f1ea]">Logo Library</h2>
        </div>
        {loadError ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-200/80">
            Could not load logos from Vercel Blob. Check blob access token and
            folder path `branding/logo/`.
          </div>
        ) : (
          <LogosTabs pngFiles={pngFiles} svgFiles={svgFiles} />
        )}
      </div>
    </div>
  );
}
