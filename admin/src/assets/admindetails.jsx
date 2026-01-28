import {
    FiPlusCircle,
    FiList,
    FiPackage,FiTruck, FiCheckCircle, FiClock,
} from 'react-icons/fi';


export const navLinks = [
    { name: 'Add Items', href: '/', icon: <FiPlusCircle /> },
    { name: 'List Items', href: '/list', icon: <FiList /> },
    { name: 'Orders', href: '/orders', icon: <FiPackage /> },
];


// LIST CSS
export const styles = {
    pageWrapper: "min-h-screen bg-gradient-to-br from-[#1b2226] via-[#133215] to-[#065302] py-12 px-4 sm:px-6 lg:px-8 font-[Playfair_Display]",
    cardContainer: "bg-[#263238]/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-green-500 hover:border-green-400",
    title: "text-3xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent text-center font-[Playfair_Display]",
    tableWrapper: "overflow-x-auto",
    table: "w-full rounded-3xl",
    thead: "bg-white/10 font-[Playfair_Display] ",
    th: "p-4 text-left text-amber-100 font-[Playfair_Display]",
    thCenter: "p-4 text-center text-amber-100 font-[Playfair_Display]",
    tr: "border-b border-green-500 hover:border-green-400 transition-colors",
    imgCell: "p-4",
    img: "w-50 h-30 object-contain rounded-lg",
    nameCell: "p-4",
    nameText: "text-amber-100 font-medium text-lg font-[Playfair_Display]",
    descText: "text-sm text-amber-100/60 font-[Playfair_Display]",
    categoryCell: "p-4 text-amber-100/80 font-[Playfair_Display]",
    priceCell: "p-4 text-amber-100 font-medium font-[Playfair_Display]",
    ratingCell: "p-4 font-[Playfair_Display]",
    heartsCell: "p-4 font-[Playfair_Display]",
    heartsWrapper: "flex items-center gap-2 text-[#fb3d03] font-[Playfair_Display]",
    deleteBtn: "text-amber-100 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-900/20 font-[Playfair_Display]",
    emptyState: "text-center py-12 text-amber-100/60 text-xl font-[Playfair_Display]",

    // AddItems styles
    formWrapper: "min-h-screen bg-gradient-to-br from-[#1b2226] via-[#133215] to-[#065302] py-10 px-4 sm:px-6 lg:px-8",
    formCard: "bg-[#263238]/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-green-500 hover:border-green-400 font-[Playfair_Display]",
    formTitle: "text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent text-center font-[Playfair_Display]",
    uploadWrapper: "flex justify-center",
    uploadLabel: "w-full max-w-xs sm:w-72 h-56 sm:h-72 bg-white/10 border-2 border-dashed border-green-500/30 rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden hover:border-green-500 transition-all",
    uploadIcon: "text-3xl sm:text-4xl text-green-200/50 mb-2 mx-auto animate-pulse",
    uploadText: "text-green-200/50 text-sm font-[Playfair_Display]",
    previewImage: "w-full h-full object-cover font-[Playfair_Display]",
    inputField: "w-full bg-white/10  rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200 font-[Playfair_Display] placeholder-green-200/50",
    textareaField: "w-full bg-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200 resize-none font-[Playfair_Display] placeholder-green-200/50",
    selectField: "w-full bg-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200 cursor-pointer font-[Playfair_Display] placeholder-green-200/50",
    gridTwoCols: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-[Playfair_Display] ",
    relativeInput: "relative font-[Playfair_Display] ",
    rupeeIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-green-200 text-lg sm:text-xl font-[Playfair_Display]",
    actionBtn: "w-full bg-gradient-to-r from-[#048b0b] to-[#04720b] hover:bg-gradient-to-l hover:from-[#048b0b] hover:to-[#04720b] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-95 mt-6 font-[Playfair_Display]",

    // AdminNavbar styles
    navWrapper: "bg-[#263238] border-b-8 border-[#048b0b]/30 shadow-lg sticky top-0 z-50 font-vibes",
    navContainer: "max-w-7xl mx-auto px-4 flex justify-between items-center h-20",
    logoSection: "flex items-center space-x-3",
    logoIcon: "text-2xl md:text-xl lg:text-4xl text-[#4cf452]",
    logoText: "text-2xl md:text-xl lg:text-4xl bg-gradient-to-r from-[#4cf452] to-[#048b0b] bg-clip-text text-transparent font-monsieur tracking-wider drop-shadow-[0_2px_2px] drop-shadow-black -translate-x-2 truncate md:truncate-none font-[Playfair_Display] italic",
    menuButton: "text-amber-200 text-2xl lg:hidden",
    desktopMenu: "hidden lg:flex items-center space-x-4 font-[Playfair_Display]",
    navLinkBase: "flex items-center space-x-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all hover:bg-[#048b0b]/20",
    navLinkActive: "border-[#048b0b]/50 bg-[#048b0b]/20 shadow-[inset_0_0_15px] shadow-[#048b0b]/20 text-amber-100 hover:text-[#4cf452]",
    navLinkInactive: "border-[#048b0b]/30 hover:border-[#048b0b]/50 text-amber-100 hover:text-[#4cf452] ",
    mobileMenu: "lg:hidden flex flex-col space-y-3 mt-4 pb-4 font-[Playfair_Display]"
};


// DummyData.jsx
// Centralized Tailwind CSS class definitions and style objects
export const iconMap = {
    FiClock: <FiClock className="text-lg" />,
    FiTruck: <FiTruck className="text-lg" />,
    FiCheckCircle: <FiCheckCircle className="text-lg" />,
};

// Status styles for order statuses
export const statusStyles = {
    processing: {
        color: 'text-amber-400',
        bg: 'bg-amber-900/20',
        icon: 'FiClock',
        label: 'Processing',
        hideLabel: false,
    },
    outForDelivery: {
        color: 'text-blue-400',
        bg: 'bg-blue-900/20',
        icon: 'FiTruck',
        label: 'Out for Delivery',
        hideLabel: false,
    },
    delivered: {
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        icon: 'FiCheckCircle',
        label: 'Delivered',
        hideLabel: false,
    },
    succeeded: {
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        icon: 'FiCheckCircle',
        label: 'Completed',
        hideLabel: true,
    },
};

// Payment method label and classes
export const paymentMethodDetails = {
    cod: {
        label: 'COD',
        class: 'bg-yellow-600/30 text-yellow-300 border-yellow-500/50',
    },
    card: {
        label: 'Credit/Debit Card',
        class: 'bg-blue-600/30 text-blue-300 border-blue-500/50',
    },
    upi: {
        label: 'UPI Payment',
        class: 'bg-purple-600/30 text-purple-300 border-purple-500/50',
    },
    default: {
        label: 'Online',
        class: 'bg-green-600/30 text-green-400 border-green-500/50',
    },
};

// Table layout classes
export const tableClasses = {
    wrapper: 'overflow-x-auto',
    table: 'w-full',
    headerRow: 'bg-[#048b0b]/50',
    headerCell: 'p-4 text-left text-green-400',
    row: 'border-b border-green-500/20 hover:bg-[#048b0b]/30 transition-colors group',
    cellBase: 'p-4',
};

// Utility classes
export const layoutClasses = {
    page: 'min-h-screen bg-gradient-to-br from-[#1b2226] via-[#133215] to-[#065302] py-12 px-4 sm:px-6 lg:px-8',
    card: 'bg-[#263238]/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-green-500 hover:border-green-400',
    heading: 'text-3xl font-bold mb-8 bg-gradient-to-r from-[#4cf452] to-[#048b0b] bg-clip-text text-transparent text-center',
};
