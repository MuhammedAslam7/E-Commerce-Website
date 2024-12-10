import {
  Home,
  ShoppingBag,
  MapPin,
  Lock,
  Wallet,
  Tag,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export function SidebarProfile() {
  const menuItems = [
    { icon: Home, label: "My Profile", href: "/profile" },
    { icon: ShoppingBag, label: "My Orders", href: "/orders" },
    { icon: MapPin, label: "Delivery Address", href: "/address" },
    { icon: Lock, label: "Change Password", href: "/change-password" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: Tag, label: "Coupons", href: "/coupons" },
    { icon: Users, label: "Referral", href: "/referral" },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg rounded-r-lg overflow-hidden">
      <ul className="py-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item?.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
