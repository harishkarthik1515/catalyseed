import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, ExternalLink, Eye, Heart, MessageCircle, Star, Zap, Sparkles, Crown, Trophy, ChevronLeft, ChevronRight, Grid, List, Filter } from 'lucide-react';
import { useFilters } from './GlobalFilter';

const stories = [
  {
    id: 1,
    company: 'FreshCart',
    founder: 'Priya Sharma',
    institute: 'Anna University',
    sector: 'AgriTech',
    category: 'AGRICULTURE',
    valuation: '₹50 Cr',
    employees: 150,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Revolutionizing farm-to-table supply chain with AI-powered logistics and sustainable farming practices. The platform connects farmers directly with consumers.',
    achievements: ['Best Startup Award 2023', 'Series A Funding', '10+ Cities', 'Carbon Neutral Operations'],
    readTime: '5 min read',
    views: '12.5K',
    likes: 234,
    comments: 45,
    tags: ['AgriTech', 'AI', 'Sustainability', 'Logistics'],
    featured: true
  },
  {
    id: 2,
    company: 'EduTech Solutions',
    founder: 'Rajesh Kumar',
    institute: 'IIT Madras',
    sector: 'EdTech',
    category: 'EDUCATION',
    valuation: '₹25 Cr',
    employees: 80,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Making quality education accessible through vernacular language learning and AI-powered personalization for rural students.',
    achievements: ['1M+ Users', 'Government Partnership', 'Rural Impact Award'],
    readTime: '4 min read',
    views: '8.2K',
    likes: 189,
    comments: 32,
    tags: ['EdTech', 'AI', 'Language', 'Rural'],
    featured: false
  },
  {
    id: 3,
    company: 'HealthFirst',
    founder: 'Dr. Meera Patel',
    institute: 'Madras Medical College',
    sector: 'HealthTech',
    category: 'HEALTHCARE',
    valuation: '₹35 Cr',
    employees: 120,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Telemedicine platform connecting rural patients with specialist doctors using advanced diagnostics and AI-powered health monitoring.',
    achievements: ['500K+ Consultations', 'WHO Recognition', 'Pan-India Presence'],
    readTime: '6 min read',
    views: '15.7K',
    likes: 312,
    comments: 67,
    tags: ['HealthTech', 'Telemedicine', 'Rural', 'Diagnostics'],
    featured: false
  },
  {
    id: 4,
    company: 'GreenEnergy',
    founder: 'Arjun Krishnan',
    institute: 'PSG College of Technology',
    sector: 'CleanTech',
    category: 'TECHNOLOGY',
    valuation: '₹40 Cr',
    employees: 95,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Solar energy solutions for rural communities with innovative financing models and sustainable energy infrastructure.',
    achievements: ['10K+ Installations', 'Carbon Neutral Award', 'Rural Electrification'],
    readTime: '5 min read',
    views: '9.3K',
    likes: 156,
    comments: 28,
    tags: ['CleanTech', 'Solar', 'Rural', 'Financing'],
    featured: false
  },
  {
    id: 5,
    company: 'FinanceFlow',
    founder: 'Kavitha Raman',
    institute: 'Loyola College',
    sector: 'FinTech',
    category: 'FINANCE',
    valuation: '₹30 Cr',
    employees: 75,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Digital banking solutions for underserved communities with blockchain-powered micro-lending and financial inclusion.',
    achievements: ['2M+ Users', 'RBI Approval', 'Financial Inclusion Award'],
    readTime: '4 min read',
    views: '7.8K',
    likes: 143,
    comments: 21,
    tags: ['FinTech', 'Blockchain', 'Inclusion', 'Banking'],
    featured: false
  },
  // Additional stories for pagination
  {
    id: 6,
    company: 'SmartLogistics',
    founder: 'Vikram Singh',
    institute: 'NIT Trichy',
    sector: 'LogiTech',
    category: 'TECHNOLOGY',
    valuation: '₹22 Cr',
    employees: 65,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'AI-powered logistics optimization platform reducing delivery costs and improving efficiency for e-commerce.',
    achievements: ['50+ Clients', 'Cost Reduction 30%', 'Tech Innovation Award'],
    readTime: '4 min read',
    views: '6.1K',
    likes: 98,
    comments: 15,
    tags: ['LogiTech', 'AI', 'E-commerce', 'Optimization'],
    featured: false
  },
  {
    id: 7,
    company: 'AquaTech',
    founder: 'Deepika Nair',
    institute: 'CEG Anna University',
    sector: 'WaterTech',
    category: 'TECHNOLOGY',
    valuation: '₹18 Cr',
    employees: 45,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Smart water management solutions for urban areas using IoT sensors and predictive analytics.',
    achievements: ['Smart City Projects', 'Water Savings 40%', 'Environmental Award'],
    readTime: '3 min read',
    views: '4.7K',
    likes: 76,
    comments: 12,
    tags: ['WaterTech', 'IoT', 'Smart City', 'Environment'],
    featured: false
  },
  {
    id: 8,
    company: 'FoodSafe',
    founder: 'Arun Prakash',
    institute: 'Thiagarajar College',
    sector: 'FoodTech',
    category: 'AGRICULTURE',
    valuation: '₹15 Cr',
    employees: 38,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Blockchain-based food traceability platform ensuring food safety and reducing waste in supply chains.',
    achievements: ['Food Safety Certification', 'Waste Reduction 25%', 'Blockchain Innovation'],
    readTime: '4 min read',
    views: '5.3K',
    likes: 89,
    comments: 18,
    tags: ['FoodTech', 'Blockchain', 'Safety', 'Supply Chain'],
    featured: false
  }
];

