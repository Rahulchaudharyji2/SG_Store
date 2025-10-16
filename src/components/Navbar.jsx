

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem as SelectItem, CircularProgress, Paper, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CardContext";
import { useSelector } from "react-redux";

// Resolve API base: prefer VITE_API_URL, else use /api (with Vite proxy)
const API_BASE = (import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).replace(/\/+$/, "")) || "/api";

// Styled search components
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

// Delivery Modal
const DeliveryModal = ({ open, handleClose }) => {
  const [country, setCountry] = React.useState("India");
  const handleCountryChange = (event) => setCountry(event.target.value);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 },
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ textAlign: "center" }}>
          <img
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1757567212/WhatsApp_Image_2025-09-10_at_2.11.31_PM-removebg-preview_esfx3s.png"
            alt="Map icon"
            style={{ width: "100px", height: "100px", margin: "0 auto" }}
          />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Where to deliver?
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            Enter location for personalized delivery choices
          </Typography>
        </Box>
        <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
          <Select
            value={country}
            onChange={handleCountryChange}
            sx={{ width: "40%", borderRadius: "8px", border: "1px solid #ccc" }}
          >
            <SelectItem value="India">
              <img src="https://flagcdn.com/in.svg" alt="Indian flag" style={{ width: "24px", marginRight: "8px" }} />
              India
            </SelectItem>
          </Select>
          <TextField fullWidth label="Pincode / Location" variant="outlined" sx={{ width: "60%", borderRadius: "8px" }} />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            borderRadius: "16px",
            backgroundColor: "#FF5252",
            "&:hover": { backgroundColor: "#E53935" },
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          APPLY
        </Button>
      </Box>
    </Modal>
  );
};

// Main Navbar
export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartNo = cart.length;

  // Auth state
  const { isAuthenticated, user } = useSelector((s) => s.auth || {});
  const isAdmin = Boolean(isAuthenticated && user?.role === "admin");

  // Menus and modal
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

  // Search states
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [openResults, setOpenResults] = React.useState(false);
  const searchBoxRef = React.useRef(null);
  const debounceRef = React.useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQ(value);
    if (!openResults) setOpenResults(true);
  };

  const handleResultClick = (id) => {
    setOpenResults(false);
    setQ("");
    setResults([]);
    navigate(`/productDetails/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault?.();
    // If there are results, navigate to the first one; otherwise, just keep dropdown
    if (results && results.length > 0) {
      handleResultClick(results[0]._id);
    }
  };

  // Click outside to close results
  React.useEffect(() => {
    const onDocClick = (e) => {
      if (!searchBoxRef.current) return;
      if (!searchBoxRef.current.contains(e.target)) {
        setOpenResults(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Debounced search
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
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [q]);

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
          <MenuItem component={Link} to="/admin/profile" onClick={handleMenuClose}>Admin Profile</MenuItem>
          <MenuItem component={Link} to="/admin/products" onClick={handleMenuClose}>Add Product</MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={Link} to="/admin/login" onClick={handleMenuClose}> Admin Login</MenuItem>
        </>
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
        <Button variant="contained" sx={{ borderRadius: 2, width: "100%" }}>
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
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "85px" }}>
        <AppBar position="fixed" sx={{ backgroundColor: "#EBCB90" }}>
          <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography component={Link} to="/" sx={{ display: "block" }}>
                <img
                  src="./logo.jpg"
                  alt="Logo"
                  style={{
                    height: typeof window !== "undefined" && window.innerWidth < 600 ? "40px" : "50px",
                    borderRadius: "12px",
                  }}
                />
              </Typography>
            </Box>

            {/* Search (with results dropdown) */}
            <Box ref={searchBoxRef} sx={{ position: "relative", flex: 1, maxWidth: { xs: "60%", md: "40vw" }, mx: 2 }}>
              <form onSubmit={handleSearchSubmit}>
                <Search sx={{ borderRadius: "20px", width: "100%", border: "solid black" }}>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "#37353E" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={q}
                    onChange={handleSearchChange}
                    onFocus={() => q.trim().length >= 2 && setOpenResults(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setOpenResults(false);
                    }}
                  />
                </Search>
              </form>

              {/* Results dropdown */}
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
                    {!loading && results.length === 0 && q.trim().length >= 2 ? (
                      <Typography variant="body2" sx={{ p: 2, color: "text.secondary" }}>
                        No results found
                      </Typography>
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
                            src={Array.isArray(p.images) && p.images[0] ? p.images[0] : ""}
                            alt=""
                            style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6, background: "#f5f5f5" }}
                          />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="body2" noWrap title={p.title}>
                              {p.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary" }} noWrap title={p.category}>
                              {p.category} • ₹{p.price}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Box>
                </Paper>
              )}
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop actions */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#EBCB90",
                  color: "#37353E",
                  marginRight: 1,
                  padding: "8px 16px",
                  fontWeight: "bold",
                  boxShadow: "none",
                  border: "1px solid #37353E",
                  "&:hover": { border: "1px solid #37353E", boxShadow: "none" },
                }}
                onClick={handleOpenModal}
              >
                <img src="https://flagcdn.com/in.svg" alt="Indian flag" style={{ width: "24px", marginRight: "8px" }} />
                <span style={{ backgroundColor: "#fff", padding: "4px 8px", borderRadius: "10px" }}>
                  Where to deliver?
                </span>
              </Button>

              {/* Admin-only: Add Product */}
              {isAdmin && (
                <Button
                  component={Link}
                  to="/admin/products"
                  variant="outlined"
                  sx={{
                    borderRadius: "20px",
                    color: "#37353E",
                    borderColor: "#37353E",
                    ml: 1,
                    fontWeight: "bold",
                    "&:hover": { borderColor: "#37353E" },
                  }}
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
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Menus and Modal */}
        {renderMobileMenu}
        {renderMenu}
        <DeliveryModal open={openModal} handleClose={handleCloseModal} />
      </Box>
    </>
  );
}