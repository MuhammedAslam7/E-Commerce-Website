import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { SidebarProfile } from "@/components/user/layouts/SidebarProfile";
import { FooterUser } from "@/components/user/layouts/FooterUser";
import { useGetWalletQuery } from "@/services/api/user/userApi";

export const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("5000");
  const  {data, isLoading}  = useGetWalletQuery()

    const {wallet} = data || {}
    console.log(wallet)

  const handleAddMoney = () => {
    setBalance(balance + Number(amount));
  };

  const handleQuickAdd = (value) => {
    setAmount(String(Number(amount) + value));
  };

  return (
    <div>
      <NavbarUser />
      <SecondNavbarUser />
      <div className="max-w-5xl gap-6 flex mx-auto p-4">
        <SidebarProfile heading="Wallet" />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <div className="text-xl">
              Balance: <span className="font-medium">₹ {wallet?.balance}</span>
            </div>
            <Button
              variant="secondary"
              className="bg-black text-white hover:bg-black/90"
            >
              History
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add Money to Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-7">
              <div className="bg-black rounded-lg p-4">
                <label className="text-white mb-2 block">Enter Amount</label>
                <div className="flex items-center">
                  <span className="text-white mr-2 text-lg">₹</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-black text-white border-none text-lg focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-black text-white border-none hover:bg-black/90"
                  onClick={() => handleQuickAdd(500)}
                >
                  + ₹500
                </Button>
                <Button
                  variant="outline"
                  className="bg-black text-white border-none hover:bg-black/90"
                  onClick={() => handleQuickAdd(1000)}
                >
                  + ₹1000
                </Button>
                <Button
                  variant="outline"
                  className="bg-black text-white border-none hover:bg-black/90"
                  onClick={() => handleQuickAdd(2000)}
                >
                  + ₹2000
                </Button>
              </div>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={handleAddMoney}
              >
                Add to Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <FooterUser />
    </div>
  );
};
