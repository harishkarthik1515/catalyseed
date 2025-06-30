import React, { useState, useEffect } from 'react';
import { Quote, Star, MessageSquare, ChevronLeft, ChevronRight, Eye, Heart, Sparkles, Award, Grid, List, Filter } from 'lucide-react';
import { useFilters } from './GlobalFilter';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Rajesh Menon',
    role: 'Director, IIT Madras Incubation Cell',
    company: 'IIT Madras',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Catalyseed has been instrumental in connecting our startups with the broader ecosystem. The platform showcases the incredible innovation happening across Tamil Nadu and provides unprecedented visibility to our entrepreneurs.',
    rating: 5,
    category: 'EDUCATION',
    sector: 'EdTech',
    views: '4.2K',
    likes: 156,
    comments: 23,
    featured: true
  },
  {
    id: 2,
    name: 'Priya Krishnan',
    role: 'Managing Partner',
    company: 'Chennai Angels',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The quality of startups emerging from Tamil Nadu institutes is remarkable. Catalyseed helps us discover hidden gems and promising entrepreneurs. It\'s become our go-to platform for scouting innovative startups.',
    rating: 5,
    category: 'FINANCE',
    sector: 'FinTech',
    views: '3.8K',
    likes: 234,
    comments: 45,
    featured: false
  },
  {
    id: 3,
    name: 'Arjun Patel',
    role: 'Founder & CEO',
    company: 'TechStart Accelerator',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Catalyseed is bridging the gap between academic innovation and industry needs. It\'s a game-changer for the startup ecosystem in Tamil Nadu. The platform has helped us identify and mentor numerous promising startups.',
    rating: 5,
    category: 'STARTUP',
    sector: 'AgriTech',
    views: '2.9K',
    likes: 189,
    comments: 32,
    featured: false
  },
  {
    id: 4,
    name: 'Meera Sharma',
    role: 'Startup Founder',
    company: 'EcoTech Solutions',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Thanks to Catalyseed, our startup gained visibility and connected with the right mentors and investors. The platform is a catalyst for innovation and entrepreneurship in Tamil Nadu.',
    rating: 5,
    category: 'STARTUP',
    sector: 'CleanTech',
    views: '5.1K',
    likes: 298,
    comments: 67,
    featured: false
  },
  {
    id: 5,
    name: 'Karthik Raman',
    role: 'Innovation Head',
    company: 'Government of Tamil Nadu',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Catalyseed aligns perfectly with our vision of making Tamil Nadu a startup hub. The platform showcases the state\'s innovation potential and helps in policy formulation for better startup support.',
    rating: 5,
    category: 'STARTUP',
    sector: 'EdTech',
    views: '6.3K',
    likes: 445,
    comments: 89,
    featured: false
  },
  // Additional testimonials for pagination
  {
    id: 6,
    name: 'Sanjay Gupta',
    role: 'Venture Capitalist',
    company: 'Matrix Partners',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The startup ecosystem in Tamil Nadu is thriving, and Catalyseed provides excellent visibility into this vibrant community. We\'ve discovered several investment opportunities through this platform.',
    rating: 5,
    category: 'FINANCE',
    sector: 'FinTech',
    views: '3.5K',
    likes: 167,
    comments: 28,
    featured: false
  },
  {
    id: 7,
    name: 'Lakshmi Narayanan',
    role: 'Startup Mentor',
    company: 'TiE Chennai',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'As a mentor, Catalyseed helps me stay connected with the latest innovations from academic institutions. The platform bridges the gap between academia and industry beautifully.',
    rating: 5,
    category: 'EDUCATION',
    sector: 'EdTech',
    views: '2.7K',
    likes: 134,
    comments: 19,
    featured: false
  },
  {
    id: 8,
    name: 'Ravi Kumar',
    role: 'Startup Accelerator Head',
    company: 'NASSCOM 10000 Startups',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Catalyseed is an excellent resource for discovering emerging talent and innovative solutions from Tamil Nadu\'s educational institutions. It\'s become an essential tool for our scouting efforts.',
    rating: 5,
    category: 'STARTUP',
    sector: 'AgriTech',
    views: '4.1K',
    likes: 201,
    comments: 35,
    featured: false
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedTestimonials, setLikedTestimonials] = useState<Set<number>>(new Set());
  const [floatingIcons, setFloatingIcons] = useState<Array<{id: number, icon: any, x: number, y: number, delay: number}>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [sortBy, setSortBy] = useState<'rating' | 'popularity' | 'recent'>('popularity');

  const {
    searchTerm,
    selectedCategory,
    selectedSector,
    selectedStatus
  } = useFilters();

  // Generate floating icons
  useEffect(() => {
    const icons = [Quote, Star, MessageSquare, Award, Sparkles];
    const newFloatingIcons = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setFloatingIcons(newFloatingIcons);
  }, []);

  const filteredTestimonials = testimonials.filter(t => {
    const matchesSearch = searchTerm === '' || 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSector = selectedSector === 'all' || t.sector === selectedSector;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'featured' && t.featured);
    
    return matchesSearch && matchesCategory && matchesSector && matchesStatus;
  });

  // Sort testimonials
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return parseInt(b.views.replace('K', '000').replace('.', '')) - parseInt(a.views.replace('K', '000').replace('.', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return b.id - a.id;
    }
  });

  const featuredTestimonial = sortedTestimonials.find(t => t.featured) || sortedTestimonials[0];
  const regularTestimonials = sortedTestimonials.filter(t => !t.featured || t.id !== featuredTestimonial?.id);

  // Pagination
  const totalPages = Math.ceil(regularTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonials = regularTestimonials.slice(startIndex, startIndex + itemsPerPage);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleLike = (testimonialId: number) => {
    setLikedTestimonials(prev => {
      const newSet = new Set(prev);
      if (newSet.has(testimonialId)) {
        newSet.delete(testimonialId);
      } else {
        newSet.add(testimonialId);
      }
      return newSet;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="py-12 bg-white relative overflow-hidden">
      {/* Floating Background Icons */}
      {floatingIcons.map(({ id, icon: Icon, x, y, delay }) => (
        <div
          key={id}
          className="absolute opacity-5 text-purple-500 pointer-events-none"
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
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-600 text-sm font-semibold mb-4 hover:bg-purple-200 transition-colors cursor-pointer group">
            <MessageSquare className="h-4 w-4 mr-2 group-hover:animate-bounce" />
            <span>Testimonials</span>
            <Quote className="h-4 w-4 ml-2 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer">What Ecosystem</span>{' '}
            <span className="text-red-600 inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.1s' }}>Leaders Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Hear from incubators, accelerators, investors, and entrepreneurs
          </p>
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Showing {paginatedTestimonials.length} of {filteredTestimonials.length} testimonials</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
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
              <option value={6}>6 per page</option>
              <option value={8}>8 per page</option>
              <option value={12}>12 per page</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'popularity' | 'recent')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
              <option value="recent">Sort by Recent</option>
            </select>

            {/* Results Info */}
            <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {/* Featured Testimonial */}
        {featuredTestimonial && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="lg:flex">
                <div className="lg:w-1/3">
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img 
                      src={featuredTestimonial.image} 
                      alt={featuredTestimonial.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                    
                    {/* Animated Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse hover:animate-bounce transition-all duration-300">
                        FEATURED REVIEW
                      </span>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleLike(featuredTestimonial.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                          likedTestimonials.has(featuredTestimonial.id) 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedTestimonials.has(featuredTestimonial.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Animated Rating and Name */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex mb-2">
                        {[...Array(featuredTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                      <h3 className="font-bold text-lg group-hover:animate-bounce-subtle">
                        {featuredTestimonial.name}
                      </h3>
                      <p className="text-sm opacity-90">{featuredTestimonial.role}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Quote className="h-6 w-6 text-red-600 mr-2 animate-bounce" />
                      <div className="flex">
                        {[...Array(featuredTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current hover:animate-spin cursor-pointer" style={{ animationDuration: '2s' }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-lg text-gray-700 mb-4 leading-relaxed italic hover:text-gray-900 transition-colors duration-300">
                    "{featuredTestimonial.content}"
                  </blockquote>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                        {featuredTestimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-300">
                        {featuredTestimonial.role}
                      </p>
                      <p className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors duration-300">
                        {featuredTestimonial.company}
                      </p>
                    </div>
                    <div className="flex space-x-3 text-sm text-gray-500">
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Eye className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                        <span>{featuredTestimonial.views}</span>
                      </div>
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Heart className={`h-4 w-4 mr-1 group-hover:animate-pulse ${likedTestimonials.has(featuredTestimonial.id) ? 'fill-current text-red-500' : ''}`} />
                        <span>{featuredTestimonial.likes + (likedTestimonials.has(featuredTestimonial.id) ? 1 : 0)}</span>
                      </div>
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <MessageSquare className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                        <span>{featuredTestimonial.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
                      Featured testimonial from our ecosystem partners
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={prevTestimonial}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-500 px-2">
                        {currentIndex + 1} / {filteredTestimonials.length}
                      </span>
                      <button 
                        onClick={nextTestimonial}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'} mb-8`}>
          {paginatedTestimonials.map((testimonial, index) => (
            <article 
              key={testimonial.id} 
              className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 group ${
                index === currentIndex ? 'ring-2 ring-red-500 bg-red-50' : ''
              } ${viewMode === 'list' ? 'flex' : ''}`}
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-40'}`}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                
                {/* Floating Like Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(testimonial.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                      likedTestimonials.has(testimonial.id) 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${likedTestimonials.has(testimonial.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Animated Rating and Name */}
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <h3 className="font-bold text-sm group-hover:animate-bounce-subtle">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs opacity-90">{testimonial.role}</p>
                </div>
              </div>

              <div className="p-4 flex-1">
                <p className="text-xs text-gray-700 mb-3 leading-relaxed line-clamp-3 hover:text-gray-900 transition-colors duration-300">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-red-600 font-medium hover:text-red-700 transition-colors duration-300">
                    {testimonial.company}
                  </div>
                  <div className="flex space-x-2 text-xs text-gray-500">
                    <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Eye className="h-3 w-3 mr-1 group-hover:animate-pulse" />
                      <span>{testimonial.views}</span>
                    </div>
                    <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                      <Heart className={`h-3 w-3 mr-1 group-hover:animate-pulse ${likedTestimonials.has(testimonial.id) ? 'fill-current text-red-500' : ''}`} />
                      <span>{testimonial.likes + (likedTestimonials.has(testimonial.id) ? 1 : 0)}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive CTA Button */}
                <button className="w-full bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-all duration-300 text-xs font-medium transform hover:scale-105 relative overflow-hidden group">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                  
                  <span className="relative">Read Full Review</span>
                </button>
              </div>

              {/* Hover Glow Effect */}
              {hoveredCard === testimonial.id && (
                <div className="absolute inset-0 rounded-xl bg-purple-500/20 opacity-50 blur-xl -z-10 animate-pulse"></div>
              )}
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border shadow-sm">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, regularTestimonials.length)} of {regularTestimonials.length} testimonials
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

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 animate-bounce">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No testimonials found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;