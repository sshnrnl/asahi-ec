import { Suspense } from "react";
import { Products } from "../components/products/Products";
import { getAllProducts } from "./actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

const Home = async () => {
  return (
    <section className="pt-14">
      <div className=" w-full pb-14">
        <img
          className="w-full h-auto pointer-events-auto rounded-2xl w-full  flex items-center justify-between"
          src="banner.png"
          alt=""
        />
      </div>

      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
      >
        <AllProducts />
      </Suspense>
    </section>
  );
};

const AllProducts = async () => {
  const products = await getAllProducts();
  console.log(products);

  return <Products products={products} extraClassname="" />;
};

export default Home;
