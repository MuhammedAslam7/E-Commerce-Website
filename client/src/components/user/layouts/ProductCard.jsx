import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const ProductCard = ({
  thumbnailImage,
  productName,
  description,
  price,
}) => {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={thumbnailImage}
            alt={productName}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <Separator className="my-0" />
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-black text-primary">
          {productName}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center space-x-2">
          <div className="flex items-center"></div>
          {/* <span className="text-sm text-gray-500">({reviewCount})</span> */}
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div></div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="text-">{price}</div>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto rounded-full hover:bg-pink-50 hover:text-pink-600"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4 mr-2" />
          Wishlist
        </Button>
      </CardFooter>
    </Card>
  );
};
