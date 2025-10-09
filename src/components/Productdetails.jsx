import React from "react";
import { useParams } from "react-router-dom";
import products from "../lib/api"; // adjust path
import {
  Box,
  Typography,
  Button,
  Stack,
  Rating,
  Divider,
  Grid,
  Container,
} from "@mui/material";
import { useCart } from "../Context/CardContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { dispatch } = useCart();

  if (!product) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          Product not found 😔
        </Typography>
      </Box>
    );
  }

  const { title, image, price, description, category } = product;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name: title,
        price,
        image,
        category,
      },
    });

    toast.success(`${title} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Grid
        container
        spacing={5}
        sx={{
          backgroundColor: "",
          borderRadius: "20px",
          p: 4,
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          alignItems: "center",
        }}
      >
        {/* --- Product Image Section --- */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                backgroundColor: "#161b22",
                borderRadius: "16px",
                p: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={image}
                alt={title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "16px",
                }}
              />
            </Box>
          </motion.div>
        </Grid>

        {/* --- Product Details Section --- */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#F4C542",
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                color: "#9ea5b1",
              }}
            >
              Category: {category}
            </Typography>

            <Divider sx={{ borderColor: "#333", my: 2 }} />

            <Typography
              variant="body1"
              sx={{
                color: "#ccc",
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              {description}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Typography
                variant="h5"
                sx={{ color: "#F4C542", fontWeight: 600 }}
              >
                ₹{price}
              </Typography>
              <Rating
                name="product-rating"
                defaultValue={4}
                precision={0.5}
                readOnly
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#F4C542",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  px: 3,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#d4a933",
                  },
                }}
              >
                Buy Now
              </Button>

              <Button
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  background:
                    "linear-gradient(135deg, rgb(235, 203, 144), rgb(212, 163, 115), rgb(245, 222, 179))",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  px: 3,
                  textTransform: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgb(212, 163, 115), rgb(235, 203, 144))",
                  },
                }}
              >
                Add to Cart
              </Button>
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
