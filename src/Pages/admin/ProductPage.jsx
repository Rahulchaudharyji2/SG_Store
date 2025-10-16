import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  LinearProgress,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

// Adjust this path to your project structure if needed
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../features/products/productsApi';

export default function ProductsPage() {
  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    image1: '',
    image2: '',
    price: '',
    category: '',
    rating: 0,
  });

  // Search/filter state with debounce
  const [q, setQ] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [debounced, setDebounced] = useState({ q: '', category: '' });

  useEffect(() => {
    const t = setTimeout(() => setDebounced({ q: q.trim(), category: categoryFilter.trim() }), 350);
    return () => clearTimeout(t);
  }, [q, categoryFilter]);

  const { data, isLoading, isFetching, error, refetch } = useGetProductsQuery({
    q: debounced.q || undefined,
    category: debounced.category || undefined,
    limit: 100,
    skip: 0,
  });

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  // UX helpers
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [confirm, setConfirm] = useState({ open: false, id: null, title: '' });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const imagesValid = useMemo(() => {
    const i1 = form.image1?.trim();
    const i2 = form.image2?.trim();
    const urlRe = /^https?:\/\/.+/i;
    return Boolean(i1 && i2 && urlRe.test(i1) && urlRe.test(i2));
  }, [form.image1, form.image2]);

  const canSubmit = useMemo(() => {
    return (
      form.title.trim().length > 0 &&
      form.description.trim().length > 0 &&
      imagesValid &&
      Number(form.price) > 0 &&
      form.category.trim().length > 0 &&
      Number(form.rating) >= 0 &&
      Number(form.rating) <= 5
    );
  }, [form, imagesValid]);

  const resetForm = () =>
    setForm({
      title: '',
      description: '',
      image1: '',
      image2: '',
      price: '',
      category: '',
      rating: 0,
    });

  const onCreate = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      await createProduct({
        title: form.title.trim(),
        description: form.description.trim(),
        images: [form.image1.trim(), form.image2.trim()], // backend requires exactly two images
        price: Number(form.price),
        category: form.category.trim(),
        rating: Number(form.rating || 0),
      }).unwrap();

      resetForm();
      setSnack({ open: true, message: 'Product created successfully', severity: 'success' });
      refetch();
    } catch (err) {
      const msg = err?.data?.message || err?.error || 'Failed to create product';
      setSnack({ open: true, message: msg, severity: 'error' });
    }
  };

  const askDelete = (id, title) => setConfirm({ open: true, id, title });
  const closeConfirm = () => setConfirm({ open: false, id: null, title: '' });

  const onDelete = async () => {
    if (!confirm.id) return;
    try {
      await deleteProduct(confirm.id).unwrap();
      setSnack({ open: true, message: 'Product deleted', severity: 'success' });
      closeConfirm();
      refetch();
    } catch (err) {
      const msg = err?.data?.message || err?.error || 'Failed to delete product';
      setSnack({ open: true, message: msg, severity: 'error' });
    }
  };

  const products = data?.products || [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, rgba(235,203,144,0.12) 0%, rgba(244,244,244,0.8) 100%)',
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              Admin: Manage Products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create new products and manage the catalog. Use the search to quickly find items.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => refetch()}
              startIcon={<RefreshRoundedIcon />}
              disabled={isFetching}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              {isFetching ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Stack>
        </Stack>

        {/* Top controls: Search + Filter */}
        <Paper elevation={3} sx={{ p: 2.5, borderRadius: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by title..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Filter by category (exact)"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  setQ('');
                  setCategoryFilter('');
                }}
                sx={{ height: '100%', textTransform: 'none', borderRadius: 2 }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Create form */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Add New Product
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Provide product details. Exactly two image URLs are required.
              </Typography>

              <Box component="form" onSubmit={onCreate} noValidate>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={form.title}
                  onChange={onChange}
                  margin="dense"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  value={form.description}
                  onChange={onChange}
                  margin="dense"
                  required
                  multiline
                  minRows={3}
                />

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <TextField
                    label="Image URL 1"
                    name="image1"
                    fullWidth
                    value={form.image1}
                    onChange={onChange}
                    margin="dense"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(form.image1) && !/^https?:\/\/.+/i.test(form.image1)}
                    helperText={
                      Boolean(form.image1) && !/^https?:\/\/.+/i.test(form.image1)
                        ? 'Enter a valid http(s) URL'
                        : ' '
                    }
                  />
                  <TextField
                    label="Image URL 2"
                    name="image2"
                    fullWidth
                    value={form.image2}
                    onChange={onChange}
                    margin="dense"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(form.image2) && !/^https?:\/\/.+/i.test(form.image2)}
                    helperText={
                      Boolean(form.image2) && !/^https?:\/\/.+/i.test(form.image2)
                        ? 'Enter a valid http(s) URL'
                        : ' '
                    }
                  />
                </Stack>

                {/* Image previews */}
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  {[form.image1, form.image2].map((src, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 88,
                        height: 88,
                        borderRadius: 2,
                        overflow: 'hidden',
                        bgcolor: '#f7f7f7',
                        border: '1px dashed #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/^https?:\/\/.+/i.test(src) ? (
                        <img
                          src={src}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Preview
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>

                <TextField
                  label="Price (INR)"
                  name="price"
                  type="number"
                  fullWidth
                  value={form.price}
                  onChange={onChange}
                  margin="dense"
                  required
                  inputProps={{ min: 0, step: '0.01' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Category"
                  name="category"
                  fullWidth
                  value={form.category}
                  onChange={onChange}
                  margin="dense"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Rating (0-5)"
                  name="rating"
                  type="number"
                  fullWidth
                  value={form.rating}
                  onChange={onChange}
                  margin="dense"
                  inputProps={{ min: 0, max: 5, step: '0.5' }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StarRateRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!canSubmit || creating}
                  startIcon={!creating ? <AddRoundedIcon /> : null}
                  sx={{
                    mt: 2,
                    py: 1.2,
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 2,
                    backgroundColor: '#37353E',
                    '&:hover': { backgroundColor: '#2c2b33' },
                  }}
                >
                  {creating ? 'Creating...' : 'Create Product'}
                </Button>

                {!imagesValid && (
                  <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
                    Exactly two valid image URLs (http/https) are required.
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Products list */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper elevation={6} sx={{ p: 2, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>
                  Existing Products
                </Typography>
                <Chip
                  label={`${products.length} items`}
                  size="small"
                  sx={{ bgcolor: '#f1f1f1' }}
                />
              </Stack>

              {isLoading || isFetching ? <LinearProgress sx={{ mb: 2 }} /> : <Divider sx={{ mb: 2 }} />}

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error?.data?.message || 'Failed to load products'}
                </Alert>
              )}

              <Grid container spacing={2}>
                {products.map((p) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={p._id}>
                    <Card elevation={3} sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="160"
                          image={Array.isArray(p.images) && p.images[0] ? p.images[0] : ''}
                          alt={p.title}
                          sx={{ objectFit: 'cover' }}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            display: 'flex',
                            gap: 0.5,
                            flexWrap: 'wrap',
                          }}
                        >
                          <Chip
                            size="small"
                            label={p.category}
                            icon={<CategoryOutlinedIcon sx={{ fontSize: 16 }} />}
                            sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}
                          />
                          <Chip
                            size="small"
                            label={`₹${Number(p.price).toLocaleString()}`}
                            icon={<AttachMoneyOutlinedIcon sx={{ fontSize: 16 }} />}
                            sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}
                          />
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Tooltip title={p.title}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            noWrap
                            sx={{ mb: 0.5 }}
                          >
                            {p.title}
                          </Typography>
                        </Tooltip>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {p.description}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <Chip
                            size="small"
                            label={`Rating: ${p.rating}`}
                            icon={<StarRateRoundedIcon sx={{ fontSize: 16 }} />}
                            variant="outlined"
                          />
                        </Stack>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                        <Tooltip title="Delete product">
                          <span>
                            <IconButton
                              color="error"
                              disabled={deleting}
                              onClick={() => askDelete(p._id, p.title)}
                            >
                              <DeleteOutlineRoundedIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {products.length === 0 && !isLoading && !isFetching && !error && (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="body1" color="text.secondary">
                    No products found.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Delete confirmation */}
      <Dialog open={confirm.open} onClose={closeConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">
            Are you sure you want to delete
            {' '}
            <strong>{confirm.title || 'this product'}</strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm} disabled={deleting}>Cancel</Button>
          <Button color="error" variant="contained" onClick={onDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}