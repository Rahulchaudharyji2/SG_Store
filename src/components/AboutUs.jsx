import React from 'react';

// Define the custom colors for easy reference and use in the arbitrary Tailwind classes
const SG_GOLD = '#EBCB90';
const SG_DARK = '#333333';
const BG_LIGHT = '#f7f7f7';

// The main App component containing the About Us content
const App = () => {
    // Style for the actual image background URL provided by the user
    const imageStyle = {
        backgroundImage: `url('https://res.cloudinary.com/dgooittzu/image/upload/v1759307059/about_us_pic_j0duyf.jpg')`,
    };

    return (
        <div 
            // Ensures padding increases with screen size: p-4 -> sm:p-8 -> lg:p-12
            className="min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-12"
            style={{ backgroundColor: BG_LIGHT, fontFamily: 'Inter, sans-serif' }}
        >
            
            {/* About Us Card/Section */}
            <section className="bg-white shadow-2xl rounded-xl max-w-6xl w-full overflow-hidden">
                <div className="lg:flex">
                    
                    {/* Left Side: Image Section */}
                    {/* ADDED: Border radius classes to ensure the image matches the card's rounding responsively */}
                    <div className="lg:w-1/2 rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl overflow-hidden">
                        {/* Image Container */}
                        <div 
                            className="h-64 sm:h-96 lg: bg-cover bg-center flex items-center justify-center p-6 m-3 rounded-xl" 
                            style={imageStyle}
                        >
                            {/* Overlay or subtle branding could be added here */}
                        </div>
                    </div>

                    {/* Right Side: Content Section */}
                    {/* Padding is responsive: p-6 (mobile), sm:p-10 (tablet), md:p-12 (desktop) */}
                    <div className="lg:w-1/2 p-6 sm:p-10 md:p-12">
                        
                        <header className="mb-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: SG_DARK }}>About Us</h1>
                            {/* Theme color accent line */}
                            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: SG_GOLD }}></div>
                        </header>
                        
                        {/* Content Block 1 */}
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Welcome to <strong className="font-bold" style={{ color: SG_GOLD }}>SG Gifts</strong> — where every gift is more than just an item; it’s a piece of the heart. I’m Sambhav Goyal, and with every product here, I put in not just my hands but my soul. Life is made up of moments — the laughter, the tears, the surprises, the ordinary turned extraordinary — and I believe these moments deserve to be honored with something beautiful.
                        </p>

                        {/* Content Block 2 */}
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Whether it’s shimmering jewellery that captures your love, a soft toy that feels like a warm embrace,  each gift in our collection is picked with tenderness and passion.
                        </p>

                        {/* Content Block 3: The Mission Statement */}
                        <div 
                            className="p-4 rounded-lg border-l-4 mb-6"
                            style={{ backgroundColor: `${SG_GOLD}1A`, borderColor: SG_GOLD }}
                        >
                            <p className="text-xl font-semibold italic" style={{ color: SG_DARK }}>
                                At SG Gifts, it’s not just about giving — it’s about touching lives, kindling joy, wrapping up little fragments of love, and making someone’s heart beat a little lighter.
                            </p>
                        </div>

                        {/* Content Block 4: CTA and Socials */}
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We understand that sometimes it’s the quiet, thoughtful gestures that echo the loudest. Let us help you show what words often fall short of — because you deserve to make someone feel <strong className="font-extrabold" style={{ color: SG_DARK }}>unforgettable</strong>.
                        </p>

                        {/* Socials CTA Section */}
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <h3 className="text-xl font-bold mb-3" style={{ color: SG_GOLD }}>Join Our Journey</h3>
                            <p className="text-base text-gray-600">
                                You can also follow our journey and gift inspirations on <strong className="font-semibold" style={{ color: SG_DARK }}>YouTube</strong> — Sambhav Goyal — and join our community on <strong className="font-semibold" style={{ color: SG_DARK }}>Instagram</strong> at @sg_gifthub.
                            </p>
                            <p className="mt-3 text-lg font-extrabold" style={{ color: SG_DARK }}>
                                One gift. One smile. One memory.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default App;
