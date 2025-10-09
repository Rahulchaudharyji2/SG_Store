import * as React from "react";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const JwelleryCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("jewelry");

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const giftCategories = [
    { value: "Pendants", label: "Pendants", image: "https://res.cloudinary.com/dgooittzu/image/upload/v1758196802/jewellery_pendants_jt3oux.jpg", path: "/pendants" },
    { value: "Earrings", label: "Earrings", image: "https://res.cloudinary.com/dgooittzu/image/upload/v1758254405/earrings_for_display_avwbfc.png", path: "/earings" },
    { value: "Necklace", label: "Necklace", image: "https://res.cloudinary.com/dgooittzu/image/upload/v1758194366/necklace_2_ygasdw.jpg", path: "/necklace" },
    { value: "Rings", label: "Rings", image: "https://res.cloudinary.com/dgooittzu/image/upload/v1758254390/ring_for_display_ibvwac.png", path: "/rings" },
    { value: "Bracelets", label: "Bracelets", image: "https://res.cloudinary.com/dgooittzu/image/upload/v1758196716/jewellery_bracelets_ms11ex.jpg", path: "/bracelets" },
    { value: "Sets", label: "Sets", image: "https://res.cloudinary.com/dgooittzu/image/upload/v1758196827/jewellery_sets_of_4_vuu5df.jpg", path: "/sets" },
    { value: "Bracelet Watch", label: "Bracelet Watch", image: "https://res.cloudinary.com/dgooittzu/image/upload/v1758271527/watch_girls_tbyfag.jpg", path: "/braceletwatch" },
  ];

  const theme = createTheme({
    palette: {
      primary: { main: "#8b0000" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full py-6 px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-red-900">
            Jewelry Categories
          </h1>
          <div className="w-20 h-1 bg-red-700 mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Elegant pieces for every occasion
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
          {giftCategories.map((category) => (
            <ToggleButton
              key={category.value}
              value={category.value}
              component={Link}
              to={category.path}
              className={`!p-0 !border-none !rounded-full flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-lg bg-white ${
                selectedCategory === category.value
                  ? "!ring-4 !ring-red-400 !bg-red-50"
                  : ""
              }`}
              sx={{
                width: { xs: "90px", sm: "100px", md: "120px" },
                height: { xs: "90px", sm: "100px", md: "120px" },
              }}
            >
              <img
                src={category.image}
                alt={category.label}
                className="rounded-full"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
              <span
                className="mt-2 font-semibold text-gray-800 text-center"
                style={{ fontSize: "12px" }}
              >
                {category.label}
              </span>
            </ToggleButton>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default JwelleryCategory;
