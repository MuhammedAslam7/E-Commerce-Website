import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { useGetWishlistQuery } from "@/services/api/user/userApi";
import { useAddToCartMutation } from "@/services/api/user/userApi";
import { useToaster } from "@/utils/Toaster";
import { useRemoveWishlistItemMutation } from "@/services/api/user/userApi";

export const WishListPage = () => {
  const toast = useToaster();
  const { data, isLoading } = useGetWishlistQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeWishlistItem] = useRemoveWishlistItemMutation()

  const { wishlist } = data || { wishlist: [] };
  console.log(wishlist);

  const handleAddToCart = async (id, color) => {
    try {
      const response = await addToCart({
        productId: id,
        color,
      }).unwrap();
      toast("Success", response?.message, "#22c55e");
    } catch (error) {
      console.log();
      if (error.status == 409) {
        toast("Item already  in cart", error?.data?.message, "#f97316");
      } else {
        console.log(error);
        toast("Error", "An Error Occured Please try again later..", "#ff0000");
      }
    }
  };

  const handleRemove = async(productId) => {
    try {
      console.log(productId)
      await removeWishlistItem({productId}).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUser />
      <SecondNavbarUser />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wishlist?.items?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Card className="p-4 w-full">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0">
                          <img
                            className="h-24 w-24 object-contain rounded-md"
                            src={product?.productId?.thumbnailImage}
                            alt={product?.productId?.productName}
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium line-clamp-1">
                            {product?.productId?.productName}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product?.productId?.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </TableCell>
                  <TableCell className="text-lg font-semibold">
                    ₹{product?.productId?.price?.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleRemove(product?.productId?._id)}>Remove</Button>
                      <Button
                        onClick={() =>
                          handleAddToCart(
                            product?.productId?._id,
                            product?.productId?.variants?.[0].color
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};
