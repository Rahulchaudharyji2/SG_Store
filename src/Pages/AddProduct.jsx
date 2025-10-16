// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { addProduct } from "../store/Api"; // Your API function
// import { toast } from "react-toastify";

// const AddProduct = () => {
//   const [images, setImages] = useState(["", ""]); // Support multiple images (2 by default)

//   const handleImageChange = (index, value) => {
//     const newImages = [...images];
//     newImages[index] = value;
//     setImages(newImages);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     const productData = {
//       title: data.get("title"),
//       description: data.get("description"),
//       price: parseFloat(data.get("price")),
//       category: data.get("category"),
//       images: images.filter((img) => img !== ""), // remove empty URLs
//     };

//     try {
//       const response = await addProduct(productData);
//       toast.success("Product added successfully!", { position: "top-left" });
//       console.log("Product added:", response);
//     } catch (error) {
//       console.error("Error adding product:", error.message);
//       toast.error("Failed to add product!", { position: "top-left" });
//     }
//   };

//   return (
//     <Container component="main" maxWidth="md">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           backgroundColor: "#f8f9fa",
//           padding: 4,
//           borderRadius: 3,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <AddCircleIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//           Add New Product
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="title"
//             label="Product Title"
//             name="title"
//             autoFocus
//           />

//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="description"
//             label="Description"
//             name="description"
//             multiline
//             rows={4}
//           />

//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="price"
//             label="Price"
//             name="price"
//             type="number"
//           />

//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="category"
//             label="Category"
//             name="category"
//           />

//           {images.map((img, index) => (
//             <TextField
//               key={index}
//               margin="normal"
//               fullWidth
//               id={`image-${index}`}
//               label={`Image URL ${index + 1}`}
//               value={img}
//               onChange={(e) => handleImageChange(index, e.target.value)}
//             />
//           ))}

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2, py: 1.5 }}
//           >
//             Add Product
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AddProduct;



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
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../store/Api"; // your API function
import { toast } from "react-toastify";

const AddProduct = () => {
  const mutation = useMutation({ mutationFn: addProduct });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const product = {
      title: data.get("title"),
      description: data.get("description"),
      category: data.get("category"),
      price: data.get("price"),
    };
    mutation.mutate(product, {
      onSuccess: () => toast.success("Product added successfully!"),
      onError: () => toast.error("Failed to add product!"),
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AddBusinessIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField fullWidth label="Title" name="title" margin="normal" required />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="normal"
            required
          />
          <TextField fullWidth label="Category" name="category" margin="normal" required />
          <TextField fullWidth label="Price" name="price" margin="normal" required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddProduct;
