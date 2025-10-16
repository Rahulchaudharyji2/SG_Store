import React, { useEffect, useState } from 'react';
import ProdoctCarousel from '../components/ProductInfoCarousel';
import ProductCard from '../components/ProductCard';
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
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

// Ensure this hook exists in productsApi (getProductsByCategory)
import { useGetProductsByCategoryQuery } from '../features/products/productsApi';

function Flower() {
  // Adjust to your exact backend category if needed ('Flower' vs 'Flowers')
  const CATEGORY = 'Flower';

  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isLoading, isFetching, error, refetch } =
    useGetProductsByCategoryQuery({
      category: CATEGORY,
      q: debouncedQ || undefined,
      limit: 50,
      skip: 0,
    });

  const products = data?.products || [];

  return (
    <>
      {/* Hero carousel */}
      <ProdoctCarousel
        img1="https://res.cloudinary.com/dgooittzu/image/upload/v1758774253/flower_banner_1_bhxu1l.png"
        img2="https://res.cloudinary.com/dgooittzu/image/upload/v1759556558/flowers_Banner_2_uhcu8e.png"
      />

      {/* Dual video banners */}
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                component="video"
                src="https://res.cloudinary.com/dgooittzu/video/upload/v1758884630/small_banner_1_for_flower_woxa8v.mp4"
                autoPlay
                muted
                loop
                playsInline
                sx={{
                  width: '100%',
                  height: { xs: 220, md: 320 },
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="video"
                src="https://res.cloudinary.com/dgooittzu/video/upload/v1758884654/small_banner_2_for_flower_zpqypv.mp4"
                autoPlay
                muted
                loop
                playsInline
                sx={{
                  width: '100%',
                  height: { xs: 220, md: 320 },
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Products section */}
      <Box
        sx={{
          background:
            'linear-gradient(135deg, rgba(235,203,144,0.10) 0%, rgba(244,244,244,0.80) 100%)',
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          {/* Header + Controls */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h5" fontWeight={800}>
                {CATEGORY}s
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore our {CATEGORY.toLowerCase()} collection. Use search to quickly find items.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search ${CATEGORY.toLowerCase()} by title...`}
                size="small"
                sx={{ minWidth: { xs: '100%', sm: 300 } }}
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
                  setQ('');
                  refetch();
                }}
                startIcon={<RefreshRoundedIcon />}
                disabled={isFetching}
                sx={{ textTransform: 'none', borderRadius: 2, whiteSpace: 'nowrap' }}
              >
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Chip label={`${products.length} items`} size="small" sx={{ bgcolor: '#f1f1f1' }} />
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
              {error?.data?.message || `Failed to load ${CATEGORY.toLowerCase()} products`}
            </Alert>
          )}

          {/* Product grid: 4 cards on desktop */}
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

            {!isLoading && products.length === 0 && !error && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    No {CATEGORY.toLowerCase()} products found{debouncedQ ? ` for “${debouncedQ}”` : ''}.
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

export default Flower;