import { useState, } from "react";
import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { ProductCard } from "@/components/user/layouts/ProductCard";
import { useProductsListQuery } from "@/services/api/user/userApi";
import { FooterUser } from "@/components/user/layouts/FooterUser";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FilterSidebar } from "@/components/user/layouts/FilterSidebar";

export const ProductListPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [filters, setFilters] = useState({
    priceRange: [0, 8000],
    categories: [],
    brands: []
  });

  const { data, isLoading, error } = useProductsListQuery({ 
    page, 
    limit,
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    categories: filters.categories,
    brands: filters.brands
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < data?.totalPage) setPage(page + 1);
  };

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
      <div className="flex max-w-7xl mx-auto mt-10">
        <FilterSidebar onFilterChange={handleFilterChange} initialFilters={filters} />
        <div className="flex-1 ml-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.products?.map((product) => (
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
          <div className="flex flex-col items-center mt-8">
            <div className="flex items-center cursor-pointer gap-2">
              <ChevronLeft onClick={handlePreviousPage} disabled={page === 1} />
              <span>
                {data?.currentPage} of {data?.totalPage}
              </span>
              <ChevronRight onClick={handleNextPage} disabled={page === data?.totalPage} />
            </div>
          </div>
        </div>
      </div>
      <FooterUser />
    </div>
  );
};