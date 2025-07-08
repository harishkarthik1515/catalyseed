import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Search, Filter } from 'lucide-react';
import ShareModal from './ShareModal';

const AllSuccessStories = () => {
  const [likedStories, setLikedStories] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [clickedStory, setClickedStory] = useState<number | null>(null);
  const [initialCategory, setInitialCategory] = useState('all');

  // Scroll to top on component mount and restore position on back
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Check URL parameters for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
      setActiveCategory(category);
      setInitialCategory(category);
    }
    
    // Clean up scroll position when component unmounts
    return () => {
      sessionStorage.removeItem('successStoriesScrollPosition');
    };
  }, []);

  const pinkZoneStories = [
    {
      id: 1,
      founder: "Ananya Sharma",
      company: "FemTech Innovations",
      institute: "IIT Madras",
      location: "Chennai",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Women-centric health monitoring platform using AI and wearable technology.",
      likes: 189,
      date: "2 days ago",
      tags: ["HealthTech", "AI", "Women Empowerment"],
      category: "pink-zone"
    },
    {
      id: 2,
      founder: "Meera Nair",
      company: "SafeSpace",
      institute: "Anna University",
      location: "Coimbatore",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Digital platform ensuring women's safety through real-time location sharing and emergency alerts.",
      likes: 267,
      date: "1 week ago",
      tags: ["Safety", "Mobile App", "Women Empowerment"],
      category: "pink-zone"
    },
    {
      id: 3,
      founder: "Kavya Reddy",
      company: "EmpowerHer",
      institute: "VIT Vellore",
      location: "Vellore",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Skill development platform connecting rural women with online job opportunities.",
      likes: 198,
      date: "3 days ago",
      tags: ["EdTech", "Women Empowerment", "Rural Development"],
      category: "pink-zone"
    }
  ];

  const campusStartups = [
    {
      id: 4,
      founder: "Arjun Patel",
      company: "CampusConnect",
      institute: "NIT Trichy",
      location: "Trichy",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Student networking platform connecting college students across Tamil Nadu for collaboration.",
      likes: 156,
      date: "5 days ago",
      tags: ["Social Network", "Students", "Collaboration"],
      category: "campus"
    },
    {
      id: 5,
      founder: "Priya Krishnan",
      company: "StudyBuddy",
      institute: "SASTRA University",
      location: "Thanjavur",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "AI-powered study companion helping students with personalized learning paths and peer tutoring.",
      likes: 234,
      date: "1 week ago",
      tags: ["EdTech", "AI", "Peer Learning"],
      category: "campus"
    },
    {
      id: 6,
      founder: "Karthik Subramanian",
      company: "CampusEats",
      institute: "PSG College",
      location: "Coimbatore",
      image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Food delivery platform exclusively for college campuses with student-friendly pricing.",
      likes: 145,
      date: "4 days ago",
      tags: ["Food Delivery", "Campus", "Student Services"],
      category: "campus"
    }
  ];

  const generalStories = [
    {
      id: 7,
      founder: "Rajesh Kumar",
      company: "GreenTech Solutions",
      institute: "CEG Anna University",
      location: "Chennai",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Sustainable technology solutions for waste management and renewable energy.",
      likes: 278,
      date: "6 days ago",
      tags: ["CleanTech", "Sustainability", "Waste Management"],
      category: "general"
    },
    {
      id: 8,
      founder: "Deepika Nair",
      company: "AgriTech Innovations",
      institute: "SSN College",
      location: "Chennai",
      image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Smart farming solutions using IoT sensors and machine learning for crop optimization.",
      likes: 312,
      date: "1 week ago",
      tags: ["AgriTech", "IoT", "Machine Learning"],
      category: "general"
    }
  ];

  const getAllStories = () => {
    return [...pinkZoneStories, ...campusStartups, ...generalStories];
  };

  const getFilteredStories = () => {
    let stories = [];
    
    if (activeCategory === 'all') {
      stories = getAllStories();
    } else if (activeCategory === 'pink-zone') {
      stories = pinkZoneStories;
    } else if (activeCategory === 'campus') {
      stories = campusStartups;
    }

    return stories.filter(story => {
      const matchesSearch = story.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || story.category === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  };

  const categories = [
    { value: 'all', label: 'All Stories' },
    { value: 'pink-zone', label: 'Pink Zone' },
    { value: 'campus', label: 'Campus Startups' },
    { value: 'general', label: 'General' }
  ];

  const filteredStories = getFilteredStories();
  const allStories = getAllStories();

  const toggleLike = (storyId) => {
    setLikedStories(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId);
      } else {
        newLiked.add(storyId);
      }
      return newLiked;
    });
  };

  const handleShare = (story) => {
    setSelectedStory(story);
    setShareModalOpen(true);
  };

  const handleMouseEnter = (storyId: number) => {
    setExpandedStory(storyId);
  };

  const handleMouseLeave = () => {
    setExpandedStory(null);
  };

  const handleCardClick = (storyId: number) => {
    if (clickedStory === storyId) {
      setClickedStory(null);
    } else {
      setClickedStory(storyId);
    }
  };

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
            onClick={() => {
              // Restore scroll position when going back
              const scrollPosition = sessionStorage.getItem('successStoriesScrollPosition');
              if (scrollPosition) {
                setTimeout(() => {
                  window.scrollTo({ top: parseInt(scrollPosition), behavior: 'smooth' });
                }, 100);
              }
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            All Success Stories
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Discover inspiring journeys from Tamil Nadu's entrepreneurial ecosystem
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
            {[
              { id: 'all', label: 'All Stories', dataCategory: 'all' },
              { id: 'pink-zone', label: 'Pink Zone', dataCategory: 'pink-zone' },
              { id: 'campus', label: 'Campus Startups', dataCategory: 'campus' }
            ].map((category) => (
              <button
                key={category.id}
                data-category={category.dataCategory}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredStories.length} of {allStories.length} stories
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6" onMouseLeave={handleMouseLeave}>
          {filteredStories.map((story) => (
            <div 
              key={story.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out ${
                expandedStory === story.id || clickedStory === story.id ? 'sm:col-span-2 lg:col-span-2 xl:col-span-2 z-10 transform scale-105' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(story.id)}
              onClick={() => handleCardClick(story.id)}
            >
              {/* Story Header */}
              <div className="p-3 lg:p-4 flex items-center space-x-3">
                <img
                  src={story.avatar}
                  alt={story.founder}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{story.founder}</h3>
                  <p className="text-xs lg:text-sm text-gray-600 truncate">{story.company}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{story.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {story.date}
                  </div>
                </div>
              </div>

              {/* Story Image */}
              <div className="relative">
                <img
                  src={story.image}
                  alt={story.company}
                  className="w-full h-40 lg:h-48 object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {story.institute}
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-3 lg:p-4 relative">
                <p className={`text-gray-600 mb-4 leading-relaxed text-sm ${
                  expandedStory === story.id || clickedStory === story.id ? '' : 'line-clamp-2'
                }`}>
                  {story.description}
                  {(expandedStory === story.id || clickedStory === story.id) && (
                    <span className="block mt-3 text-sm text-gray-700">
                      <strong>Founded by:</strong> {story.founder}<br />
                      <strong>Institute:</strong> {story.institute}<br />
                      <strong>Location:</strong> {story.location}<br />
                      <strong>Impact:</strong> This startup has been making significant progress in their field, 
                      attracting attention from investors and industry experts alike. Their innovative approach 
                      to solving real-world problems has positioned them as a leader in the Tamil Nadu startup ecosystem.
                    </span>
                  )}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {story.tags.slice(0, (expandedStory === story.id || clickedStory === story.id) ? story.tags.length : 2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {story.tags.length > 2 && !(expandedStory === story.id || clickedStory === story.id) && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{story.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Engagement - Only Like and Share */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleLike(story.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedStories.has(story.id) ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                      <span className="text-xs font-medium">
                        {story.likes + (likedStories.has(story.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleShare(story)}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        story={selectedStory}
        type="story"
      />
    </div>
  );
};

export default AllSuccessStories;