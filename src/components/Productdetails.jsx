// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   Rating,
//   Divider,
//   Grid,
//   Container,
//   Chip,
//   Skeleton,
//   Alert,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
// import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
// import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
// import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
// import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
// import { useCart } from "../Context/CardContext";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// // Adjust path if needed
// import { useGetProductByIdQuery } from "../features/products/productsApi";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const { data: p, isLoading, error, refetch, isFetching } =
//     useGetProductByIdQuery(id);
//   const { dispatch } = useCart();

//   const title = p?.title || "Untitled";
//   const images = Array.isArray(p?.images) ? p.images : [];
//   const mainImage = images[0] || p?.image || "/placeholder.png";
//   const price = Number(p?.price || 0);
//   const rating = Number(p?.rating || 0);
//   const category = p?.category || "General";
//   const description = p?.description || "No description available.";

//   const [activeIndex, setActiveIndex] = React.useState(0);

//   React.useEffect(() => {
//     setActiveIndex(0);
//   }, [id]);

//   const handleAddToCart = () => {
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: {
//         id: p?._id || id,
//         name: title,
//         price,
//         image: images[0] || "",
//         category,
//       },
//     });

//     toast.success(`${title} added to cart 🛒`, {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "colored",
//     });
//   };

//   if (isLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Grid container spacing={5} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <Skeleton variant="rounded" height={420} />
//             <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//               <Skeleton variant="rounded" width={80} height={80} />
//               <Skeleton variant="rounded" width={80} height={80} />
//             </Stack>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Skeleton width="60%" height={50} />
//             <Skeleton width="30%" height={28} />
//             <Skeleton height={18} />
//             <Skeleton height={18} />
//             <Skeleton height={18} />
//             <Skeleton width="40%" height={42} sx={{ mt: 2 }} />
//           </Grid>
//         </Grid>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="md" sx={{ py: 8 }}>
//         <Alert
//           severity="error"
//           action={
//             <Button color="inherit" size="small" onClick={() => refetch()}>
//               Retry
//             </Button>
//           }
//           sx={{ borderRadius: 2 }}
//         >
//           {error?.data?.message || "Failed to load product"}
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 6, fontFamily: "Poppins, sans-serif" }}>
//       <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
//         {/* Left: Image gallery */}
//         <Grid item xs={12} md={6}>
//           <Paper
//             elevation={6}
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               bgcolor: "#161b22",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               minHeight: { xs: 260, md: 360 },
//               maxHeight: { xs: "70vh", md: "75vh" },
//               width: "100%",
//               overflow: "hidden",
//               position: "relative",
//             }}
//           >
//             <motion.img
//               key={activeIndex}
//               src={images[activeIndex] || mainImage}
//               alt={title}
//               initial={{ opacity: 0.6, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.35 }}
//               draggable={false}
//               style={{
//                 // Important: natural size first, only shrink if needed
//                 width: "auto",
//                 height: "auto",
//                 maxWidth: "100%",
//                 maxHeight: "100%",
//                 display: "block",
//                 borderRadius: 12,
//               }}
//               onError={(e) => {
//                 e.currentTarget.src = "/placeholder.png";
//               }}
//             />

//             <IconButton
//               aria-label="refresh"
//               size="small"
//               onClick={() => refetch()}
//               disabled={isFetching}
//               sx={{ position: "absolute", right: 10, top: 10, color: "#fff" }}
//               title="Refresh"
//             >
//               <RefreshRoundedIcon />
//             </IconButton>
//           </Paper>

//           {/* Thumbnails */}
//           {images.length > 1 && (
//             <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//               {images.map((src, i) => (
//                 <Box
//                   key={i}
//                   component="img"
//                   src={src}
//                   alt={`thumb-${i}`}
//                   onClick={() => setActiveIndex(i)}
//                   onError={(e) => {
//                     e.currentTarget.style.display = "none";
//                   }}
//                   sx={{
//                     width: 72,
//                     height: 92,
//                     objectFit: "cover",
//                     borderRadius: 2,
//                     border:
//                       i === activeIndex
//                         ? "2px solid #F4C542"
//                         : "1px solid #e0e0e0",
//                     p: 0.5,
//                     cursor: "pointer",
//                     bgcolor: "#fafafa",
//                   }}
//                 />
//               ))}
//             </Stack>
//           )}
//         </Grid>

//         {/* Right: Details */}
//         <Grid item xs={12} md={6}>
//           <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//             <IconButton
//               size="small"
//               component={Link}
//               to="/"
//               aria-label="Back"
//               title="Back"
//               sx={{ color: "text.secondary" }}
//             >
//               <ArrowBackIosNewRoundedIcon fontSize="small" />
//             </IconButton>
//             <Typography variant="body2" color="text.secondary">
//               Back to Home
//             </Typography>
//           </Stack>

//           <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#2b2b2b" }}>
//             {title}
//           </Typography>

//           <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
//             <Chip icon={<CategoryOutlinedIcon />} label={category} sx={{ bgcolor: "#f7f7f7" }} />
//             <Chip
//               icon={<AttachMoneyOutlinedIcon />}
//               label={`₹${price.toLocaleString("en-IN")}`}
//               sx={{ bgcolor: "#f7f7f7" }}
//             />
//           </Stack>

