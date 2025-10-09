import * as React from 'react';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) setSelectedCategory(newCategory);
  };

  const giftCategories = [
    { value: 'flowers', label: 'Flowers', image: 'https://res.cloudinary.com/dgooittzu/image/upload/v1758901466/flower_icon_1_u0g53h.jpg', path: "/flowers" },
    { value: 'jewelry', label: 'Jewelry', image: 'https://as2.ftcdn.net/jpg/03/14/33/33/1000_F_314333343_EKz9XQO4znMmMVaRBu9FX31MqXPvmIxr.jpg', path: "/accessories" },
    { value: 'softtoys', label: 'Soft Toys', image: 'https://res.cloudinary.com/dgooittzu/image/upload/v1758901545/soft_toy_icon_h1mzrz.webp', path: "/softtoys" },
    { value: 'photoframe', label: 'Photo Frame', image: 'https://res.cloudinary.com/dgooittzu/image/upload/v1758901500/photo_frame_icon_po5ix8.jpg', path: "/photoframe" },
  ];

  const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full py-4 px-2 md:px-0 " >
        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-3xl font-semibold tracking-wide text-[#8B5E3C]">
            Explore Gift Categories
          </h1>
          <div className="w-16 md:w-28 h-1 bg-gradient-to-r from-[#EBCB90] via-[#D4A373] to-[#F5DEB3] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Toggle Buttons */}
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="gift category selection"
          className="flex justify-between gap-2"
          sx={{
            flexWrap: { xs: 'nowrap', sm: 'wrap' },
            overflow: 'hidden',
          }}
        >
          {giftCategories.map((category) => (
            <ToggleButton
              key={category.value}
              value={category.value}
              aria-label={category.label}
              component={Link}
              to={category.path}
              sx={{
                border: "1px solid transparent",
                borderRadius: "12px",
                width: { xs: "70px", sm: "90px", md: "120px" },
                height: { xs: "90px", sm: "120px", md: "160px" },
                transition: "all 0.3s ease",
                background: "#FAF9F6",
                color: "#8B5E3C",
                fontWeight: 500,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  transform: "translateY(-2px) scale(1.03)",
                  border: "1px solid #D4A373",
                  background: "#FFF8F0",
                },
                "&.Mui-selected": {
                  border: "1px solid #8B5E3C",
                  background: "#F5DEB3",
                },
              }}
            >
              <img
                src={category.image}
                alt={category.label}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 object-contain rounded-md"
              />
              <span className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-center">
                {category.label}
              </span>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </ThemeProvider>
  );
};

export default App;
