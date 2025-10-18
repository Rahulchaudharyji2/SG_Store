// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { getOrderById } from "../store/Api";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const passed = location.state?.data;
//   const [order, setOrder] = useState(passed || null);
//   const [loading, setLoading] = useState(!passed);

//   useEffect(() => {
//     async function fetchIfNeeded() {
//       if (!order && location.state?.data?.orderId) {
//         setLoading(true);
//         try {
//           const res = await getOrderById(location.state.data.orderId);
//           setOrder(res.order);
//         } catch (err) {
//           console.error("Failed to fetch order:", err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     }
//     fetchIfNeeded();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loading) return <div className="py-16 text-center">Loading order details…</div>;

//   return (
//     <div className="max-w-2xl mx-auto py-16 px-4 text-center">
//       <div className="bg-white p-8 rounded shadow">
//         <h1 className="text-3xl font-semibold mb-4">Order Placed Successfully</h1>

//         {order ? (
//           <>
//             <p className="text-gray-700 mb-2">Order ID: <span className="font-mono">{order._id}</span></p>
//             <p className="text-gray-700 mb-2">Amount: <strong>₹{order.total || order.amount || order.items?.reduce((s,i)=>s + (Number(i.price||0)*Number(i.quantity||1)),0)}</strong></p>
//             <p className="text-gray-600 mb-6">{order.message || "A confirmation email will be sent to you shortly."}</p>
//           </>
//         ) : (
//           <>
//             <p className="text-gray-700 mb-4">Order ID: <span className="font-mono">{location.state?.data?.orderId || "—"}</span></p>
//             <p className="text-gray-700 mb-6">We will update you with order details shortly.</p>
//           </>
//         )}

//         <Link to="/" className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Continue Shopping</Link>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getOrderById } from "../store/Api";

export default function OrderSuccess() {
  const location = useLocation();
  const passed = location.state?.data;
  const [order, setOrder] = useState(passed || null);
  const [loading, setLoading] = useState(!passed);

  useEffect(() => {
    async function fetchIfNeeded() {
      if (!order && location.state?.data?.orderId) {
        setLoading(true);
        try {
          const res = await getOrderById(location.state.data.orderId);
          setOrder(res.order);
        } catch (err) {
          console.error("Failed to fetch order:", err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="py-16 text-center">Loading order details…</div>;

  const displayAmount = (order) => {
    if (!order) return "—";
    if (order.total) return `₹${order.total}`;
    if (order.amount) return `₹${order.amount}`;
    if (order.items) {
      const total = order.items.reduce((s, i) => s + (Number(i.price || 0) * Number(i.quantity || 1)), 0);
      return `₹${total.toFixed(2)}`;
    }
    return "—";
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mx-auto">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        </div>

        <h1 className="text-2xl font-semibold mb-4">Order Placed Successfully</h1>

        {order ? (
          <>
            <p className="text-gray-700 mb-2">Order ID: <span className="font-mono text-gray-800">{order._id}</span></p>
            <p className="text-gray-700 mb-2">Amount: <strong className="text-gray-900">{displayAmount(order)}</strong></p>
            <p className="text-gray-600 mb-6">{order.message || "A confirmation email or SMS will be sent to you shortly."}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/orders" className="inline-block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">View Orders</Link>
              <Link to="/" className="inline-block w-full text-center border border-gray-200 px-4 py-2 rounded hover:bg-gray-50">Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4">Order ID: <span className="font-mono">{location.state?.data?.orderId || "—"}</span></p>
            <p className="text-gray-700 mb-6">We will update you with order details shortly.</p>

            <Link to="/" className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Continue Shopping</Link>
          </>
        )}
      </div>
    </div>
  );
}