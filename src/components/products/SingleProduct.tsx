"use client";

import { ProductImages } from "@/components/products/ProductImages";
import { ProductDocument, VariantsDocument } from "@/types/types";
import { Session } from "next-auth";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddToCart from "../cart/AddToCart";
interface SingleProduct {
  product: string;
  session: Session | null;
}

export const SingleProduct = ({ product, session }: SingleProduct) => {
  const productPlainObject: ProductDocument = JSON.parse(product);

  // merge product images into the first variant
  const initialVariant: VariantsDocument = {
    ...productPlainObject.variants[0],
    images: [
      ...(productPlainObject.variants[0].images || []),
      ...(productPlainObject.images || []),
    ],
  };

  const [selectedVariant, setSelectedVariant] =
    useState<VariantsDocument>(initialVariant);

  const selectVariant = (variant: VariantsDocument) => {
    setSelectedVariant({
      ...variant,
      images: [...(variant.images || []), ...(productPlainObject.images || [])],
    });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-wrap justify-between gap-8">
      <div className="grow-999 basis-0">
        <ProductImages
          name={productPlainObject.name}
          selectedVariant={selectedVariant}
        />
      </div>

      <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
        <div className="w-full border border-solid rounded border-border-primary bg-background-secondary">
          <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary">
            <h1 className="text-base font-semibold">
              {productPlainObject.name}
            </h1>
            <span className="text-sm">
              Start From {productPlainObject.price}IDR
            </span>
            <p className="text-sm">{productPlainObject.description}</p>
          </div>

          <AddToCart
            session={session}
            product={productPlainObject}
            selectedVariant={selectedVariant}
            setSelectedVariant={selectVariant} // <-- pass the helper
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">DESCRIPTION</AccordionTrigger>
            <AccordionContent>
              <p>
                IPAL BIOASAHI adalah solusi pengolahan air limbah berbahan
                fiberglass yang menggabungkan sistem fisika dan biologi untuk
                menghasilkan air yang sesuai dengan standar lingkungan. Unit ini
                menggunakan teknologi biakan bakteri melekat dengan media
                aerobik dan anaerobik untuk mengurangi kandungan BOD, COD, TSS,
                detergen, nitrat, dan pospat dalam air limbah. Hasilnya, air
                pasca olah memenuhi standar kualitas yang ditetapkan dalam
                Peraturan Menteri LHK Nomor 68 Tahun 2016, menjadikannya aman
                untuk dikembalikan ke lingkungan.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">USAGE</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                Air limbah dari berbagai sumber seperti kamar mandi, dapur, dan
                kloset, pertama kali melalui tahap penyaringan dan pre-treatment
                sebelum memasuki tanki IPAL. Di dalam tanki, air diproses
                melalui beberapa ruangan dengan fungsi berbeda, masing-masing
                berperan penting dalam degradasi biologis kontaminan air secara
                efisien. IPAL BIOASAHI dapat digunakan dalam pengolahan limbah
                domestik, medis, restoran, maupun industri.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">
              IPAL BIOASAHI
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                IPAL BIOASAHI adalah solusi pengolahan air limbah yang
                menggunakan bahan fiberglass berkualitas tinggi, menggabungkan
                proses fisika dan biologi untuk menghasilkan air yang memenuhi
                standar lingkungan. Teknologi yang diterapkan pada unit ini
                adalah biakan bakteri melekat dengan media aerobik dan
                anaerobik, yang dirancang untuk mengurangi kandungan bahan
                organik (BOD), bahan pencemar kimia (COD), padatan terlarut
                (TSS), detergen, nitrat, dan pospat dalam air limbah. Dengan
                proses pengolahan yang canggih ini, air pasca olah dapat
                memenuhi standar kualitas yang ditetapkan dalam Peraturan
                Menteri LHK Nomor 68 Tahun 2016, memastikan air yang aman untuk
                dikembalikan ke lingkungan.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
