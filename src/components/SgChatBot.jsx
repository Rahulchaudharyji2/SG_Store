import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send, Gift, Mail, MessageCircle } from 'lucide-react';

// --- Custom Colors and Configuration ---
const GOLD_PRIMARY = '#EBCB90'; // Light, elegant gold/beige
const GOLD_HOVER = '#D8B47E';   // Slightly darker shade for hover effect
const LIGHT_BG = '#FAFAFA';     // Off-white for subtle contrast
const DARK_TEXT = '#1E293B';   // Dark color for professional contrast

// Product responses and Help Topic responses
const SG_GIFTS_PRODUCTS = {
    'about': "Welcome to **SG Gifts** — where every gift is a piece of the heart. Our founder, **Sambhav Goyal**, curates each item with passion. We aim to honor life's moments with beautiful gifts. Follow our journey: **YouTube: Sambhav Goyal**, **Instagram: @sg_gifthub**.",
    'products': "At **SG Gifts**, we offer **Jewellery and Soft Toys** — perfect for every occasion.",
    'terms': "By using our site, you accept our T&Cs. We offer a **3-day replacement** for manufacturing defects. For damage: **SG Team fault = Free replacement**. **Customer fault = No replacement**. See full policy details on our website.",
    'privacy': "We collect contact info (name, address, email) for orders and support. Interactions via our **24/7 chatbot** or **WhatsApp** may collect conversation history to ensure the best service, handled in accordance with our Privacy Policy.",
    'jewelry': "Our **Jewelry** collection features elegant necklaces, bracelets, and rings, perfect for any special occasion. Explore our **premium gold** and **diamond** pieces.",
    'soft toys': "The **Soft Toys** range includes high-quality, hypoallergenic plush animals and custom gift bundles, ideal for cherished moments and gifts for children.",
    //'photo frames': "Our **Photo Frames** allow you to beautifully display memories, offering both classic wooden elegance and modern personalized gold-accented designs.",
    //'flowers': "We offer a selection of fresh, luxurious floral arrangements and preserved **Eternal Roses** for lasting beauty. Please specify the delivery date!",
    // --- UPDATED SHIPPING TEXT ---
    'shipping': "Delivery typically takes **1-2 days**. If your location is within **10 km**, we’ll deliver within the **same day**! If there’s ever a delay, contact us on **WhatsApp Business for instant help**.",
    // ----------------------------
    'tracking': "You can track your order directly through our **WhatsApp Business chat** by visiting the option on our website.",
    'damage': "If your order is **damaged**, send us a **photo on WhatsApp or email within 24 hours**, and we’ll replace it quickly (provided it wasn't customer-induced damage).",
    'confirmation': "Once you place an order, you’ll receive a **confirmation on WhatsApp Business and email** with all your order details.",
    'address': "Please contact us immediately through **WhatsApp**. If your order hasn’t been dispatched yet, we’ll update the address.",
    'gifting': "Yes, we offer complimentary luxury **gift wrapping** on all orders! You can also include a **personalized message** card at no extra cost during checkout.",
    'returns': "For returns/exchanges, note we offer a **3-day replacement** for manufacturing defects. Contact support immediately if you face quality issues.",
    'contact': "No worries. You can contact us anytime via our **WhatsApp Business** number (9870451616) or by **email** (sggiftslove@gmail.com).",
    'default': "Thank you for your query. I don't have enough specific information yet. Please select an option below, or use the dedicated **WhatsApp** or **Email** options at the bottom for personal service.",
};

// Quick Links
const QUICK_LINKS = [
    { text: "What Gifts Do We Sell?", action: "products" },
    { text: "About SG Gifts / Founder", action: "about" },
    { text: "Terms & Conditions (3-Day Return)", action: "terms" },
    { text: "Privacy Policy / Data Use", action: "privacy" },
    { text: "Shipping & Same-Day Delivery", action: "shipping" }, 
    { text: "Order Tracking", action: "tracking" },             
    { text: "Damaged Order / Replacement", action: "damage" },   
    { text: "Change Address", action: "address" },
    { text: "Gifting Services", action: "gifting" },
];

// --- Sub-Components ---
const ChatMessage = ({ message, isNew }) => {
    const formatText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };
    const isUser = message.sender === 'user';
    const userMessageStyle = {
        backgroundColor: GOLD_PRIMARY,
        color: DARK_TEXT, 
        boxShadow: `0 2px 4px rgba(235, 203, 144, 0.5)`,
    };
    const botMessageStyle = {
        backgroundColor: 'white',
        color: DARK_TEXT,
        boxShadow: `0 2px 4px rgba(0, 0, 0, 0.08)`,
    };
    return (
        <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'} ${isNew ? 'animate-fade-in-up' : ''}`}>
            <div 
                className={`p-3 rounded-xl text-base font-medium max-w-[85%]`}
                style={isUser ? userMessageStyle : botMessageStyle}
                dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
            />
        </div>
    );
};

