import React, { useEffect, useState } from "react";
import ProdoctCarousel from "../components/ProductInfoCarousel";
import ProductCard from "../components/ProductCard";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Button,
  LinearProgress,
  Alert,
  Skeleton,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useGetProductsByCategoryQuery } from "../features/products/productsApi";

function Necklace() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  // Use the dedicated category endpoint
  const { data, isLoading, isFetching, error, refetch } =
    useGetProductsByCategoryQuery({
      category: "Necklace",
      q: debouncedQ || undefined,
      limit: 50,
      skip: 0,
    });

  const products = data?.products || [];

  return (
    <>
      <ProdoctCarousel
        img2="https://res.cloudinary.com/dgooittzu/image/upload/v1758303925/4_adwja4.png"
        img1="https://res.cloudinary.com/dgooittzu/image/upload/v1758347979/1_dk80af.png"
      />

      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(235,203,144,0.10) 0%, rgba(244,244,244,0.80) 100%)",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h5" fontWeight={800}>
                Necklaces
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore our necklace collection. Use search to quickly find items.
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search necklaces by title..."
                size="small"
                sx={{ minWidth: { xs: "100%", sm: 300 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setQ("");
                  refetch();
                }}
                startIcon={<RefreshRoundedIcon />}
                disabled={isFetching}
                sx={{ textTransform: "none", borderRadius: 2, whiteSpace: "nowrap" }}
              >
                {isFetching ? "Refreshing..." : "Refresh"}
              </Button>
              <Chip label={`${products.length} items`} size="small" sx={{ bgcolor: "#f1f1f1" }} />
            </Stack>
          </Stack>

          {(isLoading || isFetching) && <LinearProgress sx={{ mb: 2 }} />}

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2, borderRadius: 2 }}
              action={
                <Button color="inherit" size="small" onClick={() => refetch()}>
                  Retry
                </Button>
              }
            >
              {error?.data?.message || "Failed to load necklaces"}
            </Alert>
          )}

          <Grid container spacing={2}>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
                    <Skeleton variant="rounded" height={300} />
                  </Grid>
                ))
              : products.map((p) => (
                  <Grid item xs={12} sm={6} md={3} lg={3} key={p._id || p.id}>
                    <ProductCard product={p} />
                  </Grid>
                ))}

            {!isLoading && !error && products.length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    No necklaces found{debouncedQ ? ` for “${debouncedQ}”` : ""}.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Necklace;