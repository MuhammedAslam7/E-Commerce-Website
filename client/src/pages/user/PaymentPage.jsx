import { Button } from "@/components/ui/button";
import { Card, } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Wallet, Truck, } from "lucide-react";
import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { FooterUser } from "@/components/user/layouts/FooterUser";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmationModal } from "@/components/user/modals/ConfirmationModal";
import { useState, useEffect } from "react";
import { useAddOrderMutation } from "@/services/api/user/userApi";

export function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const {selectedAddress, totalPrice} = location?.state || {}
  const [modalOpen, setModalOpen] = useState(false)
  const [addOrder] = useAddOrderMutation()
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery")

  const handleSubmit = () => {
    setModalOpen(true)
  }
  const confirmSubmit = async() => {
    try {
      await addOrder({addressId: selectedAddress._id, paymentMethod}).unwrap()
      setModalOpen(false)
      navigate("/order-success-page")
    } catch (error) {
      console.log(error)
      
    }
  }
  const handlePaymentMethod = (value) => {
    setPaymentMethod(value)
  }

  return (
    <div className="container mx-auto">
      <NavbarUser />
      <SecondNavbarUser />
      <div className="container mx-auto p-6 grid md:grid-cols-[750px_1fr] gap-8 max-w-7xl">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Payment Options
            <div className="h-0.5 w-32 bg-blue-500 mt-1" />
          </h2>

          <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethod} className="space-y-4">
            <div className="flex items-center space-x-4 border p-4 rounded-lg">
              <RadioGroupItem value="cash on delivery" id="cash" />
              <Label htmlFor="cash" className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Cash on delivery
              </Label>
            </div>

  

      

            <div className="flex items-center space-x-4 border p-4 rounded-lg">
              <RadioGroupItem value="pay from wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Pay From Wallet
              </Label>
            </div>
          </RadioGroup>
        
          <Button onClick={handleSubmit} className="w-full mt-6 bg-black text-white hover:bg-gray-800">
            Continue
          </Button>

          <div className="w-full">
    
              <img
                src="/logo/f68618eff45eea357bb1cd1beecfc51d 2.jpg"
                alt="Payment methods images"
                width={50}
                height={30}
                className="w-max object-contain"
              />

          </div>
        </Card>

        {/* Payment Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Value of Products</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount (-)</span>
              <span>₹00.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated GST (+)</span>
              <span>₹00.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping (+)</span>
              <span className="text-green-500">FREE</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Order Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <div className="mt-6 bg-black text-white p-4 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{selectedAddress?.fullName}</p>
                <p>{selectedAddress?.country}, {selectedAddress?.state}</p>
                <p>{selectedAddress?.city}, {selectedAddress?.pincode}</p>
                <p>No: {selectedAddress?.phone}</p>
                <p>{selectedAddress?.landMark}</p>
              </div>
              {/* <Button
                variant="outline"
                className="mt-2 text-xs bg-white text-black hover:bg-gray-100"
              >
                Change
              </Button> */}
            </div>
          </div>
        </Card>
      </div>
      <FooterUser />
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmSubmit}
        title="Are you sure"
        message="If you confirm this order, You can manage the order on Your Orders"
        confirmText="Place Order"
        cancelText="Cancel"
        
      />
    </div>
  );
}
