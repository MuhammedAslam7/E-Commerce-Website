import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { ProductCard } from "@/components/user/layouts/ProductCard";
import { useProductsListQuery } from "@/services/api/user/userApi";
import { FooterUser } from "@/components/user/layouts/FooterUser";

export const ProductListPage = () => {
  const { data: products = [], isLoading, error } = useProductsListQuery();

  if (isLoading) {
    return <h3>Product page is loading...</h3>;
  }
  if (error) {
    return <h3>Please try again later..</h3>;
  }

  return (
    <div>
      <NavbarUser />
      <SecondNavbarUser />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product?._id}
            productId={product?._id}
            productName={product?.productName}
            description={product?.description}
            price={product?.price}
            thumbnailImage={product?.thumbnailImage}
          />
        ))}
      </div>
      <FooterUser />
    </div>
  );
};
