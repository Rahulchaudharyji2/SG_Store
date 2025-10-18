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

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-semibold mb-4">Order Placed Successfully</h1>

        {order ? (
          <>
            <p className="text-gray-700 mb-2">Order ID: <span className="font-mono">{order._id}</span></p>
            <p className="text-gray-700 mb-2">Amount: <strong>₹{order.total || order.amount || order.items?.reduce((s,i)=>s + (Number(i.price||0)*Number(i.quantity||1)),0)}</strong></p>
            <p className="text-gray-600 mb-6">{order.message || "A confirmation email will be sent to you shortly."}</p>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4">Order ID: <span className="font-mono">{location.state?.data?.orderId || "—"}</span></p>
            <p className="text-gray-700 mb-6">We will update you with order details shortly.</p>
          </>
        )}

        <Link to="/" className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Continue Shopping</Link>
      </div>
    </div>
  );
}