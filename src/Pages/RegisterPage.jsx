import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMutation } from "@tanstack/react-query";
import { registerAdmin } from "../store/Api"; // ✅ matches your Api.js
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  // ✅ Mutation for register API
  const mutation = useMutation({
    mutationFn: registerAdmin,
    onSuccess: () => {
      toast.success("Registration successful!", { position: "top-right" });
      navigate("/login");
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.errMsg ||
        error?.message ||
        "Registration failed!";
      toast.error(msg, { position: "top-right" });
    },
  });

  // ✅ Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newAdmin = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      adminCode: data.get("adminCode"),
    };

    // Send registration request
    mutation.mutate(newAdmin);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* 🧑 Avatar Icon */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AddCircleIcon />
        </Avatar>

        {/* 📝 Title */}
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Create Admin Account
        </Typography>

        {/* 🧾 Registration Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Admin Code"
            name="adminCode"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={mutation.isLoading}
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            {mutation.isLoading ? "Registering..." : "Register"}
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
