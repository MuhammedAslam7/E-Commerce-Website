import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/user/layouts/CartItem";
import { useCartProductsQuery } from "@/services/api/user/userApi";
import { useSelector } from "react-redux";

export const CartPage = () => {
  const userId = useSelector((state) => state?.user?.userId);
  const {
    data: products = [],
    isLoading,
    error,
  } = useCartProductsQuery(userId);

  const updateQuantity = (id, newQuantity) => {
    products.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">SHOPPING CART</h1>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">MY CART</h2>
            <Link href="/products">
              <Button
                variant="outline"
                className="bg-[#1a237e] text-white hover:bg-[#1a237e]/90"
              >
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {products.map((product) => (
              <CartItem
                key={product.id}
                name={product?.productId?.productName}
                image={product?.productId?.thumbnailImage}
                onUpdateQuantity={updateQuantity}
                onRemove={removeProduct}
              />
            ))}
          </div>
          <div>
            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">SUBTOTAL</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-900">
                BUY ALL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
