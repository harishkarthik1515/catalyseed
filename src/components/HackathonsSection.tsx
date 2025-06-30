import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Trophy, ArrowRight, Clock, Eye, Heart, Star, Zap, Award, Sparkles, ChevronLeft, ChevronRight, Grid, List, Filter } from 'lucide-react';
import { useFilters } from './GlobalFilter';

const hackathons = [
  {
    id: 1,
    title: 'TechHack Tamil Nadu 2024',
    institute: 'IIT Madras',
    location: 'Chennai',
    date: 'March 15-17, 2024',
    participants: 500,
    prizes: '₹5 Lakhs',
    status: 'upcoming',
    category: 'TECHNOLOGY',
    sector: 'AgriTech',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'India\'s largest student hackathon focusing on AI, ML, and emerging technologies. Join 500+ innovators for 48 hours of intensive coding and innovation.',
    tags: ['AI/ML', 'Web3', 'IoT'],
    difficulty: 'Advanced',
    duration: '48 hours',
    views: '2.4K',
    likes: 156,
    featured: true
  },
  {
    id: 2,
    title: 'Innovation Demo Day',
    institute: 'PSG College of Technology',
    location: 'Coimbatore',
    date: 'February 28, 2024',
    participants: 200,
    prizes: '₹2 Lakhs',
    status: 'live',
    category: 'STARTUP',
    sector: 'EdTech',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Showcase your startup ideas to top investors and industry leaders in this premier demo day event.',
    tags: ['Pitch', 'Funding', 'Mentorship'],
    difficulty: 'Intermediate',
    duration: '1 day',
    views: '1.8K',
    likes: 89,
    featured: false
  },
  {
    id: 3,
    title: 'Agri-Tech Challenge',
    institute: 'Tamil Nadu Agricultural University',
    location: 'Coimbatore',
    date: 'January 20-22, 2024',
    participants: 150,
    prizes: '₹3 Lakhs',
    status: 'completed',
    category: 'AGRICULTURE',
    sector: 'AgriTech',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Revolutionary solutions for modern agriculture and sustainable farming practices.',
    tags: ['AgriTech', 'Sustainability', 'Innovation'],
    difficulty: 'Beginner',
    duration: '3 days',
    views: '1.2K',
    likes: 67,
    featured: false
  },
  {
    id: 4,
    title: 'HealthTech Innovation',
    institute: 'Madras Medical College',
    location: 'Chennai',
    date: 'April 10-12, 2024',
    participants: 300,
    prizes: '₹4 Lakhs',
    status: 'upcoming',
    category: 'HEALTHCARE',
    sector: 'HealthTech',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Building the future of healthcare with cutting-edge technology and innovative solutions.',
    tags: ['MedTech', 'AI', 'Telemedicine'],
    difficulty: 'Advanced',
    duration: '3 days',
    views: '3.1K',
    likes: 234,
    featured: false
  },
  {
    id: 5,
    title: 'EduTech Summit',
    institute: 'Anna University',
    location: 'Chennai',
    date: 'May 5-7, 2024',
    participants: 400,
    prizes: '₹6 Lakhs',
    status: 'upcoming',
    category: 'EDUCATION',
    sector: 'EdTech',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Transforming education through innovative technology solutions and digital learning platforms.',
    tags: ['EdTech', 'Learning', 'Innovation'],
    difficulty: 'Intermediate',
    duration: '3 days',
    views: '2.7K',
    likes: 178,
    featured: false
  },
  {
    id: 6,
    title: 'FinTech Revolution',
    institute: 'Loyola College',
    location: 'Chennai',
    date: 'June 15-17, 2024',
    participants: 250,
    prizes: '₹3.5 Lakhs',
    status: 'upcoming',
    category: 'FINANCE',
    sector: 'FinTech',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Revolutionizing financial services with blockchain technology and artificial intelligence.',
    tags: ['Blockchain', 'FinTech', 'AI'],
    difficulty: 'Advanced',
    duration: '3 days',
    views: '1.9K',
    likes: 123,
    featured: false
  },
  // Add more hackathons for pagination demo
  {
    id: 7,
    title: 'CleanTech Challenge',
    institute: 'NIT Trichy',
    location: 'Tiruchirappalli',
    date: 'July 20-22, 2024',
    participants: 180,
    prizes: '₹2.5 Lakhs',
    status: 'upcoming',
    category: 'TECHNOLOGY',
    sector: 'CleanTech',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sustainable technology solutions for environmental challenges.',
    tags: ['CleanTech', 'Environment', 'Sustainability'],
    difficulty: 'Intermediate',
    duration: '3 days',
    views: '1.5K',
    likes: 95,
    featured: false
  },
  {
    id: 8,
    title: 'Smart City Hackathon',
    institute: 'Thiagarajar College of Engineering',
    location: 'Madurai',
    date: 'August 10-12, 2024',
    participants: 220,
    prizes: '₹4 Lakhs',
    status: 'upcoming',
    category: 'TECHNOLOGY',
    sector: 'SmartCity',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Building smart solutions for urban challenges and city management.',
    tags: ['IoT', 'Smart City', 'Urban Tech'],
    difficulty: 'Advanced',
    duration: '3 days',
    views: '2.1K',
    likes: 145,
    featured: false
  }
];

const HackathonsSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [floatingIcons, setFloatingIcons] = useState<Array<{id: number, icon: any, x: number, y: number, delay: number}>>([]);
  const [likedEvents, setLikedEvents] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'prizes'>('date');

  const {
    searchTerm,
    selectedCategory,
    selectedDistrict,
    selectedSector,
    selectedStatus
  } = useFilters();

  // Generate floating icons
  useEffect(() => {
    const icons = [Calendar, Trophy, Star, Zap, Award, Sparkles];
    const newFloatingIcons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setFloatingIcons(newFloatingIcons);
  }, []);

  const filteredHackathons = hackathons.filter(h => {
    const matchesSearch = searchTerm === '' || 
      h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || h.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || h.location === selectedDistrict;
    const matchesSector = selectedSector === 'all' || h.sector === selectedSector;
    const matchesStatus = selectedStatus === 'all' || h.status === selectedStatus || 
      (selectedStatus === 'featured' && h.featured);
    
    return matchesSearch && matchesCategory && matchesDistrict && matchesSector && matchesStatus;
  });

  // Sort hackathons
  const sortedHackathons = [...filteredHackathons].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return parseInt(b.views.replace('K', '000').replace('.', '')) - parseInt(a.views.replace('K', '000').replace('.', ''));
      case 'prizes':
        return parseInt(b.prizes.replace('₹', '').replace(' Lakhs', '')) - parseInt(a.prizes.replace('₹', '').replace(' Lakhs', ''));
      case 'date':
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  const featuredEvent = sortedHackathons.find(h => h.featured) || sortedHackathons[0];
  const regularEvents = sortedHackathons.filter(h => !h.featured || h.id !== featuredEvent?.id);

  // Pagination
  const totalPages = Math.ceil(regularEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = regularEvents.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-600';
      case 'live': return 'bg-red-600 animate-pulse';
      case 'completed': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const handleLike = (eventId: number) => {
    setLikedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of section
    document.getElementById('hackathons')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hackathons" className="py-12 bg-gray-50 relative overflow-hidden">
      {/* Floating Background Icons */}
      {floatingIcons.map(({ id, icon: Icon, x, y, delay }) => (
        <div
          key={id}
          className="absolute opacity-5 text-red-500 pointer-events-none"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${delay}s`
          }}
        >
          <Icon className="h-8 w-8 animate-float" />
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Interactive Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-600 text-sm font-semibold mb-4 hover:bg-red-200 transition-colors cursor-pointer group">
            <Calendar className="h-4 w-4 mr-2 group-hover:animate-bounce" />
            <span>Latest Events</span>
            <Sparkles className="h-4 w-4 ml-2 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer">Hackathons</span>{' '}
            <span className="text-red-600 inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.1s' }}>& Events</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Discover innovation challenges across Tamil Nadu's premier institutes
          </p>
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Showing {paginatedEvents.length} of {filteredHackathons.length} events</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Content Controls */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg border p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Items per page */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
            >
              <option value={6}>6 per page</option>
              <option value={9}>9 per page</option>
              <option value={12}>12 per page</option>
              <option value={18}>18 per page</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity' | 'prizes')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="prizes">Sort by Prize Money</option>
            </select>

            {/* Results Info */}
            <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {/* Featured Event */}
        {featuredEvent && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <img 
                      src={featuredEvent.image} 
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                    
                    {/* Animated Status Badge */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(featuredEvent.status)} transform hover:scale-110 transition-transform duration-300`}>
                        {featuredEvent.status.toUpperCase()}
                      </span>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse hover:animate-bounce transition-all duration-300">
                        FEATURED
                      </span>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleLike(featuredEvent.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                          likedEvents.has(featuredEvent.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedEvents.has(featuredEvent.id) ? 'fill-current animate-pulse' : ''}`} />
                      </button>
                    </div>

                    {/* Rotating Prize Badge */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-green-600 text-white px-3 py-2 rounded-full text-sm font-bold transform hover:rotate-12 transition-transform duration-300 cursor-pointer">
                        <Trophy className="h-4 w-4 inline mr-1 animate-bounce" />
                        {featuredEvent.prizes}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-red-600 font-medium mb-3 hover:text-red-700 transition-colors duration-300">
                    {featuredEvent.institute}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed hover:text-gray-800 transition-colors duration-300">
                    {featuredEvent.description}
                  </p>
                  
                  {/* Interactive Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Calendar className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <MapPin className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Users className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                      <span>{featuredEvent.participants} participants</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-300 cursor-pointer group">
                      <Trophy className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                      <span className="font-semibold">{featuredEvent.prizes}</span>
                    </div>
                  </div>

                  {/* Engagement Stats with Animations */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-3 text-sm text-gray-500">
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Eye className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                        <span>{featuredEvent.views}</span>
                      </div>
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Heart className={`h-4 w-4 mr-1 group-hover:animate-pulse ${likedEvents.has(featuredEvent.id) ? 'fill-current text-red-500' : ''}`} />
                        <span>{featuredEvent.likes + (likedEvents.has(featuredEvent.id) ? 1 : 0)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredEvent.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-red-100 hover:text-red-600 transition-colors duration-300 cursor-pointer transform hover:scale-105"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive CTA Button */}
                  <button className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium flex items-center justify-center group transform hover:scale-105 hover:shadow-lg relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                    
                    <span className="relative">Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-2 relative group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} mb-8`}>
          {paginatedEvents.map((hackathon) => (
            <article
              key={hackathon.id}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              onMouseEnter={() => setHoveredCard(hackathon.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-40'}`}>
                <img 
                  src={hackathon.image} 
                  alt={hackathon.title}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                
                {/* Animated Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(hackathon.status)} transform hover:scale-110 transition-transform duration-300`}>
                    {hackathon.status.toUpperCase()}
                  </span>
                </div>

                {/* Floating Like Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(hackathon.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                      likedEvents.has(hackathon.id) 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${likedEvents.has(hackathon.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Animated Title Overlay */}
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-sm mb-1 group-hover:animate-bounce-subtle">
                    {hackathon.title}
                  </h3>
                  <p className="text-xs opacity-90">{hackathon.institute}</p>
                </div>

                {/* Rotating Prize Badge */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold transform hover:rotate-12 transition-transform duration-300">
                    <Trophy className="h-3 w-3 inline mr-1 animate-bounce" />
                    {hackathon.prizes}
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1">
                <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2 hover:text-gray-800 transition-colors duration-300">
                  {hackathon.description}
                </p>

                {/* Interactive Stats */}
                <div className={`${viewMode === 'list' ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-2 gap-2'} mb-3 text-xs`}>
                  <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                    <Calendar className="h-3 w-3 mr-1 group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                    <MapPin className="h-3 w-3 mr-1 group-hover:animate-bounce" />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                    <Users className="h-3 w-3 mr-1 group-hover:animate-pulse" />
                    <span>{hackathon.participants}</span>
                  </div>
                  <div className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-300 cursor-pointer group">
                    <Trophy className="h-3 w-3 mr-1 group-hover:animate-bounce" />
                    <span className="font-medium">{hackathon.prizes}</span>
                  </div>
                </div>

                {/* Engagement Stats with Hover Effects */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-2 text-xs text-gray-500">
                    <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Eye className="h-3 w-3 mr-1 group-hover:animate-pulse" />
                      <span>{hackathon.views}</span>
                    </div>
                    <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Heart className={`h-3 w-3 mr-1 group-hover:animate-pulse ${likedEvents.has(hackathon.id) ? 'fill-current text-red-500' : ''}`} />
                      <span>{hackathon.likes + (likedEvents.has(hackathon.id) ? 1 : 0)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hackathon.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-red-100 hover:text-red-600 transition-colors duration-300 cursor-pointer transform hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive CTA Button */}
                <button className="w-full bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-all duration-300 text-xs font-medium flex items-center justify-center group transform hover:scale-105 relative overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                  
                  <span className="relative">Learn More</span>
                  <ArrowRight className="h-3 w-3 ml-2 relative group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Glow Effect */}
              {hoveredCard === hackathon.id && (
                <div className="absolute inset-0 rounded-xl bg-red-500/20 opacity-50 blur-xl -z-10 animate-pulse"></div>
              )}
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border shadow-sm">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, regularEvents.length)} of {regularEvents.length} events
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-red-600" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        currentPage === pageNum
                          ? 'bg-red-600 text-white'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-red-600" />
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 animate-bounce">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No events found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HackathonsSection;