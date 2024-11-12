"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  //   ChevronDown,
  DollarSign,
  LayoutDashboard,
  Package,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

// Sample data for charts (unchanged)
const revenueData = [
  { month: "Jan", revenue: 10000, orders: 120 },
  { month: "Feb", revenue: 15000, orders: 180 },
  { month: "Mar", revenue: 12000, orders: 150 },
  { month: "Apr", revenue: 18000, orders: 200 },
  { month: "May", revenue: 22000, orders: 250 },
  { month: "Jun", revenue: 25000, orders: 280 },
  { month: "Jul", revenue: 30000, orders: 320 },
  { month: "Aug", revenue: 28000, orders: 300 },
  { month: "Sep", revenue: 32000, orders: 350 },
  { month: "Oct", revenue: 35000, orders: 380 },
  { month: "Nov", revenue: 40000, orders: 420 },
  { month: "Dec", revenue: 45000, orders: 450 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#2962ff" },
  { name: "Clothing", value: 25, color: "#e91e63" },
  { name: "Home & Garden", value: 20, color: "#00bcd4" },
  { name: "Books", value: 10, color: "#ffc107" },
  { name: "Others", value: 10, color: "#4caf50" },
];

const orderStatusData = [
  { status: "Completed", value: 65 },
  { status: "Processing", value: 25 },
  { status: "Cancelled", value: 10 },
];

const recentOrders = [
  {
    id: "1234",
    customer: "John Doe",
    total: "$120.50",
    status: "Completed",
    date: "2024-11-08",
  },
  {
    id: "1235",
    customer: "Jane Smith",
    total: "$85.20",
    status: "Processing",
    date: "2024-11-07",
  },
  {
    id: "1236",
    customer: "Bob Johnson",
    total: "$220.00",
    status: "Completed",
    date: "2024-11-07",
  },
  {
    id: "1237",
    customer: "Alice Brown",
    total: "$45.99",
    status: "Cancelled",
    date: "2024-11-06",
  },
  {
    id: "1238",
    customer: "Charlie Wilson",
    total: "$175.30",
    status: "Processing",
    date: "2024-11-06",
  },
];

const topProducts = [
  { name: "Wireless Earbuds", sales: 1200, revenue: "$36,000" },
  { name: "Smart Watch", sales: 950, revenue: "$47,500" },
  { name: "Laptop", sales: 850, revenue: "$680,000" },
  { name: "Smartphone", sales: 800, revenue: "$400,000" },
  { name: "Tablet", sales: 600, revenue: "$180,000" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: ShoppingBag, label: "Products", href: "#" },
  { icon: Users, label: "Customers", href: "#" },
  { icon: ShoppingCart, label: "Orders", href: "#" },
  { icon: Truck, label: "Shipping", href: "#" },
  { icon: DollarSign, label: "Transactions", href: "#" },
  { icon: Star, label: "Reviews", href: "#" },
];

export function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
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
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-300 shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  className="w-64 pl-10 bg-gray-100 dark:bg-gray-700 border-none"
                  placeholder="Search..."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="@shadcn"
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-blue-600"
                />
                {isDarkMode ? (
                  <Moon className="h-4 w-4 text-gray-400" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-400" />
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-blue-600">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-pink-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-pink-600">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-cyan-600">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.8%</div>
                <p className="text-xs text-yellow-600">+1.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Charts */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Revenue Overview</CardTitle>
                  <Select
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="This Week">This Week</SelectItem>
                      <SelectItem value="This Month">This Month</SelectItem>
                      <SelectItem value="This Year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2962ff"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2962ff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2962ff"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders and Top Products */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                              order.status === "Completed"
                                ? "bg-green-200 text-green-800"
                                : order.status === "Processing"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>{product.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Additional Charts */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={orderStatusData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="status" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                        }}
                      />
                      <Bar dataKey="value" fill="#00bcd4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue vs Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis yAxisId="left" stroke="#888" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#888"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2962ff"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="orders"
                        stroke="#e91e63"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
