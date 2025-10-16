// // import * as React from "react";
// // import Card from "@mui/material/Card";
// // import CardActions from "@mui/material/CardActions";
// // import CardContent from "@mui/material/CardContent";
// // import CardMedia from "@mui/material/CardMedia";
// // import Button from "@mui/material/Button";
// // import Typography from "@mui/material/Typography";
// // import Rating from "@mui/material/Rating";
// // import Stack from "@mui/material/Stack";
// // import { useCart } from "../Context/CardContext"; 
// // import { toast } from "react-toastify"; // 🔥 Import toast
// // import{Link} from 'react-router-dom'

// // export default function ProductCard({ product }) {
// //   const { id, title, image, price, category, rating,  } = product;

// //   // Get cart dispatch from context
// //   const { dispatch } = useCart();

// //   // Function to handle add to cart
// //   const handleAddToCart = () => {
// //     dispatch({
// //       type: "ADD_TO_CART",
// //       payload: {
// //         id,
// //         name: title,
// //         price,
// //         image,
// //         category,
// //       },
// //     });

// //     // ✅ Show toast notification
// //     toast.success(`${title} added to cart 🛒`, {
// //       position: "top-right",
// //       autoClose: 2000,
// //       theme: "colored",
// //     });
// //   };

// //   return (
// //     <Card
// //       sx={{
// //         maxWidth: 285,
// //         margin: "20px auto",
// //         borderRadius: "16px",
// //         boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
// //         transition: "all 0.3s ease-in-out",
// //         "&:hover": {
// //           transform: "translateY(-6px)",
// //           boxShadow: "0px 12px 28px rgba(0,0,0,0.2)",
// //         },
// //       }}
// //     >
// //       {/* Product Image */}
      
// //       <Link to={`/productDetails/${id}`}>
// //       <CardMedia
// //         component="img"
// //         alt={title}
// //         height="200"
// //         image={image}
// //         sx={{
// //           objectFit: "contain",
// //           padding: "12px",
// //           borderBottom: "1px solid #f0f0f0",
// //         }}
// //         />
// //         </Link>

// //       {/* Product Info */}
// //       <CardContent sx={{ textAlign: "center" }}>
// //         <Typography
// //           gutterBottom
// //           variant="h6"
// //           component="div"
// //           fontWeight="bold"
// //           noWrap
// //           sx={{
// //             textOverflow: "ellipsis",
// //             overflow: "hidden",
// //             whiteSpace: "nowrap",
// //           }}
// //           title={title} // Tooltip on hover
// //           >
// //           {title}
// //         </Typography>

// //         <Typography variant="body2" sx={{ color: "text.secondary" }}>
// //           <div
// //             style={{
// //               fontSize: "18px",
// //               fontWeight: "600",
// //               color: "#8B5E3C",
// //               marginBottom: "10px",
// //             }}
// //             >
// //             ₹{price}
// //           </div>
// //           <Stack spacing={1} alignItems="center">
// //             <Rating name="size-medium" defaultValue={rating} readOnly />
// //           </Stack>
// //         </Typography>
// //       </CardContent>

// //       {/* Action Buttons */}
// //       <CardActions
// //         sx={{
// //           display: "flex",
// //           justifyContent: "center",
// //           gap: "12px",
// //           paddingBottom: "16px",
// //         }}
// //       >
// //         <Button
// //           size="small"
// //           variant="contained"
// //           sx={{
// //             backgroundColor: "#000",
// //             color: "#fff",
// //             fontWeight: "bold",
// //             borderRadius: "8px",
// //             textTransform: "none",
// //             "&:hover": {
// //               backgroundColor: "#333",
// //             },
// //           }}
// //         >
// //           Buy Now
// //         </Button>

// //         <Button
// //           size="small"
// //           variant="contained"
// //           onClick={handleAddToCart} // 🔥 Add toastify on click
// //           sx={{
// //             background:
// //               "linear-gradient(135deg, rgb(235, 203, 144), rgb(212, 163, 115), rgb(245, 222, 179))",
// //             color: "#fff",
// //             fontWeight: "bold",
// //             borderRadius: "8px",
// //             textTransform: "none",
// //             "&:hover": {
// //               background:
// //                 "linear-gradient(135deg, rgb(212, 163, 115), rgb(235, 203, 144))",
// //             },
// //           }}
// //         >
// //           Add To Cart
// //         </Button>
// //       </CardActions>
// //     </Card>
// //   );
// // }


// import * as React from "react";
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   Rating,
//   Stack,
//   Chip,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useCart } from "../Context/CardContext";
// import { toast } from "react-toastify";

// export default function ProductCard({ product }) {
//   // Normalize product fields for backend shape
//   const pid = product?._id || product?.id || product?.Id;
//   const title = product?.title || product?.name || "Untitled";
//   const price = Number(product?.price || 0);
//   const category = product?.category || "General";
//   const rating = Number(product?.rating || 0);
//   const image =
//     product?.image ||
//     (Array.isArray(product?.images) && product.images[0]) ||
//     "";

//   const { dispatch } = useCart();

