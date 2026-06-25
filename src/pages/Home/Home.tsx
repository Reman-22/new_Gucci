import { Hero } from "../../components/Hero";
import { FourColumnGrid } from "../../components/FourColumnGrid";
import { EditorialSplit } from "../../components/EditorialSplit";
import { VideoServices } from "../../components/VideoServices";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export function Home() {
  useDocumentTitle("Luxury Handmade Collection");

  return (
    <div className="bg-white">
      <Hero />
      <FourColumnGrid />
      <EditorialSplit />
      <VideoServices />
    </div>
  );
}
