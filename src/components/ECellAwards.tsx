import React, { useState, useEffect } from 'react';
import { Trophy, Star, Calendar, Award, Crown, Medal, Target, Zap, Users, TrendingUp, Eye, Heart, Sparkles, ChevronLeft, ChevronRight, Grid, List, Filter } from 'lucide-react';
import { useFilters } from './GlobalFilter';

const awards = [
  {
    id: 1,
    title: 'Outstanding Innovation Award',
    description: 'Recognizing E-Cells that foster groundbreaking innovations and breakthrough technologies in their startup ecosystem.',
    icon: Crown,
    category: 'TECHNOLOGY',
    sector: 'AgriTech',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 12,
    prize: '₹5 Lakhs',
    criteria: ['Innovation Score > 90%', 'Patent Applications Filed', 'Tech Breakthrough Projects', 'Industry Recognition'],
    featured: true,
    views: '3.2K',
    likes: 245
  },
  {
    id: 2,
    title: 'Community Impact Excellence',
    description: 'For E-Cells creating significant social impact and driving community development through entrepreneurship.',
    icon: Users,
    category: 'STARTUP',
    sector: 'EdTech',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 8,
    prize: '₹3 Lakhs',
    criteria: ['Social Impact Score', 'Community Reach', 'Sustainability Projects', 'Local Partnerships'],
    featured: false,
    views: '2.1K',
    likes: 156
  },
  {
    id: 3,
    title: 'Startup Success Champion',
    description: 'Awarded to E-Cells with the highest startup success rate and proven track record of creating unicorn potential ventures.',
    icon: TrendingUp,
    category: 'STARTUP',
    sector: 'FinTech',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 15,
    prize: '₹7 Lakhs',
    criteria: ['Success Rate > 80%', 'Total Funding Raised', 'Market Validation', 'Scalability Metrics'],
    featured: false,
    views: '4.5K',
    likes: 312
  },
  {
    id: 4,
    title: 'Digital Excellence Award',
    description: 'Recognizing E-Cells leading in digital transformation and innovative technology adoption in entrepreneurship education.',
    icon: Zap,
    category: 'TECHNOLOGY',
    sector: 'EdTech',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 10,
    prize: '₹4 Lakhs',
    criteria: ['Digital Platform Usage', 'Tech Integration', 'Online Presence', 'Innovation Tools'],
    featured: false,
    views: '1.8K',
    likes: 89
  },
  {
    id: 5,
    title: 'Rising Star E-Cell',
    description: 'For emerging E-Cells showing exceptional growth potential and innovative approaches to entrepreneurship development.',
    icon: Star,
    category: 'EDUCATION',
    sector: 'EdTech',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 20,
    prize: '₹2 Lakhs',
    criteria: ['Growth Rate', 'Innovation Pipeline', 'Future Potential', 'Student Engagement'],
    featured: false,
    views: '2.7K',
    likes: 178
  },
  {
    id: 6,
    title: 'Mentorship Excellence',
    description: 'Awarded for outstanding mentorship programs and guidance systems that nurture successful entrepreneurs.',
    icon: Target,
    category: 'EDUCATION',
    sector: 'EdTech',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 6,
    prize: '₹3.5 Lakhs',
    criteria: ['Mentor Network Quality', 'Success Stories', 'Program Effectiveness', 'Industry Connections'],
    featured: false,
    views: '1.9K',
    likes: 134
  },
  // Additional awards for pagination
  {
    id: 7,
    title: 'Sustainability Champion',
    description: 'Recognizing E-Cells promoting sustainable entrepreneurship and environmental consciousness.',
    icon: Medal,
    category: 'TECHNOLOGY',
    sector: 'CleanTech',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 9,
    prize: '₹2.5 Lakhs',
    criteria: ['Sustainability Projects', 'Environmental Impact', 'Green Innovation', 'Carbon Footprint'],
    featured: false,
    views: '1.6K',
    likes: 98
  },
  {
    id: 8,
    title: 'Women Entrepreneurship Award',
    description: 'Celebrating E-Cells that excel in promoting and supporting women entrepreneurs.',
    icon: Crown,
    category: 'STARTUP',
    sector: 'EdTech',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    winners: 14,
    prize: '₹3 Lakhs',
    criteria: ['Women Participation', 'Gender Diversity', 'Support Programs', 'Success Rate'],
    featured: false,
    views: '2.3K',
    likes: 187
  }
];

