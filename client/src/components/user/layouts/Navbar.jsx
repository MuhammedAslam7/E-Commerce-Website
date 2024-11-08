import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-2">
        {" "}
        {/* Added padding */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Dune Logo"
                className="h-8 w-8"
              />
            </div>
            <span className="text-xl font-bold">Dune</span>
          </Link>

          {/* Search Section */}
          <div className="flex-1 gap-3 max-w-2xl mx-auto flex mt-3 mb-3">
            {" "}
            {/* Added margin top and bottom */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-l-md border-r-0  bg-white hover:bg-gray-100 px-4 flex items-center gap-2"
                >
                  All Categories
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Electronics</DropdownMenuItem>
                <DropdownMenuItem>Clothing</DropdownMenuItem>
                <DropdownMenuItem>Books</DropdownMenuItem>
                <DropdownMenuItem>Home & Garden</DropdownMenuItem>
                <DropdownMenuItem>Sports</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex-1 flex border border-gray-300 rounded-r-md overflow-hidden">
              <input
                type="search"
                placeholder="Search for your item"
                className="w-full focus:outline-none px-4 border"
              />
              <Button
                type="submit"
                variant="ghost"
                className="rounded-l-none hover:bg-gray-100"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-12">
            <button
              className="flex flex-col items-center gap-1 hover:text-gray-600 transition-colors"
              aria-label="Wishlist"
            >
              <FaHeart className="h-6 w-6" />
            </button>
            <button
              className="flex flex-col items-center gap-1 hover:text-gray-600 transition-colors"
              aria-label="Shopping cart"
            >
              <div className="relative">
                <FaShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </button>
            <button
              className="flex flex-col items-center gap-1 hover:text-gray-600 transition-colors"
              aria-label="User account"
            >
              <FaUser className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
