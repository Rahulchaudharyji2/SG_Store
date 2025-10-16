// import React, { useState } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useLoginMutation } from '../../features/auth/authApi'; // adjust path if your features folder is elsewhere
// import { setCredentials } from '../../features/auth/authSlice';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [login, { isLoading }] = useLoginMutation();
//   const [formError, setFormError] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   // Where to go after login; fallback to admin profile
//   const from = location.state?.from?.pathname || '/admin/profile';

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setFormError(null);
//     try {
//       const res = await login({ email, password }).unwrap();
//       // res must contain { token, user }
//       dispatch(setCredentials(res));
//       navigate(from, { replace: true });
//     } catch (err) {
//       // Show a friendly error
//       const msg = err?.data?.message || err?.error || 'Login failed';
//       setFormError(msg);
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
//       <h2>Admin Login</h2>
//       <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           autoComplete="username"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Admin Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="current-password"
//           required
//         />
//         <button disabled={isLoading} type="submit">
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>

//       {formError && (
//         <p style={{ color: 'red', marginTop: 8 }}>{formError}</p>
//       )}

//       <p style={{ marginTop: 16 }}>
//         Back to <Link to="/products">Products</Link>
//       </p>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Stack,
  CircularProgress,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

// Adjust paths if your folders differ
import { useLoginMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const [formError, setFormError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Where to go after login; fallback to admin profile
  const from = location.state?.from?.pathname || '/admin/profile';

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Simple client-side checks
    if (!email || !password) {
      setFormError('Please enter email and password.');
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      // res must contain { token, user }
      dispatch(setCredentials(res));
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.data?.message || err?.error || 'Login failed. Please try again.';
      setFormError(msg);
      // eslint-disable-next-line no-console
      console.error('Login error:', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, rgba(235,203,144,0.25) 0%, rgba(244,244,244,0.9) 100%)',
        display: 'grid',
        placeItems: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 5, md: 8 } }}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backdropFilter: 'blur(6px)',
          }}
        >
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <IconButton
              size="small"
              component={Link}
              to="/"
              sx={{ color: 'text.secondary' }}
              aria-label="Back to home"
            >
              <ArrowBackIosNewRoundedIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Back to Home
            </Typography>
          </Stack>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <img
                src="/logo.jpg"
                alt="Logo"
                style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }}
              />
              <Typography variant="h5" fontWeight={700}>
                Admin Login
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sign in to manage products and view your admin dashboard.
            </Typography>
          </Box>

          {/* Error */}
          {formError ? (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {formError}
            </Alert>
          ) : null}

          {/* Form */}
          <Box component="form" onSubmit={onSubmit} noValidate>
            <TextField
              label="Admin Email"
              type="email"
              fullWidth
              size="medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              fullWidth
              size="medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              margin="normal"
              required
              type={showPwd ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPwd((s) => !s)}
                      edge="end"
                    >
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.2,
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 2,
                backgroundColor: '#37353E',
                '&:hover': { backgroundColor: '#2c2b33' },
              }}
              startIcon={!isLoading ? <LoginRoundedIcon /> : null}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: 'white' }} />
                  Logging in...
                </Box>
              ) : (
                'Login'
              )}
            </Button>
          </Box>

          {/* Footer Links */}
          <Divider sx={{ my: 3 }} />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Typography variant="body2" color="text.secondary">
              Not an admin? Go back to{' '}
              <Typography
                component={Link}
                to="/"
                variant="body2"
                sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}
              >
                Home
              </Typography>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Need an account? Create via{' '}
              <Typography
                component="span"
                sx={{ fontWeight: 600 }}
                title="Use /admin/signup with ADMIN_SECRET (Postman)"
              >
                /admin/signup
              </Typography>
            </Typography>
          </Stack>
        </Paper>

        {/* Subtle helper */}
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Tip: Make sure you created an admin via the secure signup endpoint and are using the
          correct credentials.
        </Typography>
      </Container>
    </Box>
  );
}