// // import './App.css'
// // import { Routes, Route } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import Navbar from './components/Navbar'
// // import Carousel from './components/Carousel'
// // import Toggle from './components/Toggle'
// // import SoftToys from './Pages/SoftToys'
// // import Cart from './Pages/Cart'
// // import Home from './Pages/Home';
// // import Accessories from './Pages/Accessories';
// // import Necklace from './Pages/Necklace';
// // import Rings from './pagesinfo/Ring';
// // import Earring from './pagesinfo/Earring';
// // import Bracelt from './pagesinfo/Bracelt';
// // import Sets from './pagesinfo/Sets';
// // import BraceltWatch from './pagesinfo/BraceletWatch';
// // import PhotoFrame from './Pages/PhotoFrame';
// // import Flower from './Pages/Flower';
// // import Footer from './components/Footer';
// // import Pendants from './pagesinfo/Pendant';
// // import PrivacyPolicy from './Pages/PrivacyPolicy';
// // import TermsAndPolicyPage from './Pages/TermAndPolicy';
// // import ContactUsPage from './Pages/ContactUs';
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import ScrollToTop from './components/ScrollTop';
// // import AboutUs from './components/AboutUs';
// // import FAQPage from './Pages/Faq';
// // import SgChatBot from './components/SgChatBot';
// // import Productdetails from './components/Productdetails';
// // import Register from './Pages/RegisterPage';
// // import Login from './Pages/Login';
// // // import AdminDashboard from './Admin/AdminDashboard';
// // import AddProduct from './Pages/AddProduct';
// // import ProtectedRoute from './components/ProtectedRoutes';
// // import Profile from './components/Profile';



// // // 👇 popup animation component
// // import SGWelcomeAnimation from './components/SGwelcome';

// // function App() {
// //   const [showWelcome, setShowWelcome] = useState(true);


// //   useEffect(() => {
// //     const timer = setTimeout(() => setShowWelcome(false), 5000);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <>
// //       {/* 🔥 Popup overlay */}
// //       {showWelcome && (
// //         <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center animate-fadeIn">
// //           <div className="relative bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-3xl w-[95%]">
// //             <SGWelcomeAnimation />
// //             {/* Close button */}
// //             <button
// //               onClick={() => setShowWelcome(false)}
// //               className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
// //             >
// //               ✕
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* ✅ Toast notifications */}
// //       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
// // <ScrollToTop/>
// //       {/* 🌐 Your actual website content */}
// //       <Navbar />
// //       <Routes>
// //            <Route element={<ProtectedRoute roles={['admin']} />}>
// //           <Route path="/admin/profile" element={<ProfilePage />} />
// //           {/* Note: Your backend mounts admin product endpoints under /products/admin/products.
// //               This UI route is for admin page, not the API path. */}
// //         </Route>
// //         <Route path='/' element={<Home />} />
// //         <Route path='/cart' element={<Cart />} />
// //         <Route path='/accessories' element={<Accessories />} />
// //         <Route path='/necklace' element={<Necklace />} />
// //         <Route path='/rings' element={<Rings />} />
// //         <Route path='/earings' element={<Earring />} />
// //         <Route path='/bracelets' element={<Bracelt />} />
// //         <Route path='/sets' element={<Sets />} />
// //         <Route path='/softtoys' element={<SoftToys />} />
// //         <Route path='/photoframe' element={<PhotoFrame />} />
// //         <Route path='/flowers' element={<Flower />} />
// //         <Route path='/pendants' element={<Pendants />} />
// //         <Route path='/braceletwatch' element={<BraceltWatch />} />
// //         <Route path='/privacypolicy' element={<PrivacyPolicy />} />
// //         <Route path='/termandpolicy' element={<TermsAndPolicyPage />} />
// //         <Route path='/contactus' element={<ContactUsPage />} />
// //         <Route path='/aboutus' element={<AboutUs />} />
// //         <Route path='/faq' element={<FAQPage />} />
// //         <Route path="/productDetails/:id" element={<Productdetails/>}/>
// //         <Route path="/register" element={<Register/>}/>
// //         <Route path="/login" element={<Login/>}/>

// //       </Routes>
// //       <Footer />
// //       <SgChatBot />

// //       {/* Simple fade-in animation */}
// //       <style>{`
// //         @keyframes fadeIn {
// //           from { opacity: 0 }
// //           to { opacity: 1 }
// //         }
// //         .animate-fadeIn {
// //           animation: fadeIn 0.5s ease-in-out;
// //         }
// //       `}</style>
// //     </>
// //   )
// // }

// // export default App;

// import './App.css'
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Navbar from './components/Navbar'
// import Carousel from './components/Carousel'
// import Toggle from './components/Toggle'
// import SoftToys from './Pages/SoftToys'
// import Cart from './Pages/Cart'
// import Home from './Pages/Home';
// import Accessories from './Pages/Accessories';
// import Necklace from './Pages/Necklace';
// import Rings from './pagesinfo/Ring';
// import Earring from './pagesinfo/Earring';
// import Bracelt from './pagesinfo/Bracelt';
// import Sets from './pagesinfo/Sets';
// import BraceltWatch from './pagesinfo/BraceletWatch';
// import PhotoFrame from './Pages/PhotoFrame';
// import Flower from './Pages/Flower';
// import Footer from './components/Footer';
// import Pendants from './pagesinfo/Pendant';
// import PrivacyPolicy from './Pages/PrivacyPolicy';
// import TermsAndPolicyPage from './Pages/TermAndPolicy';
// import ContactUsPage from './Pages/ContactUs';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ScrollToTop from './components/ScrollTop';
// import AboutUs from './components/AboutUs';
// import FAQPage from './Pages/Faq';
// import SgChatBot from './components/SgChatBot';
// import Productdetails from './components/Productdetails';
// import Register from './Pages/RegisterPage';
// import Login from './Pages/Login';
// import AddProduct from './Pages/AddProduct';

