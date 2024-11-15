import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ShoppingCart,
  Truck,
  DollarSign,
  Star,
  Package,
  FileText,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: ShoppingBag, label: "Products", href: "/admin/products" },
  { icon: Users, label: "Customers", href: "#" },
  { icon: ShoppingCart, label: "Orders", href: "#" },
  { icon: Truck, label: "Shipping", href: "#" },
  { icon: DollarSign, label: "Transactions", href: "#" },
  { icon: Star, label: "Reviews", href: "#" },
];

export function SidebarAdmin() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 transition-colors duration-300 shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
              E-COMMERCE PRO
            </h1>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg mb-1 transition-all duration-200 group"
            >
              <item.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400 transition-colors duration-200" />
              <span className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {item.label}
              </span>
            </Link>
          ))}
          <Button className="w-full mt-4" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Sales Report
          </Button>
        </nav>
      </div>
    </aside>
  );
}
