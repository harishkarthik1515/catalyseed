import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Home, Calendar, Trophy, Award, MessageSquare, Filter, ChevronDown, MapPin, Building, User, LogOut, Settings, Users, UserPlus, LogIn } from 'lucide-react';
import { useFilters } from './GlobalFilter';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showTubeUserDropdown, setShowTubeUserDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchFilterRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const tubeUserDropdownRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDistrict,
    setSelectedDistrict,
    selectedSector,
    setSelectedSector,
    selectedStatus,
    setSelectedStatus,
    clearFilters,
    activeFiltersCount
  } = useFilters();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (searchFilterRef.current && !searchFilterRef.current.contains(event.target as Node)) {
        setShowSearchFilter(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (tubeUserDropdownRef.current && !tubeUserDropdownRef.current.contains(event.target as Node)) {
        setShowTubeUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationItems = [
    { 
      id: 'home', 
      label: 'Home', 
      href: '#home', 
      icon: Home
    },
    { 
      id: 'hackathons', 
      label: 'Hackathons', 
      href: '#hackathons', 
      icon: Calendar
    },
    { 
      id: 'success-stories', 
      label: 'Success Stories', 
      href: '#success-stories', 
      icon: Trophy
    },
    { 
      id: 'awards', 
      label: 'E-Cell Awards', 
      href: '#awards', 
      icon: Award
    },
    { 
      id: 'testimonials', 
      label: 'Testimonials', 
      href: '#testimonials', 
      icon: MessageSquare
    },
    { 
      id: 'forum', 
      label: 'Forum & Community', 
      href: '/forum', 
      icon: Users
    }
  ];

  const categories = ['all', 'TECHNOLOGY', 'STARTUP', 'AGRICULTURE', 'HEALTHCARE', 'EDUCATION', 'FINANCE'];
  const districts = ['all', 'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'];
  const sectors = ['all', 'AgriTech', 'EdTech', 'HealthTech', 'FinTech', 'CleanTech', 'RetailTech'];
  const statuses = ['all', 'upcoming', 'live', 'completed', 'featured'];

  const handleNavClick = (href: string, id: string) => {
    setShowDropdown(false);
    setIsMenuOpen(false);
    setShowSearchFilter(false);
    setShowUserDropdown(false);
    setShowTubeUserDropdown(false);
    
    if (id === 'forum') {
      onNavigate('forum');
      window.history.pushState({}, '', '/forum');
    } else {
      onNavigate('home');
      window.history.pushState({}, '', '/');
      // Smooth scroll to section after navigation
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleSearchClick = () => {
    setShowSearchFilter(!showSearchFilter);
    setShowDropdown(false);
    setShowUserDropdown(false);
    setShowTubeUserDropdown(false);
  };

  const handleDashboardClick = () => {
    onNavigate('dashboard');
    window.history.pushState({}, '', '/dashboard');
    setShowUserDropdown(false);
    setShowTubeUserDropdown(false);
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    onNavigate('profile');
    window.history.pushState({}, '', '/profile');
    setShowUserDropdown(false);
    setShowTubeUserDropdown(false);
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  // FIXED: Enhanced home click handler with better event handling
  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('Logo clicked - navigating to home'); // Debug log
    
    // Close all dropdowns
    setShowUserDropdown(false);
    setShowTubeUserDropdown(false);
    setShowDropdown(false);
    setIsMenuOpen(false);
    setShowSearchFilter(false);
    
    // Navigate to home
    onNavigate('home');
    window.history.pushState({}, '', '/');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    setShowTubeUserDropdown(false);
    setShowDropdown(false);
    setIsMenuOpen(false);
    onNavigate('home');
    window.history.pushState({}, '', '/');
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // User Dropdown Component for reuse
  const UserDropdownMenu = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    if (!isVisible) return null;
    
    return (
      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50">
        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">View Profile</span>
          </button>

          {(user?.role === 'admin' || user?.role === 'institute') && (
            <button
              onClick={handleDashboardClick}
              className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700">Dashboard</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Original Header - Hidden on scroll */}
      <header className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - FIXED: Added proper click handler */}
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={handleHomeClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleHomeClick();
                }
              }}
            >
              <img 
                src="/calayseed logo.png" 
                alt="Catalyseed" 
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigationItems.map((item) => (
                <a 
                  key={item.id}
                  href={item.href} 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSearchClick}
                className={`p-2 transition-colors rounded-lg relative ${
                  showSearchFilter || activeFiltersCount > 0
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Search className="h-5 w-5" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Auth Buttons / User Menu */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  <UserDropdownMenu isVisible={showUserDropdown} onClose={() => setShowUserDropdown(false)} />
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a 
                    key={item.id}
                    href={item.href} 
                    className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.id);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="text-gray-700 hover:text-red-600 transition-colors font-medium text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setShowSignupModal(true)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-left"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Tube Navbar - Appears on scroll */}
      <div className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 px-2 sm:px-0 w-full sm:w-auto ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <nav className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full px-3 sm:px-4 lg:px-6 py-2.5 shadow-2xl border border-gray-200/50 max-w-full sm:max-w-none">
          <div className="flex items-center justify-between">
            {/* Logo - FIXED: Enhanced with better event handling and debugging */}
            <div 
              className="flex items-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity active:scale-95 transform duration-150" 
              onClick={(e) => {
                console.log('Tube navbar logo clicked'); // Debug log
                handleHomeClick(e);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleHomeClick();
                }
              }}
              aria-label="Go to home page"
            >
              <img 
                src="/calayseed logo.png" 
                alt="Catalyseed" 
                className="h-6 sm:h-7 lg:h-8 w-auto pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Navigation Links - Hidden on smaller screens */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 mx-6">
              {navigationItems.slice(0, 5).map((item) => (
                <a 
                  key={item.id}
                  href={item.href} 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm whitespace-nowrap px-2 py-1 rounded-lg hover:bg-red-50"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                >
                  {item.id === 'success-stories' ? 'Stories' : 
                   item.id === 'awards' ? 'Awards' : item.label}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Button */}
              <button 
                onClick={handleSearchClick}
                className={`p-1.5 sm:p-2 transition-colors rounded-full relative ${
                  showSearchFilter || activeFiltersCount > 0
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* User Menu or Auth Buttons */}
              {isAuthenticated && user ? (
                <div className="relative" ref={tubeUserDropdownRef}>
                  <button
                    onClick={() => setShowTubeUserDropdown(!showTubeUserDropdown)}
                    className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={user.name}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                    />
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </button>

                  <UserDropdownMenu isVisible={showTubeUserDropdown} onClose={() => setShowTubeUserDropdown(false)} />
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-1">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Sign In"
                  >
                    <LogIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="p-1.5 sm:p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    aria-label="Sign Up"
                  >
                    <UserPlus className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Dropdown Menu Button */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 relative"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.href, item.id)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                        >
                          <Icon className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                          <span className="text-gray-700 group-hover:text-red-600 font-medium">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                    
                    {/* Divider */}
                    <div className="my-2 border-t border-gray-100"></div>
                    
                    {/* Search Action */}
                    <button 
                      onClick={handleSearchClick}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                    >
                      <Search className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                      <span className="text-gray-700 group-hover:text-red-600 font-medium">
                        Search & Filter
                      </span>
                      {activeFiltersCount > 0 && (
                        <span className="ml-auto bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {activeFiltersCount}
                        </span>
                      )}
                    </button>

                    {/* Auth buttons for mobile */}
                    {!isAuthenticated && (
                      <>
                        <div className="my-2 border-t border-gray-100"></div>
                        <button
                          onClick={() => setShowLoginModal(true)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                        >
                          <LogIn className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                          <span className="text-gray-700 group-hover:text-red-600 font-medium">Sign In</span>
                        </button>
                        <button
                          onClick={() => setShowSignupModal(true)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                        >
                          <UserPlus className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                          <span className="text-gray-700 group-hover:text-red-600 font-medium">Sign Up</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Search & Filter Panel */}
      {showSearchFilter && (
        <div 
          ref={searchFilterRef}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-4xl px-4 transition-all duration-300 ${
            isScrolled ? 'top-24' : 'top-20'
          }`}
        >
          <div className={`bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 overflow-hidden ${
            isScrolled ? 'rounded-2xl' : 'rounded-2xl'
          }`}>
            {/* Search Header */}
            <div className="p-4 border-b border-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search across all content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                  />
                </div>
                <button
                  onClick={() => setShowSearchFilter(false)}
                  className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Options */}
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
                  >
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district === 'all' ? 'All Districts' : district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sector Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
                  >
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector === 'all' ? 'All Sectors' : sector}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      Search: "{searchTerm.length > 20 ? searchTerm.substring(0, 20) + '...' : searchTerm}"
                      <button onClick={() => setSearchTerm('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedDistrict !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {selectedDistrict}
                      <button onClick={() => setSelectedDistrict('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedSector !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {selectedSector}
                      <button onClick={() => setSelectedSector('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedStatus !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {selectedStatus}
                      <button onClick={() => setSelectedStatus('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowSearchFilter(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Apply Filters
                  </button>
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
        onSwitchToSignup={switchToSignup}
      />
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default Header;