const QuickLinks = ({ handleQuickLinkClick }) => {
    const buttonStyle = {
        backgroundColor: GOLD_PRIMARY,
        color: DARK_TEXT, 
        transition: 'background-color 0.15s',
    };
    return (
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {QUICK_LINKS.map((link, index) => (
                <button
                    key={index}
                    className="px-4 py-2 text-sm rounded-full shadow-md hover:shadow-lg"
                    style={buttonStyle}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = GOLD_HOVER}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = GOLD_PRIMARY}
                    onClick={() => handleQuickLinkClick(link.action)}
                >
                    {link.text}
                </button>
            ))}
        </div>
    );
};

const TypingIndicator = () => (
    <div className="flex justify-start mb-4 animate-fade-in-up">
        <div className="p-3 rounded-xl text-base font-medium max-w-[85%] bg-white shadow-md flex items-center space-x-1" style={{color: DARK_TEXT}}>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>
    </div>
);


// --- Main App Component ---

const SgChatBot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null); 

    // Style constants
    const headerStyle = {
        backgroundColor: GOLD_PRIMARY,
        borderBottom: `2px solid ${GOLD_HOVER}`,
        color: DARK_TEXT, 
    };
    const chatButtonStyle = {
        backgroundColor: GOLD_PRIMARY,
        color: DARK_TEXT,
        boxShadow: `0 6px 20px rgba(235, 203, 144, 0.4)`,
        borderRadius: '50%',
        transition: 'background-color 0.15s',
        
    };
    const sendButtonStyle = {
        backgroundColor: GOLD_PRIMARY,
        color: DARK_TEXT, 
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        setTimeout(scrollToBottom, 100);
    }, [messages, isTyping]);

    useEffect(() => {
        if (isChatOpen && messages.length === 0) {
            setMessages([
                { sender: 'bot', text: "Welcome to **SG Gifts**! I'm your Personal Assistant. I can help with our products, **Shipping**, **Policies**, and **Tracking**." }
            ]);
        }
        if (!isChatOpen) {
            setMessages([]);
        }
    }, [isChatOpen]);

    const getBotResponse = useCallback((input) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('about') || lowerInput.includes('sambhav goyal') || lowerInput.includes('founder') || lowerInput.includes('story')) return SG_GIFTS_PRODUCTS['about'];
        if (lowerInput.includes('terms') || lowerInput.includes('policy') || lowerInput.includes('t&c') || lowerInput.includes('rules')) return SG_GIFTS_PRODUCTS['terms'];
        if (lowerInput.includes('privacy') || lowerInput.includes('data') || lowerInput.includes('collect info')) return SG_GIFTS_PRODUCTS['privacy'];
        if (lowerInput.includes('what gifts') || lowerInput.includes('what do you sell') || lowerInput.includes('categories') || lowerInput.includes('product')) return SG_GIFTS_PRODUCTS['products'];
        if (lowerInput.includes('address') || lowerInput.includes('change location') || lowerInput.includes('update address')) return SG_GIFTS_PRODUCTS['address'];
        if (lowerInput.includes('track') || lowerInput.includes('where is my order') || lowerInput.includes('check status')) return SG_GIFTS_PRODUCTS['tracking'];
        if (lowerInput.includes('ship') || lowerInput.includes('delivery') || lowerInput.includes('how long') || lowerInput.includes('same day') || lowerInput.includes('2 day')) return SG_GIFTS_PRODUCTS['shipping'];
        if (lowerInput.includes('confirm') || lowerInput.includes('order details') || lowerInput.includes('i placed an order')) return SG_GIFTS_PRODUCTS['confirmation'];
        if (lowerInput.includes('damage') || lowerInput.includes('broken') || lowerInput.includes('replace') || lowerInput.includes('faulty') || lowerInput.includes('24 hours')) return SG_GIFTS_PRODUCTS['damage'];
        if (lowerInput.includes('return') || lowerInput.includes('exchange') || lowerInput.includes('refund') || lowerInput.includes('3 day')) return SG_GIFTS_PRODUCTS['returns'];
        if (lowerInput.includes('jewel') || lowerInput.includes('ring') || lowerInput.includes('necklace')) return SG_GIFTS_PRODUCTS['jewelry'];
        if (lowerInput.includes('soft toy') || lowerInput.includes('teddy') || lowerInput.includes('plush')) return SG_GIFTS_PRODUCTS['soft toys'];
        //if (lowerInput.includes('photo') || lowerInput.includes('frame') || lowerInput.includes('memory')) return SG_GIFTS_PRODUCTS['photo frames'];
        //if (lowerInput.includes('flower') || lowerInput.includes('bouquet') || lowerInput.includes('rose')) return SG_GIFTS_PRODUCTS['flowers'];
        if (lowerInput.includes('wrap') || lowerInput.includes('personalize') || lowerInput.includes('message') || lowerInput.includes('gift service')) return SG_GIFTS_PRODUCTS['gifting'];
        if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('whatsapp') || lowerInput.includes('mail')) return SG_GIFTS_PRODUCTS['contact'];
        if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) return "Hello! Welcome to **SG Gifts**. I can assist with product details, shipping, tracking, and policies. How may I assist your search today?";
        return SG_GIFTS_PRODUCTS['default'];
    }, []);

    const handleQuickLinkClick = (action) => {
        const userActionText = QUICK_LINKS.find(link => link.action === action)?.text || `I'm interested in ${action.replace(action.charAt(0), action.charAt(0).toUpperCase())}.`;
        setMessages(prev => [...prev, { sender: 'user', text: userActionText }]);
        setIsTyping(true);
        
        setTimeout(() => {
            const responseText = SG_GIFTS_PRODUCTS[action];
            setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleSendMessage = () => {
        const message = inputMessage.trim();
        if (!message) return;
        
        setMessages(prev => [...prev, { sender: 'user', text: message }]);
        setInputMessage('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponseText = getBotResponse(message);
            setMessages(prev => [...prev, { sender: 'bot', text: botResponseText }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="font-sans">
            <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s ease-out;
                }
            `}</style>

            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                style={chatButtonStyle}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center focus:outline-none transition hover:scale-105 z-50"
                
            >
                {isChatOpen ? <X size={32} color={DARK_TEXT} /> : <MessageSquare size={32} color={DARK_TEXT} />}
            </button>

            <div
                className={`fixed bottom-24 right-6 w-[90vw] max-w-sm h-[75vh] max-h-[550px] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col z-40 transition-all duration-300 transform ${
                    isChatOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
                }`}
                style={{ border: `1px solid rgba(235, 203, 144, 0.3)` }}
            >
                <div className="p-4 flex justify-between items-center rounded-t-xl" style={headerStyle}>
                    <div className="flex items-center">
                        <span className="mr-3 p-2 bg-black/10 rounded-full">
                            <Gift size={20} color={DARK_TEXT} /> 
                        </span>
                        <div>
                            <h3 className="font-bold text-lg">SG Gifts Chatbot</h3>
                            <p className="text-xs opacity-90">Jawab yahan milega! (Answers here!)</p>
                        </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="p-1 rounded-full hover:bg-black/10">
                        <X size={20} color={DARK_TEXT} />
                    </button>
                </div>

                <div
                    className="flex-grow overflow-y-auto px-4"
                    style={{ 
                        backgroundColor: LIGHT_BG, 
                        paddingTop: '1rem', 
                        paddingBottom: '1rem' 
                    }} 
                >
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} isNew={index === messages.length - 1}/>
                    ))}
                    {isTyping && <TypingIndicator />}
                    {isChatOpen && messages.length === 1 && (
                        <QuickLinks handleQuickLinkClick={handleQuickLinkClick} />
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex">
                        <input
                            type="text"
                            id="user-input"
                            placeholder="Aapka sawaal yahan likhein..."
                            className="flex-grow p-3 border border-gray-300 rounded-l-lg text-base focus:outline-none focus:ring-1"
                            style={{ borderColor: inputMessage ? GOLD_PRIMARY : 'gray-300' }}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            id="send-button"
                            className="px-4 font-semibold rounded-r-lg disabled:opacity-50 transition"
                            style={sendButtonStyle}
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim()}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
                
                <div className="p-3 bg-white border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2 text-center">Personal help ke liye contact karein:</p>
                    <div className="flex space-x-2">
                        <a href="https://wa.me/919870451616?text=Hello%2C%20I%20have%20a%20question%20about%20your%20gifts%20from%20SG%20Gifts%20website." target="_blank" className="w-1/2 flex items-center justify-center px-3 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition shadow-md">
                            <MessageCircle size={16} className="mr-1" /> WhatsApp
                        </a>
                        <a href="mailto:sggiftslove@gmail.com?subject=Inquiry%20from%20SG%20Gifts%20Website" target="_blank" className="w-1/2 flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition shadow-md">
                            <Mail size={16} className="mr-1" /> Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SgChatBot;

