import { Hero } from "../../components/Hero";
import { FourColumnGrid } from "../../components/FourColumnGrid";
import { EditorialSplit } from "../../components/EditorialSplit";
import { VideoServices } from "../../components/VideoServices";

export function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <FourColumnGrid />
      <EditorialSplit />
      <VideoServices />
    </div>
  );
}
