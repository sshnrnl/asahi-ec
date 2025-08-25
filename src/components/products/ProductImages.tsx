"use client";

import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Images } from "./Images";
import { VariantsDocument } from "@/types/types";

interface ProductImages {
  name: string;
  selectedVariant: VariantsDocument | undefined;
}

export const ProductImages = ({ name, selectedVariant }: ProductImages) => {
  if (!selectedVariant || !selectedVariant.images) {
    return (
      <Skeleton className="w-full rounded-b-none aspect-square min-w-[250px] lg:min-w-[560px]" />
    );
  }

  return (
    <>
      <div className="flex lg:hidden">
        <Carousel
          className="w-full min-w-[250px] rounded-md overflow-hidden"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {selectedVariant.images.map(
              (image: { url: string; alt: string }, index: number) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="aspect-square w-full">
                    <Images
                      url={image.url}
                      alt={image.alt}
                      name={`${name} ${selectedVariant.color} - Image ${
                        index + 1
                      }`}
                      width={576}
                      height={576}
                      priority={index === 0}
                      sizes="(max-width: 994px) 100vw,
                      (max-width: 1304px) 50vw,
                      (max-width: 1500px) 25vw,
                      33vw"
                    />
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="lg:grid hidden grid-cols-2 gap-0.5 min-w-grid-img">
        {selectedVariant.images.map(
          (image: { url: string; alt: string }, index: number) => (
            <div
              className="inline-block w-full overflow-hidden rounded aspect-square"
              key={index}
            >
              <Images
                url={image.url}
                alt={image.alt}
                name={`${name} ${selectedVariant.color} - Image ${index + 1}`}
                width={850}
                height={850}
                priority={true}
                sizes="(max-width: 1024px) 100vw,
                (max-width: 1300px) 50vw,
                (max-width: 1536px) 33vw"
              />
            </div>
          )
        )}
      </div>
    </>
  );
};
