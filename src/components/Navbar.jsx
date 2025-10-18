import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CardContext";
import { useSelector } from "react-redux";
import DeliveryModal from "./DeliveryModal";

// Styled Search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

// Glass AppBar style
const GlassAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha("#EBCB90", 0.8), // semi-transparent original color
  backdropFilter: "blur(10px)",           // glassy blur
  boxShadow: "none",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
}));


export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartNo = cart.length;

  const { isAuthenticated, user } = useSelector((s) => s.auth || {});
  const isAdmin = Boolean(isAuthenticated && user?.role === "admin");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Search
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [openResults, setOpenResults] = React.useState(false);
  const searchBoxRef = React.useRef(null);
  const debounceRef = React.useRef(null);

  const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

  React.useEffect(() => {
    const onDocClick = (e) => {
      if (!searchBoxRef.current) return;
      if (!searchBoxRef.current.contains(e.target)) setOpenResults(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q || q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const url = `${API_BASE}/products?q=${encodeURIComponent(q.trim())}&limit=10`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Search failed: ${res.status}`);
        const data = await res.json();
        setResults(Array.isArray(data?.products) ? data.products : []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [q]);

  const handleResultClick = (id) => {
    setOpenResults(false);
    setQ("");
    setResults([]);
    navigate(`/productDetails/${id}`);
  };

  // Desktop menu
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAdmin ? (
        <>
          <MenuItem component={Link} to="/admin/profile" onClick={handleMenuClose}>
            Admin Profile
          </MenuItem>
          <MenuItem component={Link} to="/admin/products" onClick={handleMenuClose}>
            Add Product
          </MenuItem>
        </>
      ) : (
        <MenuItem component={Link} to="/admin/login" onClick={handleMenuClose}>
          Admin Login
        </MenuItem>
      )}
    </Menu>
  );

  // Mobile menu
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleOpenModal}>
        <Button variant="contained" fullWidth sx={{ borderRadius: 2 }}>
          Where to deliver?
        </Button>
      </MenuItem>

      {isAdmin && (
        <MenuItem component={Link} to="/admin/products" onClick={handleMobileMenuClose}>
          <Button variant="outlined" fullWidth sx={{ borderRadius: 2 }}>
            Add Product
          </Button>
        </MenuItem>
      )}

      <MenuItem component={Link} to="/cart" onClick={handleMobileMenuClose}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={cartNo} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>{isAdmin ? "Admin" : "Profile"}</p>
      </MenuItem>

      {!isAdmin && (
        <MenuItem component={Link} to="/admin/login" onClick={handleMobileMenuClose}>
          <Typography>Admin Login</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: "85px" }}>
        <GlassAppBar position="fixed">
          <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography component={Link} to="/" sx={{ display: "block" }}>
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  style={{ height: window.innerWidth < 600 ? "40px" : "50px", borderRadius: "12px" }}
                />
              </Typography>
            </Box>

            {/* Search */}
            <Box ref={searchBoxRef} sx={{ position: "relative", flex: 1, maxWidth: { xs: "60%", md: "40vw" }, mx: 2 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#37353E" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    if (!openResults) setOpenResults(true);
                  }}
                  onFocus={() => q.trim().length >= 2 && setOpenResults(true)}
                />
              </Search>

              {/* Search results */}
              {openResults && (
                <Paper
                  elevation={6}
                  sx={{
                    position: "absolute",
                    top: "54px",
                    left: 0,
                    right: 0,
                    zIndex: 1300,
                    maxHeight: 360,
                    overflowY: "auto",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                    <SearchIcon fontSize="small" />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Results for “{q}”
                    </Typography>
                    {loading && <CircularProgress size={16} sx={{ ml: "auto" }} />}
                  </Box>
                  <Divider />
                  <Box>
                    {!loading &&
                      (results.length === 0 ? (
                        <Typography sx={{ p: 2, color: "text.secondary" }}>No results found</Typography>
                      ) : (
                        results.map((p) => (
                          <Box
                            key={p._id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              p: 1.25,
                              cursor: "pointer",
                              "&:hover": { backgroundColor: alpha("#000", 0.04) },
                            }}
                            onClick={() => handleResultClick(p._id)}
                          >
                            <img
                              src={p.images?.[0] || ""}
                              alt=""
                              style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6, background: "#f5f5f5" }}
                            />
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="body2" noWrap>
                                {p.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }} noWrap>
                                {p.category} • ₹{p.price}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      ))}
                  </Box>
                </Paper>
              )}
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop buttons */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{ borderRadius: "20px", backgroundColor: "#EBCB90", color: "#37353E", mr: 1 }}
                onClick={handleOpenModal}
              >
                Where to deliver?
              </Button>

              {isAdmin && (
                <Button
                  component={Link}
                  to="/admin/products"
                  variant="outlined"
                  sx={{ borderRadius: "20px", color: "#37353E", borderColor: "#37353E", ml: 1 }}
                >
                  Add Product
                </Button>
              )}

              <IconButton size="large" color="inherit" component={Link} to="/cart" sx={{ ml: 2 }}>
                <Badge badgeContent={cartNo} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>

              <IconButton size="large" edge="end" color="inherit" onClick={handleProfileMenuOpen} sx={{ ml: 2 }}>
                <AccountCircle />
              </IconButton>
            </Box>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </GlassAppBar>

        {renderMobileMenu}
        {renderMenu}
        <DeliveryModal open={openModal} handleClose={handleCloseModal} />
      </Box>
    </>
  );
}