// // Protected routing + profile
// import ProtectedRoute from './components/ProtectedRoutes';
// import Profile from './components/Profile';

// // Popup animation component
// import SGWelcomeAnimation from './components/SGwelcome';

// function App() {
//   const [showWelcome, setShowWelcome] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowWelcome(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {/* Popup overlay */}
//       {showWelcome && (
//         <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center animate-fadeIn">
//           <div className="relative bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-3xl w-[95%]">
//             <SGWelcomeAnimation />
//             {/* Close button */}
//             <button
//               onClick={() => setShowWelcome(false)}
//               className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Toast notifications */}
//       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
//       <ScrollToTop />

//       {/* Site content */}
//       <Navbar />

//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/accessories" element={<Accessories />} />
//         <Route path="/necklace" element={<Necklace />} />
//         <Route path="/rings" element={<Rings />} />
//         <Route path="/earings" element={<Earring />} />
//         <Route path="/bracelets" element={<Bracelt />} />
//         <Route path="/sets" element={<Sets />} />
//         <Route path="/softtoys" element={<SoftToys />} />
//         <Route path="/photoframe" element={<PhotoFrame />} />
//         <Route path="/flowers" element={<Flower />} />
//         <Route path="/pendants" element={<Pendants />} />
//         <Route path="/privacypolicy" element={<PrivacyPolicy />} />
//         <Route path="/termandpolicy" element={<TermsAndPolicyPage />} />
//         <Route path="/contactus" element={<ContactUsPage />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/faq" element={<FAQPage />} />
//         <Route path="/productDetails/:id" element={<Productdetails />} />
//         <Route path="/register" element={<Register />} />
//         {/* expose both /login and /admin/login so ProtectedRoute redirect works */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin/login" element={<Login />} />

//         {/* Admin protected routes */}
//         <Route element={<ProtectedRoute roles={['admin']} />}>
//           <Route path="/admin/profile" element={<Profile />} />
//           {/* Optional: Admin product management page (uses your AddProduct page) */}
//           <Route path="/admin/products" element={<AddProduct />} />
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>

//       <Footer />
//       <SgChatBot />

//       {/* Simple fade-in animation */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0 }
//           to { opacity: 1 }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-in-out;
//         }
//       `}</style>
//     </>
//   )
// }

// export default App;
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from './components/Navbar'
import SoftToys from './Pages/SoftToys'
import Cart from './Pages/Cart'
import Home from './Pages/Home';
import Accessories from './Pages/Accessories';
import Necklace from './Pages/Necklace';
import Rings from './pagesinfo/Ring';
import Earring from './pagesinfo/Earring';
import Bracelt from './pagesinfo/Bracelt';
import Sets from './pagesinfo/Sets';
import BraceltWatch from './pagesinfo/BraceletWatch';
import PhotoFrame from './Pages/PhotoFrame';
import Flower from './Pages/Flower';
import Footer from './components/Footer';
import Pendants from './pagesinfo/Pendant';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndPolicyPage from './Pages/TermAndPolicy';
import ContactUsPage from './Pages/ContactUs';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from './components/ScrollTop';
import AboutUs from './components/AboutUs';
import FAQPage from './Pages/Faq';
import SgChatBot from './components/SgChatBot';
import Productdetails from './components/Productdetails';
import Register from './Pages/RegisterPage';
import Login from './Pages/Login'; // this is the Login file above
import AddProduct from './Pages/admin/ProductPage';
import ProtectedRoute from './components/ProtectedRoutes';
import Profile from './Pages/admin/ProfilePage';
import SGWelcomeAnimation from './components/SGwelcome';
import AdminLogin from './Pages/admin/LoginPage'; // new admin login page
import BraceletWatch from './pagesinfo/BraceletWatch';
import BuyNow from './Pages/BuyNow';
import OrderSuccess from './Pages/OrderSuccess';
import OTPVerification from './pages/OtpVerfication';


function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center animate-fadeIn">
          <div className="relative bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-3xl w-[95%]">
            <SGWelcomeAnimation />
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/necklace" element={<Necklace />} />
        <Route path="/rings" element={<Rings />} />
        <Route path="/earings" element={<Earring />} />
        <Route path="/bracelets" element={<Bracelt />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/softtoys" element={<SoftToys />} />
        <Route path="/photoframe" element={<PhotoFrame />} />
        <Route path="/flowers" element={<Flower />} />
        <Route path="/pendants" element={<Pendants />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termandpolicy" element={<TermsAndPolicyPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/braceletwatch" element={<BraceletWatch />} />
        <Route path="/productDetails/:id" element={<Productdetails />} />
        <Route path="/buy-now" element={<BuyNow />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/register" element={<Register />} />
  <Route path="/verify-otp" element={<OTPVerification />} />

        {/* Expose admin login route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Optional alias */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/products" element={<AddProduct />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <SgChatBot />

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
      `}</style>
    </>
  )
}

export default App;