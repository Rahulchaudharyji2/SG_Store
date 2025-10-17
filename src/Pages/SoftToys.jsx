// import React, { useEffect, useState } from 'react';
// import ProdoctCarousel from '../components/ProductInfoCarousel';
// import ProductCard from '../components/ProductCard';
// import {
//   Box,
//   Container,
//   Grid,
//   Stack,
//   Typography,
//   TextField,
//   InputAdornment,
//   Chip,
//   Button,
//   LinearProgress,
//   Alert,
//   Skeleton,
// } from '@mui/material';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

// // Use the category endpoint hook (make sure it's exported from productsApi)
// import { useGetProductsByCategoryQuery } from '../features/products/productsApi';

// function SoftToys() {
//   // Change this to match your backend exactly if needed (e.g., "Soft Toy")
//   const CATEGORY = 'Soft Toy';

//   const [q, setQ] = useState('');
//   const [debouncedQ, setDebouncedQ] = useState('');

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
//     return () => clearTimeout(t);
//   }, [q]);

//   const { data, isLoading, isFetching, error, refetch } =
//     useGetProductsByCategoryQuery({
//       category: CATEGORY,
//       q: debouncedQ || undefined,
//       limit: 50,
//       skip: 0,
//     });

//   const products = data?.products || [];

//   return (
//     <>
//       {/* Hero carousel */}
//       <ProdoctCarousel
//         img2="https://res.cloudinary.com/dgooittzu/image/upload/v1758692145/banner_of_soft_toys_2_qa95l7.png"
//         img1="https://res.cloudinary.com/dgooittzu/image/upload/v1758620565/banner_of_soft_toys_1_z8n3zt.png"
//       />

//       {/* Dual banner section */}
//       <Box sx={{ py: { xs: 2, md: 4 } }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Box
//                 component="img"
//                 src="https://res.cloudinary.com/dgooittzu/image/upload/v1758864833/small_banner_1_soft_toy_fjiqld.png"
//                 alt="Soft Toys Banner 1"
//                 sx={{
//                   width: '100%',
//                   height: { xs: 220, md: 300 },
//                   objectFit: 'cover',
//                   borderRadius: 3,
//                   boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box
//                 component="img"
//                 src="https://res.cloudinary.com/dgooittzu/image/upload/v1758866664/small_banner_2_soft_toy_be3bko.png"
//                 alt="Soft Toys Banner 2"
//                 sx={{
//                   width: '100%',
//                   height: { xs: 220, md: 300 },
//                   objectFit: 'cover',
//                   borderRadius: 3,
//                   boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       <Box
//         sx={{
//           background:
//             'linear-gradient(135deg, rgba(235,203,144,0.10) 0%, rgba(244,244,244,0.80) 100%)',
//           py: { xs: 3, md: 5 },
//         }}
//       >
//         <Container maxWidth="lg">
//           {/* Header + Controls */}
//           <Stack
//             direction={{ xs: 'column', sm: 'row' }}
//             alignItems={{ xs: 'flex-start', sm: 'center' }}
//             justifyContent="space-between"
//             spacing={2}
//             sx={{ mb: 2 }}
//           >
//             <Stack spacing={0.5}>
//               <Typography variant="h5" fontWeight={800}>
//                 Soft Toys
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Explore our soft toy collection. Use search to quickly find items.
//               </Typography>
//             </Stack>

//             <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
//               <TextField
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 placeholder="Search soft toys by title..."
//                 size="small"
//                 sx={{ minWidth: { xs: '100%', sm: 300 } }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchOutlinedIcon fontSize="small" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => {
//                   setQ('');
//                   refetch();
//                 }}
//                 startIcon={<RefreshRoundedIcon />}
//                 disabled={isFetching}
//                 sx={{ textTransform: 'none', borderRadius: 2, whiteSpace: 'nowrap' }}
//               >
//                 {isFetching ? 'Refreshing...' : 'Refresh'}
//               </Button>
//               <Chip label={`${products.length} items`} size="small" sx={{ bgcolor: '#f1f1f1' }} />
//             </Stack>
//           </Stack>

//           {(isLoading || isFetching) && <LinearProgress sx={{ mb: 2 }} />}

