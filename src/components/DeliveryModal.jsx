// src/components/DeliveryModal.jsx
import React, { useState } from "react";
import { Modal, Box, Typography, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Truck, CheckCircle, XCircle, MapPin } from "lucide-react";

// Theme colors
const GOLD_PRIMARY = "#EBCB90";
const GOLD_HOVER = "#D8B47E";
const DARK_TEXT = "#1E293B";
const LIGHT_BG = "#FAFAFA";

const DELIVERY_REGIONS = [
  { label: "Select Region", value: "" },
  { label: "Delhi (NCT)", value: "DELHI" },
  { label: "Delhi NCR (Gurgaon, Noida, etc.)", value: "NCR" },
  { label: "Other State/Region", value: "OTHER" },
];

const DeliveryModal = ({ open, handleClose }) => {
  const [region, setRegion] = useState("");
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState(null); // 'AVAILABLE' | 'NOT_AVAILABLE'
  const [message, setMessage] = useState("");

  const checkDelivery = () => {
    setStatus(null);
    setMessage("");

    if (!region) return setMessage("Please select a region.");
    if (!pincode || pincode.length !== 6 || isNaN(pincode))
      return setMessage("Please enter a valid 6-digit pincode.");

    const prefix = pincode.slice(0, 3);
    const delhiPrefixes = ["110"];
    const ncrPrefixes = ["121", "122", "201"];

    if (region === "DELHI" && delhiPrefixes.includes(prefix)) {
      setStatus("AVAILABLE");
      setMessage(`Great! We deliver to ${pincode} in Delhi.`);
    } else if (region === "NCR" && (delhiPrefixes.includes(prefix) || ncrPrefixes.includes(prefix))) {
      setStatus("AVAILABLE");
      setMessage(`Great! We deliver to ${pincode} in Delhi NCR.`);
    } else if (region === "OTHER") {
      setStatus("NOT_AVAILABLE");
      setMessage("Delivery is currently limited to Delhi/NCR only.");
    } else {
      setStatus("NOT_AVAILABLE");
      setMessage(`Sorry! Delivery unavailable for ${pincode} in selected region.`);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: LIGHT_BG,
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          border: `2px solid ${GOLD_PRIMARY}`,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <MapPin size={28} style={{ color: DARK_TEXT, marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: DARK_TEXT }}>
            Check Delivery
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="region-label">Region</InputLabel>
          <Select
            labelId="region-label"
            value={region}
            label="Region"
            onChange={(e) => setRegion(e.target.value)}
            sx={{ backgroundColor: LIGHT_BG, borderRadius: 1 }}
          >
            {DELIVERY_REGIONS.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="tel"
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.slice(0, 6))}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: `1px solid ${GOLD_PRIMARY}`,
            backgroundColor: LIGHT_BG,
            color: DARK_TEXT,
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={checkDelivery}
          sx={{
            backgroundColor: GOLD_PRIMARY,
            color: DARK_TEXT,
            mb: 2,
            ":hover": { backgroundColor: GOLD_HOVER },
          }}
          startIcon={<Truck />}
        >
          Check Delivery
        </Button>

        {status && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              border: `1px solid ${status === "AVAILABLE" ? "#A7F3D0" : "#FCA5A5"}`,
              backgroundColor: status === "AVAILABLE" ? "#ECFDF5" : "#FEF2F2",
              color: status === "AVAILABLE" ? "#065F46" : "#B91C1C",
              fontSize: 14,
            }}
          >
            {status === "AVAILABLE" ? <CheckCircle size={20} style={{ marginRight: 8 }} /> : <XCircle size={20} style={{ marginRight: 8 }} />}
            <span>{message}</span>
          </Box>
        )}

        {!status && message && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid #FACC15`,
              backgroundColor: "#FEF9C3",
              color: "#B45309",
              mt: 2,
              fontSize: 14,
            }}
          >
            {message}
          </Box>
        )}

        <Button
          variant="outlined"
          fullWidth
          onClick={handleClose}
          sx={{ mt: 3, borderColor: GOLD_PRIMARY, color: DARK_TEXT }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DeliveryModal;
