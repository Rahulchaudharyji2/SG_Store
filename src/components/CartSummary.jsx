import { useCart } from "../Context/CardContext";
import { Link } from "react-router-dom";

export default function CartSummary() {
  const { subtotal, dispatch } = useCart();

  return (
    <>
    
    <div className="w-full sm:w-1/3 p-6 border rounded-lg shadow-md bg-white " style={{padding:"20px"}}>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>₹0.00</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Order Total</span>
        <span>₹{subtotal}</span>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-lg mb-2 hover:bg-gray-800 transition" style={{borderRadius:"10px"}}>
        Proceed to Checkout
      </button>

        <Link to="/">
      <button  className="w-full border py-2 rounded-lg mb-2 bg-black transition text-white hover:bg-gray-800" style={{borderRadius:"10px"}} >
        Continue Shopping
      </button>
        </Link>

      <button
        onClick={() => dispatch({ type: "CLEAR_CART" })}
        className="w-full text-red-500 hover:text-red-700 mt-2"
      >
        Clear Cart
      </button>
    </div>
    </>
  );
}
