import { SingleProduct } from "@/components/products/SingleProduct";
import { Products } from "@/components/products/Products";
import { getProduct, getRandomProducts } from "@/app/actions";
import { ProductDocument } from "@/types/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { Suspense } from "react";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import SingleProductSkeleton from "@/components/skeletons/SingleProductSkeleton";
import Script from "next/script";

type Props = {
  params: {
    id: string;
  };
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export async function generateMetadata({ params }: Props) {
  const product: ProductDocument = await getProduct(params.id);
  const capitalizedName = capitalizeFirstLetter(product.name);

  return {
    title: `${capitalizedName} | PT ASAHI FIBREGLASS`,
    description: product.meta?.description || product.description,
    keywords: product.meta?.keywords,
  };
}

const ProductPage = async ({ params }: Props) => {
  const product: ProductDocument = await getProduct(params.id);
  const capitalizedName = capitalizeFirstLetter(product.name);

  const schemaOrgProduct = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: capitalizedName,
    image: product.images.map(
      (img) => `${process.env.NEXT_PUBLIC_APP_URL}/product/thumbnail/${img.url}`
    ),
    description: product.description || "",
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand || "PT ASAHI FIBREGLASS",
    },
    offers: {
      "@type": "Offer",
      url: `https://ipalbioasahi.com/products/${product.slug}`,
      priceCurrency: product.currency || "IDR",
      price: product.price ? String(product.price) : undefined,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: String(product.rating.average),
          reviewCount: String(product.rating.count),
        }
      : undefined,
  };

  return (
    <section className="pt-14">
      {/* ✅ JSON-LD keluar sebagai <script> yang valid */}
      <Script
        id="ld-json-product"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrgProduct),
        }}
      />

      <Suspense
        fallback={
          <div>
            <SingleProductSkeleton />
            <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
              YOU MIGHT ALSO LIKE...
            </h2>
            <ProductSkeleton
              extraClassname={"colums-mobile"}
              numberProducts={6}
            />
          </div>
        }
      >
        <AllProducts id={params.id} />
      </Suspense>
    </section>
  );
};

const AllProducts = async ({ id }: { id: string }) => {
  const session: Session | null = await getServerSession(authOptions);
  const product: ProductDocument = await getProduct(id);
  const randomProducts = await getRandomProducts(id);
  const productJSON = JSON.stringify(product);

  return (
    <>
      <SingleProduct product={productJSON} session={session} />

      <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
        YOU MIGHT ALSO LIKE...
      </h2>

      <Products products={randomProducts} extraClassname={"colums-mobile"} />
    </>
  );
};

export default ProductPage;
