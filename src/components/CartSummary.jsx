// // import { useCart } from "../Context/CardContext";
// // import { Link } from "react-router-dom";

// // export default function CartSummary() {
// //   const { subtotal, dispatch } = useCart();

// //   return (
// //     <>
    
// //     <div className="w-full sm:w-1/3 p-6 border rounded-lg shadow-md bg-white " style={{padding:"20px"}}>
// //       <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

// //       <div className="flex justify-between mb-2">
// //         <span>Subtotal</span>
// //         <span>₹{subtotal}</span>
// //       </div>

// //       <div className="flex justify-between mb-2">
// //         <span>Shipping</span>
// //         <span>₹0.00</span>
// //       </div>

// //       <hr className="my-2" />

// //       <div className="flex justify-between font-bold text-lg mb-4">
// //         <span>Order Total</span>
// //         <span>₹{subtotal}</span>
// //       </div>

// //       <button className="w-full bg-black text-white py-2 rounded-lg mb-2 hover:bg-gray-800 transition" style={{borderRadius:"10px"}}>
// //         Proceed to Checkout
// //       </button>

// //         <Link to="/">
// //       <button  className="w-full border py-2 rounded-lg mb-2 bg-black transition text-white hover:bg-gray-800" style={{borderRadius:"10px"}} >
// //         Continue Shopping
// //       </button>
// //         </Link>

// //       <button
// //         onClick={() => dispatch({ type: "CLEAR_CART" })}
// //         className="w-full text-red-500 hover:text-red-700 mt-2"
// //       >
// //         Clear Cart
// //       </button>
// //     </div>
// //     </>
// //   );
// // }

// import React from "react";
// import { useCart } from "../Context/CardContext";
// import { Link, useNavigate } from "react-router-dom";

// export default function CartSummary() {
//   const { items = [], subtotal = 0, dispatch } = useCart();
//   const navigate = useNavigate();
//   // inside CartSummary, top of function
// console.log('Cart context:', { items, subtotal });

//   const handleProceedToCheckout = () => {
//     if (!items || items.length === 0) {
//       return alert("Your cart is empty. Add items before proceeding to checkout.");
//     }

//     // Navigate to the Buy Now / Checkout page and pass cart items so the checkout page
//     // can pre-fill the items. The BuyNow page should read items from location.state.items.
//     navigate("/buy-now", { state: { items } });
//   };

//   return (
//     <>
//       <div
//         className="w-full sm:w-1/3 p-6 border rounded-lg shadow-md bg-white"
//         style={{ padding: "20px" }}
//       >
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//         <div className="flex justify-between mb-2">
//           <span>Items</span>
//           <span>{items.length}</span>
//         </div>

//         <div className="flex justify-between mb-2">
//           <span>Subtotal</span>
//           <span>₹{subtotal}</span>
//         </div>

//         <div className="flex justify-between mb-2">
//           <span>Shipping</span>
//           <span>₹0.00</span>
//         </div>

//         <hr className="my-2" />

//         <div className="flex justify-between font-bold text-lg mb-4">
//           <span>Order Total</span>
//           <span>₹{subtotal}</span>
//         </div>

//         <button
//           onClick={handleProceedToCheckout}
//           className="w-full bg-black text-white py-2 rounded-lg mb-2 hover:bg-gray-800 transition"
//           style={{ borderRadius: "10px" }}
//         >
//           Proceed to Checkout
//         </button>

//         <Link to="/">
//           <button
//             className="w-full border py-2 rounded-lg mb-2 bg-black transition text-white hover:bg-gray-800"
//             style={{ borderRadius: "10px" }}
//           >
//             Continue Shopping
//           </button>
//         </Link>

//         <button
//           onClick={() => dispatch({ type: "CLEAR_CART" })}
//           className="w-full text-red-500 hover:text-red-700 mt-2"
//         >
//           Clear Cart
//         </button>
//       </div>
//     </>
//   );
// }
import React from "react";
import { useCart } from "../Context/CardContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { items = [], subtotal = 0, dispatch } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!items || items.length === 0) {
      return alert("Your cart is empty. Add items before proceeding to checkout.");
    }
    // Navigate to checkout, passing cart items so BuyNow can prefill
    navigate("/buy-now", { state: { items } });
  };

  const handleQuickCOD = () => {
    if (!items || items.length === 0) {
      return alert("Your cart is empty.");
    }
    // Quick COD: open buy-now in quick mode (preselect COD, user still fills delivery)
    navigate("/buy-now", { state: { items, quick: true } });
  };

  return (
    <div
      className="w-full sm:w-1/3 p-6 border rounded-lg shadow-md bg-white"
      style={{ padding: "20px" }}
    >
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>Items</span>
        <span>{items.length}</span>
      </div>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>Subtotal</span>
        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>Shipping</span>
        <span className="font-medium">₹0.00</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Order Total</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <button
        onClick={handleProceedToCheckout}
        className="w-full bg-black text-white py-3 rounded-lg mb-2 hover:bg-gray-800 transition"
        style={{ borderRadius: "10px" }}
      >
        Proceed to Checkout
      </button>

      <button
        onClick={handleQuickCOD}
        className="w-full border py-3 rounded-lg mb-2 bg-white transition text-black hover:bg-gray-100"
        style={{ borderRadius: "10px" }}
      >
        Quick COD
      </button>

      <Link to="/">
        <button
          className="w-full mt-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          style={{ borderRadius: "10px" }}
        >
          Continue Shopping
        </button>
      </Link>

      <button
        onClick={() => {
          if (confirm("Clear cart?")) dispatch({ type: "CLEAR_CART" });
        }}
        className="w-full text-red-600 hover:text-red-800 mt-3"
      >
        Clear Cart
      </button>
    </div>
  );
}