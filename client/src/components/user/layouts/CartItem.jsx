import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartItem({
  id,
  name,
  description,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove,
}) {
  return (
    <div className="flex gap-6 py-6 border-b">
      <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden">
        <img src={image} alt={name} className="object-cover" />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center gap-6">
          <p className="font-medium">₹{price}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Quantity</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity(id, Math.max(0, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity(id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <Button variant="destructive" size="sm" onClick={() => onRemove(id)}>
            REMOVE
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-black text-white hover:bg-gray-900"
          >
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
