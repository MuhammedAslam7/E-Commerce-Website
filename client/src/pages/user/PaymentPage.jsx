import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Wallet, Truck, CreditCard } from "lucide-react";
import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { FooterUser } from "@/components/user/layouts/FooterUser";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmationModal } from "@/components/user/modals/ConfirmationModal";
import { useState, useEffect } from "react";
import {
  useAddOrderMutation,
  useRazorpayPaymentMutation
} from "@/services/api/user/userApi";
import Breadcrumbs from "@/components/user/layouts/Breadcrumbs";

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAddress, totalPrice, totalDiscount } = location?.state || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [addOrder] = useAddOrderMutation();
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  const [razorpayPayment] = useRazorpayPaymentMutation()

  const handleSubmit = () => {
      setModalOpen(true);
    
  };
  const confirmSubmit = async () => {
    try {
      const result = await addOrder({
        addressId: selectedAddress._id,
        paymentMethod,
        totalPrice,
        totalDiscount
      }).unwrap();
      setModalOpen(false);
      if(paymentMethod == "cash on delivery") {

        navigate("/order-success-page");
      } else if(paymentMethod == "razorpay") {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: result.amount,
          currency: "INR",
          name: "Dune Audio",
          description: "Product Price",
          order_id: result.id ,
          handler: async function (response) {
            try {
              await razorpayPayment({
                addressId: selectedAddress._id,
                paymentMethod: "razorpay",
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }).unwrap();
              navigate("/order-success-page");
            } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
              console.log(error);
            }
          },
          prefill: {
            name: selectedAddress?.fullName,
            email: "customer@example.com",
            contact: selectedAddress?.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };
        
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaymentMethod = (value) => {
    setPaymentMethod(value);
  };


  return (
    <div className="container mx-auto">
      <NavbarUser />
      <SecondNavbarUser />
      <div className="mt-8 ml-[160px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <Breadcrumbs currentPage="Payment" />
      </div>
      <div className="container mx-auto p-6 grid md:grid-cols-[750px_1fr] gap-8 max-w-7xl">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Payment Options
            <div className="h-0.5 w-32 bg-blue-500 mt-1" />
          </h2>

          <RadioGroup
            value={paymentMethod}
            onValueChange={handlePaymentMethod}
            className="space-y-4"
          >
            <div className="flex items-center space-x-4 border p-4 rounded-lg">
              <RadioGroupItem value="cash on delivery" id="cash" />
              <Label htmlFor="cash" className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Cash on delivery
              </Label>
            </div>
            <div className="flex items-center space-x-4 border p-4 rounded-lg">
              <RadioGroupItem value="razorpay" id="razorpay" />
              <Label htmlFor="razorpay" className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pay with Razorpay
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

          <Button
            onClick={handleSubmit}
            className="w-full mt-6 bg-black text-white hover:bg-gray-800"
          >
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
              <span className="font-medium">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount (-)</span>
              <span className="text-green-500 font-medium">₹{totalDiscount}.00</span>
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
                <span className="text-x">₹{totalPrice - totalDiscount} /-</span>
              </div>
            </div>

            <div className="mt-6 bg-black text-white p-4 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{selectedAddress?.fullName}</p>
                <p>
                  {selectedAddress?.country}, {selectedAddress?.state}
                </p>
                <p>
                  {selectedAddress?.city}, {selectedAddress?.pincode}
                </p>
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
        confirmText={paymentMethod == "cash on delivery" ? "place Order" : "Place Order & pay"}
        cancelText="Cancel"
      />
    </div>
  );
}
