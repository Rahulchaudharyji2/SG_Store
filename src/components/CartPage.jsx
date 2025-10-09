import { useEffect } from "react";
import { useCart } from "../Context/CardContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length === 0) {
      toast.info("Your cart is empty. Start shopping now!");
    }
  }, [cart]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-10">
      {/* Cart Items */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-2xl font-bold mb-6">
          Shopping Cart ({cart.length})
        </h1>

        {cart.length > 0 ? (
          cart.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Order Summary */}
      <CartSummary />
    </div>
  );
}
