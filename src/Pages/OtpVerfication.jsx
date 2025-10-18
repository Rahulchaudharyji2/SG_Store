import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOtp as apiSendOtp, verifyOtp as apiVerifyOtp, getOrderById } from "../store/Api";
import { useCart } from "../Context/CardContext";

export default function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useCart();

  const orderId = location.state?.orderId || null;
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!orderId) {
      navigate("/cart");
      return;
    }
    handleSendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleSendOtp() {
    if (!orderId) return;
    setSending(true);
    setMessage("");
    try {
      await apiSendOtp(orderId);
      setMessage("OTP sent. Please check your phone or email.");
      setCooldown(60);
    } catch (err) {
      setMessage(err.message || "Failed to send OTP. Try again.");
    } finally {
      setSending(false);
    }
  }

  async function handleVerify() {
    if (!orderId) return;
    if (!otp || otp.trim().length === 0) {
      setMessage("Please enter the OTP.");
      return;
    }
    setVerifying(true);
    setMessage("");
    try {
      const res = await apiVerifyOtp(orderId, otp.trim());
      // res ideally contains res.order — if yes use it, otherwise fetch
      let orderData = res.order;
      if (!orderData && res.orderId) {
        // fetch order details
        const fetched = await getOrderById(res.orderId);
        orderData = fetched.order || null;
      }
      // Clear cart and navigate with order data (if available)
      cart.dispatch({ type: "CLEAR_CART" });
      navigate("/order-success", { state: { data: orderData || { orderId: res.orderId } } });
    } catch (err) {
      setMessage(err.message || "OTP verification failed. Please retry.");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Verify your phone</h2>
        <p className="text-sm text-gray-600 mb-4">Order ID: <span className="font-mono">{orderId}</span></p>

        <input value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" placeholder="Enter OTP" />

        {message && <div className="text-sm text-red-600 mb-3">{message}</div>}

        <button onClick={handleVerify} disabled={verifying} className="w-full bg-black text-white py-2 rounded mb-2">
          {verifying ? "Verifying..." : "Verify OTP"}
        </button>

        <button onClick={handleSendOtp} disabled={sending || cooldown > 0} className="w-full border py-2 rounded">
          {sending ? "Sending..." : cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}