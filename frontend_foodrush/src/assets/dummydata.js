import { FaShippingFast, FaLeaf, FaHeart } from 'react-icons/fa';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { GiFarmer, GiFoodTruck } from 'react-icons/gi';
import IA1 from './IA1.jpg';
import IA2 from './IA2.jpg';
import IA3 from './IA3.png';
import IA4 from './IA4.jpg';
import IA5 from './IA5.jpg';
import IA6 from './IA6.jpg';

import FlashDeals from "./FlashDeals.jpg";
import MerryMixFruitBasket from "./MerryMixFruitBasket.jpg";
import VegeCombo from "./VegeCombo.jpg";
import FamilyVeggieBasket from "./FamilyVeggieBasket.jpg";
import JuicyOffer  from "./JuicyOffer.png";
import VeryBerry from "./VeryBerry.png";
import TomatoesOnions from "./TomatoesOnons.jpg";
import PremiumCollection from "./PremiumCollection.jpg";

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
        gradient: 'from-green-700 to-green-900',
        color: '#4ae02c', // green
    },
    {
        id: 2,
        title: "Green Masters",
        text: "Handpicked by Farm Experts - Freshness grown with care and delivered with love",
        icon: GiFarmer,
        img: IA2,
        gradient: 'from-orange-700 to-orange-900',
        color: '#4ae02c', // green
    },
    {
        id: 3,
        title: "Premium Quality",
        text: "Handpicked Organic Produce from Local Growers",
        icon: FaLeaf,
        img: IA3,
        gradient: 'from-emerald-700 to-emerald-900',
        color: '#4ae02c', // green
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
        name: "Yashodh Silva",
        role: "Inventory Manager",
        img: IA4,
        bio: "Keeps track of daily sales, restocks, and communicates with suppliers.",
        delay: 0.1,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Arshia Zoysa",
        role: "Local Supplier",
        img: IA5,
        bio: "Grows and supplies fresh vegetables, fruits, and herbs directly to the shop.",
        delay: 0.3,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Pragash Senanayake",
        role: "Delivery Coordinator",
        img: IA6,
        bio: "Manages route planning and customer handovers efficiently.",
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
    { icon: FaFire, title: "Fresh Picks", text: "Handpicked Farm Specials", color: "from-purple-600 to-[#E2725B]" }
];

// SPECIAL OFFER
export const commonTransition = "transition-all duration-300";
export const addButtonBase = "flex items-center gap-2 bg-gradient-to-r from-[#048b0b] to-[#04720b] text-white px-5 py-2.5 rounded-xl font-bold border-2 border-amber-400/30";
export const addButtonHover = "hover:gap-3 hover:shadow-lg hover:shadow-[#048b0b]/50 active:scale-95 relative overflow-hidden";

// SPECIAL MENU
export const cardData = [
    { id: 1, title: 'Flash Deals - 20% OFF', rating: 4.5, hearts: 105, description: 'Enjoy a 1 kg Fresh Fruit Basket packed with juicy Mangoes, Apples, Grapes, Guavas, and Oranges; farm-fresh, naturally sweet, and delivered straight to your doorstep!', image: FlashDeals, popular: true, price: 'Rs 3850' },
    { id: 2, title: 'Merry Mix Fruit - 500g', rating: 5.0, hearts: 155, description: 'A delightful 500g basket filled with a colorful blend of Apples, Grapes, Pineapple, Papaya, and Mango, freshly packed to bring sweetness, nutrition, and a touch of joy to your day!', image: MerryMixFruitBasket, bestseller: true, price: 'Rs 3000' },
    { id: 3, title: 'Premium Pack - 1kg', rating: 4.2, hearts: 85, description: 'A wholesome 1kg basket of premium farm-fresh Carrots, Broccoli, Bell Peppers, Beans, Cauliflower, and Leeks, carefully selected for quality, freshness, and natural goodness in every bite.', image: PremiumCollection, price: 'Rs 4500' },
    { id: 4, title: 'Vege Combo - 1kg', rating: 4.8, hearts: 285, description: 'A nutritious 1kg combo filled with everyday favorites like Beans, Okra, Pumpkin, Cabbage, Potatoes, and Leeks, freshly picked from local farms to bring balanced flavor and color to your meals.', image: VegeCombo, special: true, price: 'Rs 4000' },
];
export const additionalData = [
    { id: 5, title: 'Very Berry - 500g', rating: 4.8, hearts: 210, description: 'A delicious 500g blend of Strawberries, Blueberries, Raspberries, Blackberries, and Cranberries, bursting with natural sweetness and antioxidants — the perfect healthy, fruity treat!', image: VeryBerry, popular: true, price: 'Rs 7000' },
    { id: 6, title: 'Juicy Offer - 500g', rating: 4.5, hearts: 165, description: 'A refreshing 500g selection of Oranges, Pineapples, Watermelons, Mangoes, and Papayas, packed with natural sweetness and vitamin-rich juiciness — perfect for a fresh, energizing treat!', image: JuicyOffer ,bestseller: true, price: 'Rs 2200' },
    { id: 7, title: 'Buy One Get One Free - 500g', rating: 4.7, hearts: 190, description: 'Buy one 500g pack of fresh, juicy tomatoes and get another pack absolutely free; perfect for salads, curries, and sauces bursting with natural flavor!', image: TomatoesOnions, price: 'Rs 580' },
    { id: 8, title: 'Family Veggie - 1kg', rating: 4.9, hearts: 275, description: 'A hearty 1kg family pack filled with Cabbage, Carrots, Beans, Brinjal, Pumpkin, and Potatoes, freshly harvested to make wholesome, healthy meals for the whole family.', image: FamilyVeggieBasket, special: true, price: 'Rs 3000' },
];

// FOOTER 
export const socialIcons = [
    { icon: FaFacebook, link: 'https://www.facebook.com/', color: '#3b5998', label: 'Facebook' },
    { icon: FaInstagram, link: 'https://www.instagram.com/', color: '#E1306C', label: 'Instagram' },
    { icon: FaXTwitter, link: 'https://x.com/', color: '#000', label: 'X' },
    { icon: FaYoutube, link: 'https://youtube.com/', color: '#FF0000', label: 'Youtube' },
];

// LOGIN 
export const inputBase = "w-full rounded-lg bg-[#024406] text-[#d6f6c4] placeholder-[#d6f6c4] focus:outline-none focus:ring-2 focus:ring-[#048b0b]";
export const iconClass = "absolute top-1/2 transform -translate-y-1/2 left-3 text-[#d6f6c4]";

// CONTACT
export const contactFormFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', Icon: FiUser },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+94 7xxxxxxxx', pattern: "[+]{0,1}[0-9]{10,13}", Icon: FiSmartphone },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your.email@example.com', Icon: FiMail },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your delivery address', Icon: FiHome },
    { label: 'Product Name', name: 'dish', type: 'text', placeholder: 'Enter product name (e.g., Carrot, Mango)', Icon: FaLeaf  },
];

// BANNER
export const bannerAssets = {
    bannerImage: BannerImage,
    orbitImages: [Image1, Image2, Image3, Image4],
    video: Video,
};