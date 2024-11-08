import { ShoppingCart } from "lucide-react";

export const ProductCard = ({ title, price }) => (
  <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <div className="aspect-square overflow-hidden">
      <img
        src="/placeholder.svg?height=300&width=300"
        alt={title}
        className="h-full w-full object-cover transition-transform group-hover:scale-110"
      />
    </div>
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">${price}</span>
        <button
          className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700 transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);
