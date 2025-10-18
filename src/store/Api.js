
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // adjust if needed

// ✅ Fetch logged-in admin profile
export const fetchProfile = async () => {
  const response = await axios.get(`${BASE_URL}/api/profile`, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Register admin
export const registerAdmin = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/admin/register`, data);
  return response.data;
};

// ✅ Login admin
export const loginAdmin = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/admin/login`, data);
  return response.data;
};

// ✅ Logout admin
export const logoutUser = async () => {
  const response = await axios.post(`${BASE_URL}/api/admin/logout`);
  return response.data;
};

// ✅ Add product (Admin Only)
export const addProduct = async (productData) => {
  const response = await axios.post(`${BASE_URL}/api/admin/addproduct`, productData);
  return response.data;
};

// ✅ Search products
export const searchProduct = async (query) => {
  const response = await axios.get(`${BASE_URL}/api/products/search?query=${query}`);
  return response.data;
};



// async function request(path, { method = 'GET', body, headers = {} } = {}) {
//   const opts = { method, headers: { 'Content-Type': 'application/json', ...headers } };
//   if (body) opts.body = JSON.stringify(body);
//   const res = await fetch(`${BASE_URL}${path}`, opts);
//   const text = await res.text();
//   try {
//     const data = text ? JSON.parse(text) : null;
//     if (!res.ok) throw new Error(data?.message || res.statusText || 'Request failed');
//     return data;
//   } catch (err) {
//     // non-JSON or parsing error
//     if (!res.ok) throw new Error(text || err.message);
//     return null;
//   }
// }

// export async function buyNow(payload) {
//   // POST /orders/buy-now
//   return request('/orders/buy-now', { method: 'POST', body: payload });
// }

// export async function sendOtp(orderId) {
//   return request('/orders/send-otp', { method: 'POST', body: { orderId } });
// }

// export async function verifyOtp(orderId, otp) {
//   return request('/orders/verify-otp', { method: 'POST', body: { orderId, otp } });
// }

// async function request(path, { method = "GET", body, headers = {} } = {}) {
//   const opts = { method, headers: { "Content-Type": "application/json", ...headers } };
//   if (body) opts.body = JSON.stringify(body);
//   const res = await fetch(`${API_BASE}${path}`, opts);
//   const text = await res.text();
//   try {
//     const data = text ? JSON.parse(text) : null;
//     if (!res.ok) throw new Error(data?.message || res.statusText || "Request failed");
//     return data;
//   } catch (err) {
//     if (!res.ok) throw new Error(text || err.message);
//     return null;
//   }
// }

// export async function buyNow(payload) {
//   return request("/orders/buy-now", { method: "POST", body: payload });
// }

// export default { buyNow };


// async function request(path, { method = "GET", body, headers = {} } = {}) {
//   const opts = { method, headers: { "Content-Type": "application/json", ...headers } };
//   if (body) opts.body = JSON.stringify(body);
//   const res = await fetch(`${BASE_URL}${path}`, opts);
//   const text = await res.text();
//   try {
//     const data = text ? JSON.parse(text) : null;
//     if (!res.ok) throw new Error(data?.message || res.statusText || "Request failed");
//     return data;
//   } catch (err) {
//     if (!res.ok) throw new Error(text || err.message);
//     return null;
//   }
// }

// export async function buyNow(payload) {
//   return request("/orders/buy-now", { method: "POST", body: payload });
// }

// export async function confirmPayment(payload) {
//   return request("/orders/confirm-payment", { method: "POST", body: payload });
// }

// export default { buyNow, confirmPayment };
async function request(path, { method = "GET", body, headers = {} } = {}) {
  const opts = { method, headers: { "Content-Type": "application/json", ...headers } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw new Error(data?.message || res.statusText || "Request failed");
    return data;
  } catch (err) {
    if (!res.ok) throw new Error(text || err.message);
    return null;
  }
}

export async function buyNow(payload) {
  return request("/orders/buy-now", { method: "POST", body: payload });
}

export async function confirmPayment(payload) {
  return request("/orders/confirm-payment", { method: "POST", body: payload });
}

// OTP endpoints
export async function sendOtp(orderId) {
  return request("/orders/send-otp", { method: "POST", body: { orderId } });
}

export async function verifyOtp(orderId, otp) {
  return request("/orders/verify-otp", { method: "POST", body: { orderId, otp } });
}

export async function simulateUpi(orderId) {
  return request("/orders/simulate/upi", { method: "POST", body: { orderId } });
}
// add to your api helper file
export async function getOrderById(orderId) {
  return request(`/orders/${orderId}`, { method: 'GET' });
}

export default { buyNow, confirmPayment, sendOtp, verifyOtp, simulateUpi ,getOrderById };