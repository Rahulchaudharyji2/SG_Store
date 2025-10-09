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
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem as SelectItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CardContext";

// Styled search components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
          <TextField
            fullWidth
            label="Pincode / Location"
            variant="outlined"
            sx={{ width: "60%", borderRadius: "8px" }}
          />
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
  const { cart } = useCart();
  const cartNo = cart.length;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      
      <MenuItem component={Link} to="/cart">
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
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    
    <Box sx={{ flexGrow: 1 ,marginBottom:"85px"}} >
      <AppBar position="fixed" sx={{ backgroundColor: "#EBCB90" }}>
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          {/* Logo (Always visible) */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component={Link} to="/" sx={{ display: "block" }}>
              <img
                src="logo.jpg"
                alt="Logo"
                style={{
                  height: window.innerWidth < 600 ? "40px" : "50px",
                  borderRadius: "12px",
                }}
              />
            </Typography>
          </Box>

          {/* Search */}
          <Search sx={{ borderRadius: "20px", width: { xs: "60%", md: "40vw" }, border: "solid black", mx: 2 }}>
            <SearchIconWrapper><SearchIcon sx={{ color: "#37353E" }} /></SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop icons */}
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
            
            <IconButton size="large" color="inherit" component={Link} to="/cart" sx={{ ml: 2 }}>
              <Badge badgeContent={cartNo} color="error"><ShoppingCartOutlinedIcon /></Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" onClick={handleProfileMenuOpen} sx={{ ml: 2 }}>
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen}>
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