const ECellAwards: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedAwards, setLikedAwards] = useState<Set<number>>(new Set());
  const [floatingIcons, setFloatingIcons] = useState<Array<{id: number, icon: any, x: number, y: number, delay: number}>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState<'prize' | 'popularity' | 'winners'>('prize');

  const {
    searchTerm,
    selectedCategory,
    selectedSector,
    selectedStatus
  } = useFilters();

  // Generate floating icons
  useEffect(() => {
    const icons = [Trophy, Crown, Award, Star, Medal, Sparkles];
    const newFloatingIcons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setFloatingIcons(newFloatingIcons);
  }, []);

  const filteredAwards = awards.filter(a => {
    const matchesSearch = searchTerm === '' || 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSector = selectedSector === 'all' || a.sector === selectedSector;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'featured' && a.featured);
    
    return matchesSearch && matchesCategory && matchesSector && matchesStatus;
  });

  // Sort awards
  const sortedAwards = [...filteredAwards].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return parseInt(b.views.replace('K', '000').replace('.', '')) - parseInt(a.views.replace('K', '000').replace('.', ''));
      case 'winners':
        return b.winners - a.winners;
      case 'prize':
      default:
        return parseInt(b.prize.replace('₹', '').replace(' Lakhs', '')) - parseInt(a.prize.replace('₹', '').replace(' Lakhs', ''));
    }
  });

  const featuredAward = sortedAwards.find(a => a.featured) || sortedAwards[0];
  const regularAwards = sortedAwards.filter(a => !a.featured || a.id !== featuredAward?.id);

  // Pagination
  const totalPages = Math.ceil(regularAwards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAwards = regularAwards.slice(startIndex, startIndex + itemsPerPage);

  const handleLike = (awardId: number) => {
    setLikedAwards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(awardId)) {
        newSet.delete(awardId);
      } else {
        newSet.add(awardId);
      }
      return newSet;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('awards')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="awards" className="py-12 bg-gray-50 relative overflow-hidden">
      {/* Floating Background Icons */}
      {floatingIcons.map(({ id, icon: Icon, x, y, delay }) => (
        <div
          key={id}
          className="absolute opacity-5 text-yellow-500 pointer-events-none"
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
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-yellow-600 text-sm font-semibold mb-4 hover:bg-yellow-200 transition-colors cursor-pointer group">
            <Trophy className="h-4 w-4 mr-2 group-hover:animate-bounce" />
            <span>Awards 2024</span>
            <Crown className="h-4 w-4 ml-2 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            <span className="inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer">Best E-Cell</span>{' '}
            <span className="text-red-600 inline-block hover:animate-bounce-subtle transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.1s' }}>Awards 2024</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Recognizing excellence in entrepreneurship education across Tamil Nadu
          </p>
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span>Showing {paginatedAwards.length} of {filteredAwards.length} awards</span>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
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
              onChange={(e) => setSortBy(e.target.value as 'prize' | 'popularity' | 'winners')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
            >
              <option value="prize">Sort by Prize Money</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="winners">Sort by Winners</option>
            </select>

            {/* Results Info */}
            <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {/* Featured Award */}
        {featuredAward && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img 
                      src={featuredAward.image} 
                      alt={featuredAward.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                    
                    {/* Animated Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse hover:animate-bounce transition-all duration-300">
                        FEATURED AWARD
                      </span>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleLike(featuredAward.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                          likedAwards.has(featuredAward.id) 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedAwards.has(featuredAward.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Animated Award Info */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center mb-2">
                        <Crown className="h-6 w-6 mr-2 animate-bounce" />
                        <span className="text-lg font-bold">Top Prize</span>
                      </div>
                      <h3 className="text-lg font-bold group-hover:animate-bounce-subtle">
                        {featuredAward.title}
                      </h3>
                    </div>

                    {/* Rotating Prize Badge */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-green-600 text-white px-3 py-2 rounded-full text-sm font-bold transform hover:rotate-12 transition-transform duration-300 cursor-pointer">
                        <Trophy className="h-4 w-4 inline mr-1 animate-bounce" />
                        {featuredAward.prize}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Crown className="h-6 w-6 text-red-600 mr-2 animate-bounce" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                          {featuredAward.title}
                        </h3>
                        <p className="text-sm text-gray-600">Premium Recognition</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600 hover:animate-pulse cursor-pointer">
                        {featuredAward.prize}
                      </p>
                      <p className="text-sm text-gray-500">Prize Money</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed hover:text-gray-800 transition-colors duration-300">
                    {featuredAward.description}
                  </p>

                  {/* Interactive Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="text-center p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-300 cursor-pointer group">
                      <div className="font-bold text-red-600 group-hover:animate-pulse">{featuredAward.winners}</div>
                      <div className="text-gray-600 text-xs">Winners</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300 cursor-pointer group">
                      <div className="font-bold text-green-600 group-hover:animate-pulse">{featuredAward.prize}</div>
                      <div className="text-gray-600 text-xs">Prize Pool</div>
                    </div>
                  </div>

                  {/* Animated Criteria */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <Award className="h-4 w-4 mr-2 animate-bounce" />
                      Selection Criteria
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {featuredAward.criteria.map((criterion, index) => (
                        <div key={index} className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></div>
                          <span className="text-xs text-gray-600 group-hover:text-red-600">{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Stats with Animations */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-3 text-sm text-gray-500">
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Eye className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                        <span>{featuredAward.views}</span>
                      </div>
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Heart className={`h-4 w-4 mr-1 group-hover:animate-pulse ${likedAwards.has(featuredAward.id) ? 'fill-current text-red-500' : ''}`} />
                        <span>{featuredAward.likes + (likedAwards.has(featuredAward.id) ? 1 : 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive CTA Button */}
                  <button className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                    
                    <span className="relative">Apply for This Award</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Awards Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} mb-8`}>
          {paginatedAwards.map((award) => {
            const IconComponent = award.icon;
            return (
              <article
                key={award.id}
                className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 group ${
                  selectedAward === award.id ? 'ring-2 ring-red-500 bg-red-50' : ''
                } ${viewMode === 'list' ? 'flex' : ''}`}
                onClick={() => setSelectedAward(selectedAward === award.id ? null : award.id)}
                onMouseEnter={() => setHoveredCard(award.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-40'}`}>
                  <img 
                    src={award.image} 
                    alt={award.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                  
                  {/* Animated Icon */}
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full group-hover:animate-bounce">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Floating Like Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(award.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                        likedAwards.has(award.id) 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${likedAwards.has(award.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Animated Title */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-sm mb-1 group-hover:animate-bounce-subtle">
                      {award.title}
                    </h3>
                    <p className="text-xs opacity-90">{award.prize} Prize</p>
                  </div>

                  {/* Rotating Prize Badge */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold transform hover:rotate-12 transition-transform duration-300">
                      <Trophy className="h-3 w-3 inline mr-1 animate-bounce" />
                      {award.prize}
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1">
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2 hover:text-gray-800 transition-colors duration-300">
                    {award.description}
                  </p>

                  {/* Interactive Stats */}
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="text-center hover:bg-red-50 p-1 rounded transition-colors duration-300 cursor-pointer group">
                      <div className="font-bold text-red-600 text-sm group-hover:animate-pulse">{award.winners}</div>
                      <div className="text-gray-500 text-xs">Winners</div>
                    </div>
                    <div className="text-center hover:bg-green-50 p-1 rounded transition-colors duration-300 cursor-pointer group">
                      <div className="font-bold text-green-600 text-sm group-hover:animate-pulse">{award.prize}</div>
                      <div className="text-gray-500 text-xs">Prize</div>
                    </div>
                    <div className="flex space-x-2 text-xs text-gray-500">
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Eye className="h-3 w-3 mr-1 group-hover:animate-pulse" />
                        <span>{award.views}</span>
                      </div>
                      <div className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                        <Heart className={`h-3 w-3 mr-1 group-hover:animate-pulse ${likedAwards.has(award.id) ? 'fill-current text-red-500' : ''}`} />
                        <span>{award.likes + (likedAwards.has(award.id) ? 1 : 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Criteria */}
                  {selectedAward === award.id && (
                    <div className="pt-3 border-t border-gray-200 mb-3 animate-slide-down">
                      <h4 className="font-medium text-xs text-gray-900 mb-2 flex items-center">
                        <Award className="h-3 w-3 mr-1 animate-bounce" />
                        Selection Criteria:
                      </h4>
                      <div className="space-y-1">
                        {award.criteria.map((criterion, index) => (
                          <div key={index} className="flex items-center hover:text-red-600 transition-colors duration-300 cursor-pointer group">
                            <div className="w-1 h-1 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></div>
                            <span className="text-xs text-gray-600 group-hover:text-red-600">{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive CTA Button */}
                  <button className="w-full bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-all duration-300 text-xs font-medium transform hover:scale-105 relative overflow-hidden group">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                    
                    <span className="relative">Learn More</span>
                  </button>
                </div>

                {/* Hover Glow Effect */}
                {hoveredCard === award.id && (
                  <div className="absolute inset-0 rounded-xl bg-yellow-500/20 opacity-50 blur-xl -z-10 animate-pulse"></div>
                )}
              </article>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border shadow-sm mb-8">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, regularAwards.length)} of {regularAwards.length} awards
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

        {/* Interactive Application Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-center mb-4 group">
            <Calendar className="h-5 w-5 mr-2 text-red-600 group-hover:animate-bounce" />
            <span className="text-lg font-semibold text-gray-900">Applications Open: March 1, 2024</span>
            <Sparkles className="h-5 w-5 ml-2 text-red-600 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors duration-300 cursor-pointer">
            Nominate Your E-Cell Today
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm leading-relaxed hover:text-gray-800 transition-colors duration-300">
            Showcase your entrepreneurship cell's achievements and compete for recognition as Tamil Nadu's best E-Cell.
          </p>

          {/* Interactive Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: Trophy, title: 'Recognition', desc: 'State-wide acknowledgment', color: 'yellow' },
              { icon: Award, title: 'Funding', desc: 'Up to ₹7 Lakhs prize money', color: 'green' },
              { icon: Users, title: 'Mentorship', desc: 'Access to industry experts', color: 'blue' }
            ].map(({ icon: Icon, title, desc, color }, index) => (
              <div key={index} className={`text-center p-3 bg-${color}-50 rounded-lg hover:bg-${color}-100 transition-colors duration-300 cursor-pointer group transform hover:scale-105`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-${color}-100 rounded-lg mb-2 group-hover:animate-bounce`}>
                  <Icon className={`h-5 w-5 text-${color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm group-hover:text-red-600 transition-colors duration-300">{title}</h4>
                <p className="text-xs text-gray-600">{desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <button className="bg-red-600 text-white py-2.5 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium text-sm transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
              
              <span className="relative">Submit Nomination</span>
            </button>
            <button className="border-2 border-gray-300 text-gray-700 py-2.5 px-6 rounded-lg hover:bg-gray-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 font-medium text-sm transform hover:scale-105">
              View Guidelines
            </button>
          </div>
        </div>

        {filteredAwards.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 animate-bounce">
              <Trophy className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No awards found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ECellAwards;