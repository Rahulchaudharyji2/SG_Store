// import React, { useContext, useEffect } from "react";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Box,
//   Typography,
//   Container,
//   Paper,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { Link, useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import UserContext from "../store/user-context";
// import { loginUser } from "../store/Api";


// const Login = () => {
//   const navigate = useNavigate();
//   const { loginUserMutation } = useContext(UserContext);

//   const mutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: () => {
//       toast.success("Logged in successfully!", { position: "top-left" });
//       navigate("/");
//     },
//     onError: (error) => {
//       const errMsg = error?.response?.data?.errMsg || "Login failed!";
//       toast.error(errMsg, { position: "top-left" });
//     },
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const user = {
//       email: data.get("email"),
//       password: data.get("password"),
//     };
//     mutation.mutate(user);
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background:
//           "linear-gradient(135deg, #0d1117 0%, #1a1f25 50%, #21262d 100%)",
//       }}
//     >
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Paper
//           elevation={10}
//           sx={{
//             p: 4,
//             borderRadius: "20px",
//             backdropFilter: "blur(12px)",
//             background: "rgba(255, 255, 255, 0.05)",
//             color: "#fff",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
//               Login
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 InputLabelProps={{ style: { color: "#bbb" } }}
//                 InputProps={{
//                   style: { color: "#fff", borderColor: "#555" },
//                 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 InputLabelProps={{ style: { color: "#bbb" } }}
//                 InputProps={{
//                   style: { color: "#fff", borderColor: "#555" },
//                 }}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   background:
//                     "linear-gradient(90deg, #ff8c00 0%, #ff6a00 100%)",
//                   fontWeight: 600,
//                   borderRadius: "10px",
//                   "&:hover": {
//                     background:
//                       "linear-gradient(90deg, #ff6a00 0%, #ff8c00 100%)",
//                   },
//                 }}
//               >
//                 {mutation.isPending ? "Logging in..." : "Login"}
//               </Button>
//               <Typography
//                 variant="body2"
//                 sx={{ mt: 2, textAlign: "center", color: "#ccc" }}
//               >
//                 Don't have an account?{" "}
//                 <Link
//                   to="/register"
//                   style={{
//                     color: "#ff8c00",
//                     textDecoration: "none",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Register
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Login;


// import React from "react";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Box,
//   Typography,
//   Container,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useMutation } from "@tanstack/react-query";
// import { loginAdmin } from "../store/Api"; // your API function
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const mutation = useMutation({ mutationFn: loginAdmin });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const user = {
//       email: data.get("email"),
//       password: data.get("password"),
//     };
//     mutation.mutate(user, {
//       onSuccess: () => {
//         toast.success("Login successful!");
//         navigate("/add-product");
//       },
//       onError: () => toast.error("Invalid credentials!"),
//     });
//   };

//   return (
//     <Container component="main" maxWidth="sm">
//       <CssBaseline />
//       <Box
//         sx={{
//           mt: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           backgroundColor: "#f8f9fa",
//           p: 4,
//           borderRadius: 3,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Admin Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <TextField fullWidth label="Email" name="email" margin="normal" required />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             margin="normal"
//             required
//           />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
//             Login
//           </Button>
//           <Typography sx={{ mt: 2 }}>
//             Don’t have an account? <Link to="/register">Register</Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/profile';

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(from, { replace: true });
    } catch (err) {
      // handled by error
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={isLoading} type="submit">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: 8 }}>
          {error?.data?.message || 'Login failed'}
        </p>
      )}

      <p style={{ marginTop: 16 }}>
        Don’t have an admin yet? Use signup endpoint (Postman) or add a Signup page to call /admin/signup.
      </p>

      <p style={{ marginTop: 16 }}>
        Back to <Link to="/products">Products</Link>
      </p>
    </div>
  );
}