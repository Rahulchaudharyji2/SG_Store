import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../store/Api";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchProducts(query),
    enabled: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Search Products
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            label="Search by name or category"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Search
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {data?.length > 0 ? (
            data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography>{item.category}</Typography>
                    <Typography>₹{item.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography sx={{ mt: 4 }}>No products found</Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchProduct;