const SuccessStories: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());
  const [floatingIcons, setFloatingIcons] = useState<Array<{id: number, icon: any, x: number, y: number, delay: number}>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState<'valuation' | 'popularity' | 'employees'>('valuation');

  const {
    searchTerm,
    selectedCategory,
    selectedDistrict,
    selectedSector,
    selectedStatus
  } = useFilters();

  // Generate floating icons
  useEffect(() => {
    const icons = [TrendingUp, Award, Star, Crown, Zap, Sparkles];
    const newFloatingIcons = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setFloatingIcons(newFloatingIcons);
  }, []);

  const filteredStories = stories.filter(s => {
    const matchesSearch = searchTerm === '' || 
      s.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSector = selectedSector === 'all' || s.sector === selectedSector;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'featured' && s.featured);
    
    return matchesSearch && matchesCategory && matchesSector && matchesStatus;
  });

  // Sort stories
  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return parseInt(b.views.replace('K', '000').replace('.', '')) - parseInt(a.views.replace('K', '000').replace('.', ''));
      case 'employees':
        return b.employees - a.employees;
      case 'valuation':
      default:
        return parseInt(b.valuation.replace('₹', '').replace(' Cr', '')) - parseInt(a.valuation.replace('₹', '').replace(' Cr', ''));
    }
  });

  const featuredStory = sortedStories.find(s => s.featured) || sortedStories[0];
  const regularStories = sortedStories.filter(s => !s.featured || s.id !== featuredStory?.id);

  // Pagination
  const totalPages = Math.ceil(regularStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStories = regularStories.slice(startIndex, startIndex + itemsPerPage);

  const handleLike = (storyId: number) => {
    setLikedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="success-stories" className="py-12 bg-white relative overflow-hidden">
      {/* Floating Background Icons */}
      {floatingIcons.map(({ id, icon: Icon, x, y, delay }) => (
        <div
          key={id}
          className="absolute opacity-5 text-green-500 pointer-events-none"
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
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-600 text-sm font-semibold mb-4 hover:bg-green-200 transition-colors cursor-pointer group">
            <Trophy className="h-4 w-4 mr-2 group-hover:animate-bounce" />
            <span>Success Stories</span>
            <Star className="h-4 w-4 ml-2 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer">Success</span>{' '}
            <span className="text-red-600 inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.1s' }}>Stories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Celebrating remarkable startup journeys from Tamil Nadu's institutes
          </p>
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Showing {paginatedStories.length} of {filteredStories.length} stories</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
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
              <option value={4}>4 per page</option>
              <option value={8}>8 per page</option>
              <option value={12}>12 per page</option>
              <option value={16}>16 per page</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'valuation' | 'popularity' | 'employees')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
            >
              <option value="valuation">Sort by Valuation</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="employees">Sort by Team Size</option>
            </select>

            {/* Results Info */}
            <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {/* Featured Story */}
        {featuredStory && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img 
                      src={featuredStory.image} 
                      alt={featuredStory.company}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                    
                    {/* Animated Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse hover:animate-bounce transition-all duration-300">
                        FEATURED STORY
                      </span>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleLike(featuredStory.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                          likedStories.has(featuredStory.id) 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedStories.has(featuredStory.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Animated Company Info */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center mb-2">
                        <Crown className="h-5 w-5 mr-2 animate-bounce" />
                        <span className="text-sm font-bold">Success Story</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1 group-hover:animate-bounce-subtle">
                        {featuredStory.company}
                      </h3>
                      <p className="text-sm opacity-90">{featuredStory.sector}</p>
                    </div>

                    {/* Rotating Valuation Badge */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-green-600 text-white px-3 py-2 rounded-full text-sm font-bold transform hover:rotate-12 transition-transform duration-300 cursor-pointer">
                        <TrendingUp className="h-4 w-4 inline mr-1 animate-bounce" />
                        {featuredStory.valuation}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                        {featuredStory.founder}
                      </h4>
                      <p className="text-red-600 font-medium hover:text-red-700 transition-colors duration-300">
                        {featuredStory.institute}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600 hover:animate-pulse cursor-pointer">
                        {featuredStory.valuation}
                      </p>
                      <p className="text-sm text-gray-500">Valuation</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed hover:text-gray-800 transition-colors duration-300">
                    {featuredStory.description}
                  </p>

                  {/* Interactive Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Users className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                      <span>{featuredStory.employees} employees</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-300 cursor-pointer group">
                      <TrendingUp className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                      <span>Growing</span>
                    </div>
                  </div>

                  {/* Animated Achievements */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <Award className="h-4 w-4 mr-2 animate-bounce" />
                      Key Achievements
                    </h5>
                    <div className="grid grid-cols-2 gap-1">
                      {featuredStory.achievements.slice(0, 4).map((achievement, index) => (
                        <div key={index} className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></div>
                          <span className="text-xs text-gray-600 group-hover:text-red-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Stats with Animations */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-3 text-sm text-gray-500">
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Eye className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                        <span>{featuredStory.views}</span>
                      </div>
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Heart className={`h-4 w-4 mr-1 group-hover:animate-pulse ${likedStories.has(featuredStory.id) ? 'fill-current text-red-500' : ''}`} />
                        <span>{featuredStory.likes + (likedStories.has(featuredStory.id) ? 1 : 0)}</span>
                      </div>
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <MessageCircle className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                        <span>{featuredStory.comments}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
                      {featuredStory.readTime}
                    </span>
                  </div>

                  {/* Interactive CTA Button */}
                  <button className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium flex items-center justify-center group transform hover:scale-105 hover:shadow-lg relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                    
                    <span className="relative">Read Full Story</span>
                    <ExternalLink className="h-4 w-4 ml-2 relative group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'} mb-8`}>
          {paginatedStories.map((story) => (
            <article
              key={story.id}
              className={`bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 group cursor-pointer ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              onMouseEnter={() => setHoveredCard(story.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-40'}`}>
                <img 
                  src={story.image} 
                  alt={story.company}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                
                {/* Floating Like Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(story.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                      likedStories.has(story.id) 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Animated Company Info */}
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-sm mb-1 group-hover:animate-bounce-subtle">
                    {story.company}
                  </h3>
                  <p className="text-xs opacity-90">{story.sector}</p>
                </div>

                {/* Rotating Valuation Badge */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold transform hover:rotate-12 transition-transform duration-300">
                    <TrendingUp className="h-3 w-3 inline mr-1 animate-bounce" />
                    {story.valuation}
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm hover:text-red-600 transition-colors duration-300 cursor-pointer">
                      {story.founder}
                    </h4>
                    <p className="text-xs text-red-600 hover:text-red-700 transition-colors duration-300">
                      {story.institute}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600 hover:animate-pulse cursor-pointer">
                      {story.valuation}
                    </p>
                    <p className="text-xs text-gray-500">Valuation</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2 hover:text-gray-800 transition-colors duration-300">
                  {story.description}
                </p>

                {/* Interactive Stats */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                    <Users className="h-3 w-3 mr-1 group-hover:animate-bounce" />
                    <span>{story.employees} employees</span>
                  </div>
                  <div className="flex items-center hover:text-green-600 transition-colors duration-300 cursor-pointer group">
                    <TrendingUp className="h-3 w-3 mr-1 group-hover:animate-bounce" />
                    <span>Growing</span>
                  </div>
                </div>

                {/* Animated Achievements */}
                <div className="mb-3">
                  <h5 className="text-xs font-medium text-gray-900 mb-1 flex items-center">
                    <Award className="h-3 w-3 mr-1 animate-bounce" />
                    Achievements
                  </h5>
                  <div className="space-y-1">
                    {story.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <div className="w-1 h-1 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></div>
                        <span className="text-xs text-gray-600 group-hover:text-red-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement Stats with Hover Effects */}
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                  <div className="flex space-x-2">
                    <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Eye className="h-3 w-3 mr-1 group-hover:animate-pulse" />
                      <span>{story.views}</span>
                    </div>
                    <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Heart className={`h-3 w-3 mr-1 group-hover:animate-pulse ${likedStories.has(story.id) ? 'fill-current text-red-500' : ''}`} />
                      <span>{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                    </div>
                  </div>
                  <span className="hover:text-gray-700 transition-colors duration-300">{story.readTime}</span>
                </div>

                {/* Interactive CTA Button */}
                <button className="w-full bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-all duration-300 text-xs font-medium flex items-center justify-center group transform hover:scale-105 relative overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                  
                  <span className="relative">Read Story</span>
                  <ExternalLink className="h-3 w-3 ml-2 relative group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Glow Effect */}
              {hoveredCard === story.id && (
                <div className="absolute inset-0 rounded-xl bg-green-500/20 opacity-50 blur-xl -z-10 animate-pulse"></div>
              )}
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border shadow-sm">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, regularStories.length)} of {regularStories.length} stories
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

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 animate-bounce">
              <Trophy className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No success stories found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;