import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Avatar,
  Typography,
  Stack,
  Divider,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Alert,
  Skeleton,
} from '@mui/material';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import { useGetProfileQuery } from '../../features/auth/authApi';
import { logout } from '../../features/auth/authSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error, refetch } = useGetProfileQuery();
  const { user: cachedUser } = useSelector((s) => s.auth || {});

  const profile = data || cachedUser;

  const initials = useMemo(() => {
    const name = profile?.name?.trim();
    if (!name) return 'A';
    const parts = name.split(/\s+/);
    return (parts[0]?.[0] || 'A') + (parts[1]?.[0] || '');
  }, [profile?.name]);

  const isAdmin = profile?.role === 'admin';

  const onLogout = () => {
    dispatch(logout());
    navigate('/admin/login', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, rgba(235,203,144,0.12) 0%, rgba(244,244,244,0.85) 100%)',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
          {/* Header */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'center', sm: 'flex-start' }}
            spacing={2.5}
          >
            {/* Avatar */}
            {isLoading ? (
              <Skeleton variant="circular" width={72} height={72} />
            ) : (
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  fontSize: 28,
                  fontWeight: 800,
                  bgcolor: '#37353E',
                }}
                alt={profile?.name || 'Admin'}
              >
                {initials.toUpperCase()}
              </Avatar>
            )}

            {/* Name + role */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
              {isLoading ? (
                <>
                  <Skeleton width="60%" height={32} />
                  <Skeleton width="35%" height={22} />
                </>
              ) : (
                <>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="h5" fontWeight={800}>
                      {profile?.name || 'Admin'}
                    </Typography>
                    {isAdmin && (
                      <Chip
                        size="small"
                        icon={<AdminPanelSettingsOutlinedIcon sx={{ fontSize: 16 }} />}
                        label="Admin"
                        color="default"
                        sx={{ bgcolor: '#f1f1f1' }}
                      />
                    )}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Manage products and view your admin profile
                  </Typography>
                </>
              )}
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing={1}>
              <Tooltip title="Refresh">
                <span>
                  <IconButton onClick={() => refetch()} disabled={isFetching || isLoading}>
                    <RefreshRoundedIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton color="error" onClick={onLogout}>
                  <LogoutRoundedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Error */}
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
              {error?.data?.message || 'Failed to load profile'}
            </Alert>
          )}

          {/* Details */}
          {isLoading ? (
            <Stack spacing={1.5}>
              <Skeleton height={26} width="55%" />
              <Skeleton height={26} width="70%" />
              <Skeleton height={26} width="40%" />
              <Skeleton height={46} width="100%" />
            </Stack>
          ) : (
            <>
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <EmailOutlinedIcon fontSize="small" />
                  <Typography variant="body1">
                    <strong>Email:</strong> {profile?.email}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <AdminPanelSettingsOutlinedIcon fontSize="small" />
                  <Typography variant="body1">
                    <strong>Role:</strong> {profile?.role}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <BadgeOutlinedIcon fontSize="small" />
                  <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                    <strong>User ID:</strong> {profile?.id || profile?._id || '—'}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  component={Link}
                  to="/admin/products"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.1,
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 2,
                    backgroundColor: '#37353E',
                    '&:hover': { backgroundColor: '#2c2b33' },
                  }}
                >
                  Go to Product Management
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={onLogout}
                  sx={{ py: 1.1, textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                  startIcon={<LogoutRoundedIcon />}
                >
                  Logout
                </Button>
              </Stack>
            </>
          )}
        </Paper>

        {/* Subtle helper */}
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Tip: If your session expires, you’ll be redirected to the admin login page.
        </Typography>
      </Container>
    </Box>
  );
}