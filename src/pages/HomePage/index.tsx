import ChakraCarousel from "@/components/Carousel";
import {Cards} from "@/components/Card";

export function HomePage() {
  return (
    <>
      <div className="text-center p-4">
        <ChakraCarousel />
      </div>
        <div><Cards /></div>
    </>
  );
}
