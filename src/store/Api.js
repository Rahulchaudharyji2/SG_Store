// import axios from "axios";

// const BACKEND_URL = 'http://localhost:5000';

// const instance = axios.create({
//     withCredentials: true
// });

// export async function signupAdmin(user) {
//     const response = await instance.post(`${BACKEND_URL}/admin/signup`, user);
//     if (response.status !== 201) {
//         throw new Error('cannnot register the Admin at the moment');
//     }
//     return response.data;
// }

// export async function loginUser(user) {
//     const response = await instance.post(`${BACKEND_URL}/admin/login`, user);
//     if (response.status !== 200) {
//         throw new Error('cannnot register the user at the moment');
//     }
//     return response.data;
// }

// export async function logoutUser() {
//     const response = await instance.post(`${BACKEND_URL}/logout`);
//     if (response.status !== 200) {
//         throw new Error('cannnot register the user at the moment');
//     }
//     return response.data;
// }

// export async function fetchProfile() {
//     const response = await instance.get(`${BACKEND_URL}/profile`);
//     if (response.status !== 200) {
//         throw new Error('cannnot register the user at the moment');
//     }
//     return response.data;
// }

// // export async function placeOrder(items) {
// //     const response = await instance.post(`${BACKEND_URL}/orders`, {items});
// //     if (response.status !== 200) {
// //         throw new Error('cannnot register the user at the moment');
// //     }
// //     return response.data;
// // }

// export async function addProduct(productData) {
//     try {
//         const response = await instance.post(`${BACKEND_URL}/products/admin/products`, productData);
//         return response.data; // Assuming your backend returns the newly created product data
//     } catch (error) {
//         throw new Error('Error adding product'); // Handle specific errors based on your backend response
//     }
// }

// // export async function fetchOrders() {
// //     const response = await instance.get(`${BACKEND_URL}/orders`);
// //     if (response.status !== 200) {
// //         throw new Error('cannnot register the user at the moment');
// //     }
// //     return response.data;
// // }

// src/store/Api.js

// src/store/Api.js
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

