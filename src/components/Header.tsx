import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Sparkles, User, LogIn, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // If we're on the home page, smooth scroll to section
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on a different page, navigate to home first, then scroll
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      // For regular page navigation
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const navigation = [
    { name: 'Hackathons', href: '/hackathons' }, // Changed to page route
    { name: 'Success Stories', href: '#success-stories' }, // Keeps section anchor
    { name: 'Forum', href: '/forum' }, // Changed to page route
    { name: 'Community', href: '/community' }, // Changed to page route
    { name: 'Testimonials', href: '#testimonials' }, // Keeps section anchor
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'startup': return 'bg-purple-100 text-purple-800';
      case 'investor': return 'bg-green-100 text-green-800';
      case 'institute': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-transparent' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className={`w-full transition-all duration-300 ease-out ${
          isScrolled 
            ? 'max-w-4xl mx-auto my-2 sm:my-3 rounded-full bg-white/95 backdrop-blur-xl shadow-xl border border-white/20' 
            : 'max-w-7xl mx-auto'
        } px-3 sm:px-4 lg:px-8`}>
          <div className={`flex items-center justify-between w-full transition-all duration-300 ${
            isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'
          }`}>
            
            {/* Logo */}
            <div 
              className="flex items-center flex-shrink-0 cursor-pointer min-w-0"
              onClick={handleLogoClick}
            >
              <div className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-6 h-6 sm:w-8 sm:h-8'
              }`}>
                <Sparkles className={`text-white ${isScrolled ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-3 h-3 sm:w-5 sm:h-5'}`} />
              </div>
              <span className={`ml-2 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}>
                Catalyseed
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-shrink-0">
              {isScrolled ? (
                // Compact navigation for scrolled state
                <div className="flex items-center space-x-6">
                  {navigation.slice(0, 3).map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              ) : (
                // Full navigation for normal state
                <div className="flex items-center space-x-4 xl:space-x-6">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0">
              
              {/* Search Bar */}
              <div className={`relative transition-all duration-300 hidden md:block flex-shrink-0 ${
                isSearchFocused 
                  ? 'w-48 lg:w-56' 
                  : isScrolled 
                    ? 'w-20 lg:w-24' 
                    : 'w-32 lg:w-40'
              }`}>
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Search className={`text-gray-400 ${isScrolled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                </div>
                <input
                  type="text"
                  placeholder={isScrolled ? "Search..." : "Search..."}
                  className={`block w-full border rounded-lg transition-all duration-200 ${
                    isScrolled 
                      ? 'pl-6 sm:pl-7 pr-2 py-1 text-xs border-gray-200 focus:ring-1 focus:ring-purple-500 focus:border-transparent bg-white' 
                      : 'pl-7 sm:pl-8 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white'
                  }`}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>

              {/* Auth Section */}
              <div className="hidden sm:flex items-center space-x-2">
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 px-3 py-1.5 sm:px-4 sm:py-2"
                    >
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`}
                        alt={user.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium text-xs sm:text-sm text-gray-700 max-w-20 truncate">
                        {user.name}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </button>

                    {/* User Dropdown */}
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                        <div className="py-1">
                          {user.role !== 'general' ? (
                            <Link
                              to="/dashboard"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Dashboard</span>
                            </Link>
                          ) : (
                            <Link
                              to="/profile"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Profile</span>
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setShowSignupModal(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 px-3 py-1.5 sm:px-4 sm:py-2"
                    >
                      <span className="font-medium text-xs sm:text-sm whitespace-nowrap">Sign Up</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-1.5 sm:p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-700 mobile-menu-container flex-shrink-0 ${
                  isScrolled ? 'ml-1' : 'ml-2'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl mobile-menu-container overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center space-x-2" onClick={handleLogoClick}>
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer">
                    Catalyseed
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                    />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                      Navigation
                    </h3>
                    
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                      >
                        <span>{item.name}</span>
                      </button>
                    ))}

                    {/* Auth Section */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      {user ? (
                        <div className="space-y-2">
                          <div className="px-3 py-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {user.role !== 'general' ? (
                            <Link
                              to="/dashboard"
                              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Dashboard</span>
                            </Link>
                          ) : (
                            <Link
                              to="/profile"
                              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Profile</span>
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsMenuOpen(false);
                            }}
                            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setShowLoginModal(true);
                              setIsMenuOpen(false);
                            }}
                            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Sign In</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowSignupModal(true);
                              setIsMenuOpen(false);
                            }}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                          >
                            Sign Up
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default Header;