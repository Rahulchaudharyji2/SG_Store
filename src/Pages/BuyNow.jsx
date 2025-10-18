
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryForm from "../components/DeliveryForm";
import { useCart } from "../Context/CardContext";
import { buyNow, confirmPayment as apiConfirmPayment } from "../store/Api";
import { loadRazorpayScript } from "../utils/razorpay";

/**
 * Professional BuyNow / Checkout page
 * - Improved spacing and responsiveness
 * - Preserves existing business logic
 */

function formatINR(value = 0) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}

export default function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useCart();

  const initialItems = location.state?.items?.length ? location.state.items : cart.items || [];
  const [items, setItems] = useState(initialItems);
  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!location.state?.items?.length) {
      setItems(cart.items || []);
    }
  }, [cart.items, location.state]);

  const payloadItems = (items || []).map((it) => ({
    productId: it.id || it._id || it.productId,
    quantity: it.quantity || 1,
  }));

  async function handleRazorpayFlow(serverResp) {
    try {
      await loadRazorpayScript();
    } catch (err) {
      throw new Error("Unable to load Razorpay SDK: " + err.message);
    }

    const { razorpay, orderId } = serverResp;
    const options = {
      key: razorpay.key,
      amount: razorpay.amount,
      currency: razorpay.currency || "INR",
      name: "Your Shop",
      description: "Order Payment",
      order_id: razorpay.orderId,
      handler: async function (response) {
        try {
          const verifyRes = await apiConfirmPayment({
            orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          cart.dispatch({ type: "CLEAR_CART" });
          navigate("/order-success", { state: { data: verifyRes } });
        } catch (err) {
          console.error("Payment verification failed", err);
          setError("Payment verification failed. Please contact support.");
          setShowError(true);
        }
      },
      prefill: {
        name: delivery.name,
        email: delivery.email,
        contact: delivery.phone,
      },
      theme: { color: "#111827" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!items || items.length === 0) {
      setError("Your cart is empty.");
      setShowError(true);
      return;
    }
    if (!delivery.name || !delivery.phone || !delivery.addressLine1 || !delivery.city || !delivery.pincode) {
      setError("Please fill required delivery fields.");
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        items: payloadItems,
        delivery,
        paymentMethod,
        verifyPhone,
      };

      const serverResp = await buyNow(payload);

      if (paymentMethod === "cod") {
        if (serverResp.message && serverResp.message.toLowerCase().includes("otp")) {
          // OTP verification required — do not clear cart yet
          navigate("/verify-otp", { state: { orderId: serverResp.orderId } });
          return;
        }
        cart.dispatch({ type: "CLEAR_CART" });
        navigate("/order-success", { state: { data: serverResp } });
        return;
      }

      if (paymentMethod === "razorpay") {
        await handleRazorpayFlow(serverResp);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to place order. Try again.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const clientSubtotal = (items || []).reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
  const shipping = 0;
  const taxes = +(clientSubtotal * 0.0).toFixed(2);
  const grandTotal = +(clientSubtotal + shipping + taxes).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
        <p className="text-sm text-gray-600 mt-1">Review items, enter delivery details and complete your order.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Items + Delivery */}
        <main className="lg:col-span-8 space-y-6">
          <section className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden" >
            <div className="p-6" style={{ padding: '2rem' }}>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Items ({items.length})</h2>

              {items.length === 0 ? (
                <div className="text-gray-500">
                  No items in cart.{" "}
                  <button onClick={() => navigate("/")} className="ml-2 text-indigo-600 underline">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((it) => (
                    <li key={it.id || it._id || it.productId} className="flex gap-4 items-center border border-gray-100 rounded-lg p-4">
                      <div className="w-24 h-24 bg-gray-50 rounded overflow-hidden flex items-center justify-center p-2 shrink-0">
                        {it.image ? (
                          <img src={it.image} alt={it.title || it.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-xs text-gray-400">No Image</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="truncate">
                            <div className="text-sm font-medium text-gray-900 truncate">{it.title || it.name || "Product"}</div>
                            <div className="text-xs text-gray-500 mt-1">{it.variant || ""}</div>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">{formatINR((Number(it.price || 0) * Number(it.quantity || 1)).toFixed(2))}</div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                          <div>Qty: <span className="font-medium text-gray-800">{it.quantity}</span></div>
                          <div className="flex items-center gap-3">
                            <button
                              aria-label={`Decrease quantity for ${it.title || it.name}`}
                              className="px-3 py-1 rounded border text-sm text-gray-600 hover:bg-gray-50"
                              onClick={() => cart.dispatch({ type: "DECREASE", payload: it.id || it.productId })}
                            >
                              -
                            </button>
                            <button
                              aria-label={`Increase quantity for ${it.title || it.name}`}
                              className="px-3 py-1 rounded border text-sm text-gray-600 hover:bg-gray-50"
                              onClick={() => cart.dispatch({ type: "INCREASE", payload: it.id || it.productId })}
                            >
                              +
                            </button>
                            <button
                              aria-label={`Remove ${it.title || it.name}`}
                              className="text-red-600 text-sm underline"
                              onClick={() => cart.dispatch({ type: "REMOVE_ITEM", payload: it.id || it.productId })}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex justify-between items-center mt-6">
                <div className="text-gray-700">Subtotal</div>
                <div className="font-bold text-lg">{formatINR(clientSubtotal)}</div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="p-6" style={{ padding: '2rem' }}>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Delivery Details</h2>
              <form onSubmit={handleSubmit} id="checkout-form">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <DeliveryForm value={delivery} onChange={setDelivery} />
                </div>
              </form>
            </div>
          </section>
        </main>

        {/* Right: Summary & Payment */}
        <aside className="lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-28">
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6" style={{ padding: '2rem' }}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

                <div className="flex justify-between text-sm text-gray-600">
                  <div>Items ({items.length})</div>
                  <div>{formatINR(clientSubtotal)}</div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <div>Shipping</div>
                  <div>{shipping === 0 ? <span className="text-green-600">Free</span> : formatINR(shipping)}</div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <div>Taxes</div>
                  <div>{formatINR(taxes)}</div>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-xl font-bold text-gray-900">{formatINR(grandTotal)}</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6" style={{ padding: '2rem' }}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment</h3>

                <div className="space-y-3">
                  <label className={`block p-3 rounded-lg border ${paymentMethod === "cod" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1"
                        aria-label="Cash on Delivery"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay with cash when your order is delivered.</div>
                      </div>
                    </div>
                  </label>

                  <label className={`block p-3 rounded-lg border ${paymentMethod === "razorpay" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="mt-1"
                        aria-label="Pay online with Razorpay"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Pay Online (Razorpay)</div>
                        <div className="text-sm text-gray-600">Secure payment via cards, UPI & netbanking.</div>
                      </div>
                    </div>
                  </label>
                </div>

                <label className="flex items-center gap-2 mt-4 text-sm text-gray-700">
                  <input type="checkbox" checked={verifyPhone} onChange={(e) => setVerifyPhone(e.target.checked)} />
                  <span>Verify phone before confirming (optional)</span>
                </label>

                {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full mt-4 inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{paymentMethod === "cod" ? "Place Order (COD)" : "Pay Now"}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full mt-3 text-sm border rounded-md py-2 text-gray-700 hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              By placing the order you agree to our <button className="underline">Terms & Conditions</button> and <button className="underline">Privacy Policy</button>.
            </p>
          </div>
        </aside>
      </div>

      {/* Error toast */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-4 pointer-events-none">
          <div className="max-w-xl w-full pointer-events-auto">
            <div className="bg-white border-l-4 border-red-500 shadow rounded p-4">
              <div className="flex items-start gap-3">
                <div className="text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Action Required</div>
                  <div className="text-sm text-gray-700 mt-1">{error || "Something went wrong."}</div>
                </div>
                <div>
                  <button onClick={() => { setShowError(false); setError(null); }} className="text-gray-400 hover:text-gray-600">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}