//   const handleAddToCart = () => {
//     if (!pid) return;
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: {
//         id: pid,
//         name: title,
//         price,
//         image,
//         category,
//       },
//     });
//     toast.success(`${title} added to cart 🛒`, {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "colored",
//     });
//   };

//   return (
//     <Card
//       sx={{
//         width: 285,
//         borderRadius: 3,
//         overflow: "hidden",
//         border: "1px solid #eee",
//         boxShadow:
//           "0 1px 1px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06)",
//         transition: "transform 200ms ease, box-shadow 200ms ease",
//         "&:hover": {
//           transform: "translateY(-4px)",
//           boxShadow:
//             "0 2px 2px rgba(0,0,0,0.05), 0 6px 18px rgba(0,0,0,0.12)",
//         },
//       }}
//     >
//       <Link
//         to={`/productDetails/${pid}`}
//         style={{ display: "block", textDecoration: "none", color: "inherit" }}
//       >
//         <CardMedia
//           component="img"
//           alt={title}
//           image={image || "/placeholder.png"}
//           sx={{
//             height: 200,
//             objectFit: "cover",
//             backgroundColor: "#fafafa",
//           }}
//           onError={(e) => {
//             e.currentTarget.src = "/placeholder.png";
//           }}
//         />
//       </Link>

//       <CardContent sx={{ px: 2, pt: 1.5, pb: 1.5 }}>
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           sx={{ mb: 1 }}
//         >
//           <Tooltip title={title}>
//             <Typography
//               variant="subtitle1"
//               fontWeight={700}
//               noWrap
//               sx={{ maxWidth: "70%" }}
//             >
//               {title}
//             </Typography>
//           </Tooltip>
//           <Chip
//             size="small"
//             label={category}
//             sx={{ bgcolor: "#f5f5f5", fontWeight: 600 }}
//           />
//         </Stack>

//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           <Typography variant="h6" fontWeight={800} color="text.primary">
//             ₹{price.toLocaleString("en-IN")}
//           </Typography>
//           <Stack direction="row" alignItems="center" spacing={0.5}>
//             <Rating
//               name={`rating-${pid}`}
//               value={Number.isFinite(rating) ? rating : 0}
//               precision={0.5}
//               readOnly
//               size="small"
//             />
//             <Typography variant="caption" color="text.secondary">
//               {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
//             </Typography>
//           </Stack>
//         </Stack>
//       </CardContent>

//       <CardActions
//         sx={{
//           px: 2,
//           pb: 2,
//           pt: 0.5,
//           display: "flex",
//           justifyContent: "space-between",
//           gap: 1,
//         }}
//       >
//         <Button
//           fullWidth
//           size="small"
//           variant="outlined"
//           component={Link}
//           to={`/productDetails/${pid}`}
//           sx={{
//             borderRadius: 2,
//             textTransform: "none",
//             fontWeight: 700,
//           }}
//         >
//           View Details
//         </Button>

//         <Button
//           fullWidth
//           size="small"
//           variant="contained"
//           onClick={handleAddToCart}
//           sx={{
//             borderRadius: 2,
//             textTransform: "none",
//             fontWeight: 700,
//             background:
//               "linear-gradient(135deg, rgb(235, 203, 144), rgb(212, 163, 115))",
//             "&:hover": {
//               background:
//                 "linear-gradient(135deg, rgb(212, 163, 115), rgb(235, 203, 144))",
//             },
//           }}
//         >
//           Add to Cart
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Rating,
  Stack,
  Chip,
  Box,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CardContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  // Normalize product fields for backend shape
  const pid = product?._id || product?.id || product?.Id;
  const title = product?.title || product?.name || "Untitled";
  const price = Number(product?.price || 0);
  const category = product?.category || "General";
  const rating = Number(product?.rating || 0);
  const image =
    product?.image ||
    (Array.isArray(product?.images) && product.images[0]) ||
    "";

  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (!pid) return;
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: pid,
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
    <Card
      sx={{
        width: 285,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #eee",
        boxShadow: "0 1px 1px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06)",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 2px 2px rgba(0,0,0,0.05), 0 6px 18px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Link
        to={`/productDetails/${pid}`}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        {/* Aspect-ratio media wrapper prevents cropping on desktop */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: { xs: "1 / 1", sm: "4 / 3" }, // square on mobile, wider on desktop
            bgcolor: "#fafafa",
            borderBottom: "1px solid #efefef",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            component="img"
            alt={title}
            src={image || "/placeholder.png"}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Link>

      <CardContent sx={{ px: 2, pt: 1.5, pb: 1.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Tooltip title={title}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              noWrap
              sx={{ maxWidth: "70%" }}
            >
              {title}
            </Typography>
          </Tooltip>
          <Chip size="small" label={category} sx={{ bgcolor: "#f5f5f5", fontWeight: 600 }} />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={800} color="text.primary">
            ₹{price.toLocaleString("en-IN")}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Rating
              name={`rating-${pid}`}
              value={Number.isFinite(rating) ? rating : 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="caption" color="text.secondary">
              {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0.5,
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button
          fullWidth
          size="small"
          variant="outlined"
          component={Link}
          to={`/productDetails/${pid}`}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
        >
          View Details
        </Button>

        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            background:
              "linear-gradient(135deg, rgb(235, 203, 144), rgb(212, 163, 115))",
            "&:hover": {
              background:
                "linear-gradient(135deg, rgb(212, 163, 115), rgb(235, 203, 144))",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}