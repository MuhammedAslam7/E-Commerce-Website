import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserHomeQuery } from "@/services/api/userApi";
import { ProductCard } from "../layouts/Product";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {});
  const { data, isLoading, error, refetch } = useUserHomeQuery();

  console.log(data);
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative">
        <img
          src="/banners/c-d-x-HwwQZZdQHtc-unsplash.jpg"
          alt="Hero headphones"
          className="h-[575px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="container flex items-center mx-auto h-full px-4">
            <div className="flex w-[400px] mt-20 bg-black h-[200px] bg-opacity-40 ml-[200px] flex-col justify-center items-center text-white">
              <h1 className="text-4xl text-white font-bold">TOP DEAL TODAY!</h1>
              <p className="mt-2 text-2xl">FRAGRANCE</p>
              <span className=" mt-2 text-xs">
                Get upto <span className="text-yellow-500">50%</span> off Today
                Only
              </span>
              <Button
                className="mt-6 w-fit bg-red-600 hover:bg-red-700"
                onClick={() => refetch()}
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Super Saver Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Super Saver
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCard key={i} title="Wireless Headphones" price="99.99" />
            ))}
          </div>
        </div>
      </section>

      {/* New Accessories Section */}
      <section className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            TOP DEAL NEW ACCESSORIES
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard key={i} title="Premium Earbuds" price="149.99" />
            ))}
          </div>
        </div>
      </section>

      {/* Listen to the Noise Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Listen to the Noise
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard key={i} title="Pro Gaming Headset" price="199.99" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
