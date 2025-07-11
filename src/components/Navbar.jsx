import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Navbar() {
  const [email, setEmail] = useState('admin@example.com'); // Replace with actual admin email
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-open sidebar on desktop
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get first letter of email for avatar
  const firstLetter = email.charAt(0).toUpperCase();
  
  // Truncate email for display
  const truncatedEmail = email.length > 15 
    ? `${email.substring(0, 12)}...` 
    : email;

  return (
    <>
      <div className={`fixed top-0 left-0 w-full h-[60px] z-50 transition-all duration-300 px-5 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
      style={{
        boxShadow: scrolled 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 -2px 10px rgba(124, 58, 237, 0.1)' 
          : '0 2px 4px rgba(0, 0, 0, 0.05), 0 -1px 8px rgba(124, 58, 237, 0.05)'
      }}>
        <div className="h-full border-t-0 border-x-0 border-b border-gray-100">
          <div className="container mx-auto h-full flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">SAFEX</h1>
            </Link>
            
            {/* Spacer for center alignment */}
            <div className="flex-1"></div>
            
            {/* Admin Info */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-md cursor-pointer"
                onClick={isMobile ? toggleSidebar : undefined}
              >
                {firstLetter}
              </div>
              <span className="text-sm text-gray-600 hidden sm:block font-medium">{truncatedEmail}</span>
            </div>
            
            {/* Mobile Menu Button - Only visible on mobile */}
            <button 
              className="md:hidden text-gray-700 ml-3"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Sidebar - Conditionally rendered on mobile, always shown on desktop */}
      {sidebarOpen && <Sidebar />}
    </>
  );
}
