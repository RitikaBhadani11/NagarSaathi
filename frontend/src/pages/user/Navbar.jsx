// import { FaBars, FaTimes } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo - Updated to link to /home */}
//           <div className="flex items-center">
//             <Link to="/home" className="flex-shrink-0">
//               <span className="text-xl font-bold text-green-600">CleanNeighborhood</span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-4">
//               <Link
//                 to="/feedback"
//                 className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Feedback
//               </Link>
//               <Link
//                 to="/complaint"
//                 className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 File Complaint
//               </Link>
//               <Link
//                 to="/mycomplaints"
//                 className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 My Complaints
//               </Link>
//               <Link
//                 to="/forum"
//                 className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Discussion Forum
//               </Link>
//               <Link
//                 to="/login"
//                 className="text-gray-700 hover:bg-green-50 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <FaTimes className="block h-6 w-6" />
//               ) : (
//                 <FaBars className="block h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white shadow-lg">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link
//               to="/home"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
//               onClick={toggleMenu}
//             >
//               Home
//             </Link>
//             <Link
//               to="/feedback"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
//               onClick={toggleMenu}
//             >
//               Feedback
//             </Link>
//             <Link
//               to="/complaint"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
//               onClick={toggleMenu}
//             >
//               File Complaint
//             </Link>
//             <Link
//               to="/mycomplaints"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
//               onClick={toggleMenu}
//             >
//               My Complaints
//             </Link>
//             <Link
//               to="/forum"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
//               onClick={toggleMenu}
//             >
//               Discussion Forum
//             </Link>
//             <div className="border-t border-gray-200 pt-2">
//               <Link
//                 to="/login"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
//                 onClick={toggleMenu}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700"
//                 onClick={toggleMenu}
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;