//           {error && (
//             <Alert
//               severity="error"
//               sx={{ mb: 2, borderRadius: 2 }}
//               action={
//                 <Button color="inherit" size="small" onClick={() => refetch()}>
//                   Retry
//                 </Button>
//               }
//             >
//               {error?.data?.message || 'Failed to load soft toys'}
//             </Alert>
//           )}

//           {/* Product grid: 4 cards on desktop */}
//           <Grid container spacing={2}>
//             {isLoading
//               ? Array.from({ length: 8 }).map((_, i) => (
//                   <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
//                     <Skeleton variant="rounded" height={300} />
//                   </Grid>
//                 ))
//               : products.map((p) => (
//                   <Grid item xs={12} sm={6} md={3} lg={3} key={p._id || p.id}>
//                     <ProductCard product={p} />
//                   </Grid>
//                 ))}

//             {!isLoading && products.length === 0 && !error && (
//               <Grid item xs={12}>
//                 <Box sx={{ textAlign: 'center', py: 6 }}>
//                   <Typography variant="body1" color="text.secondary">
//                     No soft toys found{debouncedQ ? ` for “${debouncedQ}”` : ''}.
//                   </Typography>
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// }

// export default SoftToys;
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
import { useGetProductsByCategoryQuery } from '../features/products/productsApi';

function SoftToys() {
  const CATEGORY = 'Soft Toy';

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
      {/* Hero Carousel */}
      <ProdoctCarousel
        img2="https://res.cloudinary.com/dgooittzu/image/upload/v1758692145/banner_of_soft_toys_2_qa95l7.png"
        img1="https://res.cloudinary.com/dgooittzu/image/upload/v1758620565/banner_of_soft_toys_1_z8n3zt.png"
      />

      {/* Dual Banner Section */}
      {/* <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dgooittzu/image/upload/v1758864833/small_banner_1_soft_toy_fjiqld.png"
                alt="Soft Toys Banner 1"
                sx={{
                  width: '100%',
                  height: { xs: 200, sm: 250, md: 300 },
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dgooittzu/image/upload/v1758866664/small_banner_2_soft_toy_be3bko.png"
                alt="Soft Toys Banner 2"
                sx={{
                  width: '100%',
                  height: { xs: 200, sm: 250, md: 300 },
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box> */}

      <section className="mt-12 flex justify-center px-4 mt-5">
        <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner Image */}
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dgooittzu/image/upload/v1758864833/small_banner_1_soft_toy_fjiqld.png"
              alt="Jewellery Banner"
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dgooittzu/image/upload/v1758866664/small_banner_2_soft_toy_be3bko.png"
              alt="Jewellery Banner"
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>

          {/* Promotional Video */}
          
        </div>
      </section>

      {/* Product Section */}
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
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            {/* Title + Subtitle */}
            <Stack spacing={0.5} sx={{ textAlign: { xs: 'center', sm: 'left' }, width: '100%' }}>
              <Typography variant="h5" fontWeight={800}>
                Soft Toys
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore our soft toy collection. Use search to quickly find items.
              </Typography>
            </Stack>

            {/* Search + Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              alignItems="center"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search soft toys..."
                size="small"
                fullWidth
                sx={{
                  minWidth: { xs: '100%', sm: 260 },
                  bgcolor: 'white',
                  borderRadius: 2,
                }}
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
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </Button>

              <Chip
                label={`${products.length} items`}
                size="small"
                sx={{
                  bgcolor: '#f1f1f1',
                  width: { xs: '100%', sm: 'auto' },
                  textAlign: 'center',
                }}
              />
            </Stack>
          </Stack>

          {/* Loading and Error States */}
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
              {error?.data?.message || 'Failed to load soft toys'}
            </Alert>
          )}

          {/* Product Grid */}
          <Grid container spacing={2}>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Skeleton variant="rounded" height={300} />
                  </Grid>
                ))
              : products.map((p) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={p._id || p.id}>
                    <ProductCard product={p} />
                  </Grid>
                ))}

            {!isLoading && products.length === 0 && !error && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    No soft toys found{debouncedQ ? ` for “${debouncedQ}”` : ''}.
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

export default SoftToys;
