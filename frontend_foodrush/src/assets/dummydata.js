import { FaShippingFast, FaLeaf, FaHeart } from 'react-icons/fa';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { GiChefToque, GiFoodTruck } from 'react-icons/gi';
import IA1 from './IA1.png';
import IA2 from './IA2.png';
import IA3 from './IA3.png';
import IA4 from './IA4.png';
import IA5 from './IA5.png';
import IA6 from './IA6.png';

import Kebab from "./Kebab.jpg";
import Cheesepizza from "./Cheesepizza.jpg";
import Sushi from "./Sushi.jpg";
import Dumplings from "./dumplings.jpg";
import donut from "./donut.jpg";
import Scheesecake from "./stcheesecake.jpg";
import Ramen from "./ramen.jpg";
import Brownie from "./brownie.jpg";

import BannerImage from "./BannerImage.jpg";
import Image1 from "./Image1.jpg";
import Image2 from "./Image2.jpg";
import Image3 from "./Image3.jpg";
import Image4 from "./Image4.jpg";
import Video from "./Video.mp4";

// ABOUT PAGE
export const features = [
    {
        id: 1,
        title: "Instant Delivery",
        text: "30-minute delivery guarantee in metro areas",
        icon: FaShippingFast, // store the component reference
        img: IA1,
    },
    {
        id: 2,
        title: "Master Chefs",
        text: "Michelin-star trained culinary experts",
        icon: GiChefToque,
        img: IA2,
    },
    {
        id: 3,
        title: "Premium Quality",
        text: "Locally sourced organic ingredients",
        icon: FaLeaf,
        img: IA3,
    },
];

export const stats = [
    {
        number: '10M+',
        label: 'Deliveries',
        icon: GiFoodTruck,
        gradient: 'from-amber-500 via-orange-400 to-yellow-600',
    },
    {
        number: '98%',
        label: 'Satisfaction',
        icon: FaHeart,
        gradient: 'from-rose-500 via-amber-500 to-yellow-500',
    },
    {
        number: '500+',
        label: 'Cities',
        icon: FaLeaf,
        gradient: 'from-emerald-500 via-amber-500 to-yellow-600',
    },
    {
        number: '24/7',
        label: 'Support',
        icon: FaRegClock,
        gradient: 'from-amber-500 via-orange-400 to-rose-500',
    },
];

export const teamMembers = [
    {
        name: "Marco Yansen",
        role: "Executive Chef",
        img: IA4,
        bio: "3 Michelin stars | Italian cuisine specialist",
        delay: 0.1,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Amit Singh",
        role: "Pastry Chef",
        img: IA5,
        bio: "World Baking Champion | French desserts expert",
        delay: 0.3,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Akash Trivedi",
        role: "Sushi Chef",
        img: IA6,
        bio: "5th generation sushi chef | Traditional techniques",
        delay: 0.5,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
];

// ABOUT HOMEPAGE
export const aboutfeature = [
    { icon: FaBolt, title: "Instant Ordering", text: "Seamless digital experience", color: "from-[#CD7F32] to-[#FFD700]" },
    { icon: FaRegClock, title: "Always Open", text: "24/7 premium service", color: "from-[#800020] to-[#E2725B]" },
    { icon: FaCalendarCheck, title: "Exclusive Booking", text: "Priority reservations", color: "from-[#000080] to-cyan-600" },
    { icon: FaFire, title: "Signature Dishes", text: "Chef's special creations", color: "from-purple-600 to-[#E2725B]" }
];

// SPECIAL OFFER
export const commonTransition = "transition-all duration-300";
export const addButtonBase = "flex items-center gap-2 bg-gradient-to-r from-[#048b0b] to-[#04720b] text-white px-5 py-2.5 rounded-xl font-bold border-2 border-amber-400/30";
export const addButtonHover = "hover:gap-3 hover:shadow-lg hover:shadow-[#048b0b]/50 active:scale-95 relative overflow-hidden";

// SPECIAL MENU
export const cardData = [
    { id: 1, title: 'Kebab - 4 pieces', rating: 4.5, hearts: 105, description: 'Juicy grilled meat with authentic spices', image: Kebab, popular: true, price: 'Rs 850' },
    { id: 2, title: 'Cheese Pizza - Regular', rating: 5.0, hearts: 155, description: 'Hot, cheesy, and loaded with flavor the ultimate comfort pizza', image: Cheesepizza, bestseller: true, price: 'Rs 1000' },
    { id: 3, title: 'Dumplings - 6 pack', rating: 4.2, hearts: 85, description: 'Soft, juicy dumplings bursting with delicious fillings in every bite!', image: Dumplings, price: 'Rs 950' },
    { id: 4, title: 'Sushi - 6 pack', rating: 4.8, hearts: 285, description: 'Fresh, delicate sushi rolls crafted to perfection for every craving', image: Sushi, special: true, price: 'Rs 1500' },
];
export const additionalData = [
    { id: 5, title: 'Ramen - Spice Level 1', rating: 4.8, hearts: 210, description: 'Warm, comforting ramen with a soft boild egg and mild spice kick perfect for a cozy meal. ', image: Ramen, popular: true, price: 'Rs 700' },
    { id: 6, title: 'Strawberry Cheesecake', rating: 4.5, hearts: 165, description: 'Creamy strawberry cheesecake slice with a sweet, fruity finish in every bite.', image: Scheesecake,bestseller: true, price: 'Rs 800' },
    { id: 7, title: 'Brownie - 6 pack', rating: 4.7, hearts: 190, description: 'Rich, fudgy brownie with a perfect balance of gooey and chewy goodness', image: Brownie, price: 'Rs 650' },
    { id: 8, title: 'Donuts - 6 pack', rating: 4.9, hearts: 275, description: 'Fluffy, melt-in-your-mouth donuts in 6 delightful flavors, glazed to perfection', image: donut, special: true, price: 'Rs 600' },
];

// FOOTER 
export const socialIcons = [
    { icon: FaFacebook, link: 'https://www.facebook.com/share/1DjbwhdR4z/', color: '#3b5998', label: 'Facebook' },
    { icon: FaInstagram, link: 'https://www.instagram.com/hexagondigitalservices?igsh=MW1nanQ2eXIycnRkZQ==', color: '#E1306C', label: 'Instagram' },
    { icon: FaXTwitter, link: 'https://x.com/HexagonDService?t=Vv5ReZAIbXONqkq_O0ksWQ&s=09', color: '#000', label: 'X' },
    { icon: FaYoutube, link: 'https://youtube.com/@hexagondigitalservices?si=UnBt0AHI-ChN5Mze', color: '#FF0000', label: 'Youtube' },
];

// LOGIN 
export const inputBase = "w-full rounded-lg bg-[#024406] text-[#d6f6c4] placeholder-[#d6f6c4] focus:outline-none focus:ring-2 focus:ring-[#048b0b]";
export const iconClass = "absolute top-1/2 transform -translate-y-1/2 left-3 text-[#d6f6c4]";

// CONTACT
export const contactFormFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', Icon: FiUser },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 12345 67890', pattern: "[+]{0,1}[0-9]{10,13}", Icon: FiSmartphone },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your.email@example.com', Icon: FiMail },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your delivery address', Icon: FiHome },
    { label: 'Dish Name', name: 'dish', type: 'text', placeholder: 'Enter dish name (e.g., Butter Chicken)', Icon: FaUtensils },
];

// BANNER
export const bannerAssets = {
    bannerImage: BannerImage,
    orbitImages: [Image1, Image2, Image3, Image4],
    video: Video,
};