//           <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
//             <Rating name="product-rating" value={Number.isFinite(rating) ? rating : 0} precision={0.5} readOnly />
//             <Typography variant="body2" color="text.secondary">
//               <StarRateRoundedIcon
//                 fontSize="inherit"
//                 style={{ verticalAlign: "middle", marginRight: 4 }}
//               />
//               {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
//             </Typography>
//           </Stack>

//           <Divider sx={{ my: 2 }} />

//           <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
//             {description}
//           </Typography>

//           <Stack direction="row" spacing={2}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#F4C542",
//                 color: "#000",
//                 fontWeight: "bold",
//                 borderRadius: 2,
//                 px: 3,
//                 textTransform: "none",
//                 "&:hover": { backgroundColor: "#d4a933" },
//               }}
//             >
//               Buy Now
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleAddToCart}
//               sx={{
//                 background:
//                   "linear-gradient(135deg, rgb(235, 203, 144), rgb(212, 163, 115))",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 borderRadius: 2,
//                 px: 3,
//                 textTransform: "none",
//                 "&:hover": {
//                   background:
//                     "linear-gradient(135deg, rgb(212, 163, 115), rgb(235, 203, 144))",
//                 },
//               }}
//             >
//               Add to Cart
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Rating,
  Divider,
  Grid,
  Container,
  Chip,
  Skeleton,
  Alert,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useCart } from "../Context/CardContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// Adjust path if needed
import { useGetProductByIdQuery } from "../features/products/productsApi";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: p, isLoading, error, refetch, isFetching } =
    useGetProductByIdQuery(id);
  const { dispatch } = useCart();

  const title = p?.title || "Untitled";
  const images = Array.isArray(p?.images) ? p.images : [];
  const mainImage = images[0] || p?.image || "/placeholder.png";
  const price = Number(p?.price || 0);
  const rating = Number(p?.rating || 0);
  const category = p?.category || "General";
  const description = p?.description || "No description available.";

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [id]);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: p?._id || id,
        name: title,
        price,
        image: images[0] || "",
        category,
      },
    });

    toast.success(`${title} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={420} />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Skeleton variant="rounded" width={80} height={80} />
              <Skeleton variant="rounded" width={80} height={80} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton width="60%" height={50} />
            <Skeleton width="30%" height={28} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton height={18} />
            <Skeleton width="40%" height={42} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          {error?.data?.message || "Failed to load product"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, fontFamily: "Poppins, sans-serif" }}>
      <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
        {/* Left: Image gallery */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "#161b22",
              width: "100%",
              position: "relative",
            }}
          >
            {/* Centered image box; prevents cropping and keeps a neat layout */}
            <Box
              sx={{
                width: "100%",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
                borderRadius: 2,
                minHeight: { xs: 240, sm: 300, md: 360 },
                bgcolor: "#0f1115",
              }}
            >
              <Box
                component={motion.img}
                key={activeIndex}
                src={images[activeIndex] || mainImage}
                alt={title}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                draggable={false}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
                sx={{
                  // Your requested desktop style, responsive on mobile
                  width: { xs: "100%", md: "543px" },
                  height: { xs: "auto", md: "433px" },
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  borderRadius: "12px",
                  opacity: 1,
                  transform: "none",
                  objectFit: "contain",
                }}
              />
            </Box>

            <IconButton
              aria-label="refresh"
              size="small"
              onClick={() => refetch()}
              disabled={isFetching}
              sx={{ position: "absolute", right: 10, top: 10, color: "#fff" }}
              title="Refresh"
            >
              <RefreshRoundedIcon />
            </IconButton>
          </Paper>

          {/* Thumbnails */}
          {images.length > 1 && (
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              {images.map((src, i) => (
                <Box
                  key={i}
                  component="img"
                  src={src}
                  alt={`thumb-${i}`}
                  onClick={() => setActiveIndex(i)}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  sx={{
                    width: 72,
                    height: 72,
                    objectFit: "contain",
                    borderRadius: 2,
                    border:
                      i === activeIndex
                        ? "2px solid #F4C542"
                        : "1px solid #e0e0e0",
                    p: 0.5,
                    cursor: "pointer",
                    bgcolor: "#fafafa",
                  }}
                />
              ))}
            </Stack>
          )}
        </Grid>

        {/* Right: Details */}
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <IconButton
              size="small"
              component={Link}
              to="/"
              aria-label="Back"
              title="Back"
              sx={{ color: "text.secondary" }}
            >
              <ArrowBackIosNewRoundedIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Back to Home
            </Typography>
          </Stack>

          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#2b2b2b" }}>
            {title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Chip icon={<CategoryOutlinedIcon />} label={category} sx={{ bgcolor: "#f7f7f7" }} />
            <Chip
              icon={<AttachMoneyOutlinedIcon />}
              label={`₹${price.toLocaleString("en-IN")}`}
              sx={{ bgcolor: "#f7f7f7" }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating name="product-rating" value={Number.isFinite(rating) ? rating : 0} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              <StarRateRoundedIcon
                fontSize="inherit"
                style={{ verticalAlign: "middle", marginRight: 4 }}
              />
              {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
            {description}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F4C542",
                color: "#000",
                fontWeight: "bold",
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                "&:hover": { backgroundColor: "#d4a933" },
              }}
            >
              Buy Now
            </Button>

            <Button
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                background:
                  "linear-gradient(135deg, rgb(235, 203, 144), rgb(212, 163, 115))",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 2,
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
        </Grid>
      </Grid>
    </Container>
  );
}