import { Footer } from "../components/Footer";
import { getLogPhotos } from "./actions";
import { PhotoGrid } from "./photo-grid";

// Force dynamic rendering - always fetch fresh data from blob storage
export const dynamic = "force-dynamic";

export default async function LogsPage() {
  const initialData = await getLogPhotos();

  return (
    <div className="min-h-screen bg-black">
      {/* Masonry Grid */}
      <main className="pt-28 md:pt-32 pb-12 px-2 md:px-4">
        <PhotoGrid initialData={initialData} />
      </main>

      <Footer />
    </div>
  );
}
