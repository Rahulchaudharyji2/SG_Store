import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useCart } from "../Context/CardContext"; 
import { toast } from "react-toastify"; // 🔥 Import toast
import{Link} from 'react-router-dom'

export default function ProductCard({ product }) {
  const { id, title, image, price, category, rating,  } = product;

  // Get cart dispatch from context
  const { dispatch } = useCart();

  // Function to handle add to cart
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

    // ✅ Show toast notification
    toast.success(`${title} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 285,
        margin: "20px auto",
        borderRadius: "16px",
        boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 12px 28px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* Product Image */}
      
      <Link to={`/productDetails/${id}`}>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={image}
        sx={{
          objectFit: "contain",
          padding: "12px",
          borderBottom: "1px solid #f0f0f0",
        }}
        />
        </Link>

      {/* Product Info */}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          fontWeight="bold"
          noWrap
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          title={title} // Tooltip on hover
          >
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#8B5E3C",
              marginBottom: "10px",
            }}
            >
            ₹{price}
          </div>
          <Stack spacing={1} alignItems="center">
            <Rating name="size-medium" defaultValue={rating} readOnly />
          </Stack>
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          paddingBottom: "16px",
        }}
      >
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Buy Now
        </Button>

        <Button
          size="small"
          variant="contained"
          onClick={handleAddToCart} // 🔥 Add toastify on click
          sx={{
            background:
              "linear-gradient(135deg, rgb(235, 203, 144), rgb(212, 163, 115), rgb(245, 222, 179))",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              background:
                "linear-gradient(135deg, rgb(212, 163, 115), rgb(235, 203, 144))",
            },
          }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
