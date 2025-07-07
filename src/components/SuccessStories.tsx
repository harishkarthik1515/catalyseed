import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, Calendar, ArrowRight, Trophy, X, Download, Copy, Sparkles } from 'lucide-react';
import ShareModal from './ShareModal';

interface Story {
  id: number;
  founder: string;
  company: string;
  institute: string;
  location: string;
  image: string;
  avatar: string;
  description: string;
  likes: number;
  comments: number;
  date: string;
  tags: string[];
}

const SuccessStories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      founder: "Priya Krishnan",
      company: "EduTech Solutions",
      institute: "IIT Madras",
      location: "Chennai",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Revolutionary AI-powered learning platform transforming education in rural Tamil Nadu schools.",
      likes: 234,
      comments: 45,
      date: "2 days ago",
      tags: ["EdTech", "AI", "Rural Education"]
    },
    {
      id: 2,
      founder: "Arjun Patel",
      company: "AgriBot",
      institute: "Anna University",
      location: "Coimbatore",
      image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Smart farming robots helping farmers increase crop yield by 40% using IoT and machine learning.",
      likes: 189,
      comments: 32,
      date: "1 week ago",
      tags: ["AgriTech", "IoT", "Robotics"]
    },
    {
      id: 3,
      founder: "Meera Sharma",
      company: "HealthLink",
      institute: "VIT Vellore",
      location: "Vellore",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Telemedicine platform connecting rural patients with specialists, serving 50,000+ patients.",
      likes: 312,
      comments: 67,
      date: "3 days ago",
      tags: ["HealthTech", "Telemedicine", "Rural Healthcare"]
    },
    {
      id: 4,
      founder: "Rajesh Kumar",
      company: "GreenEnergy",
      institute: "NIT Trichy",
      location: "Trichy",
      image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Solar-powered micro-grids bringing clean energy to remote villages across Tamil Nadu.",
      likes: 156,
      comments: 28,
      date: "5 days ago",
      tags: ["CleanTech", "Solar", "Rural Energy"]
    },
    {
      id: 5,
      founder: "Kavya Reddy",
      company: "FinFlow",
      institute: "SASTRA University",
      location: "Thanjavur",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Digital banking solution for rural communities with offline transaction capabilities.",
      likes: 278,
      comments: 52,
      date: "1 week ago",
      tags: ["FinTech", "Rural Banking", "Digital Payments"]
    },
    {
      id: 6,
      founder: "Arun Vijay",
      company: "SmartLogistics",
      institute: "PSG College",
      location: "Coimbatore",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "AI-driven supply chain optimization platform reducing logistics costs by 30%.",
      likes: 145,
      comments: 23,
      date: "4 days ago",
      tags: ["Logistics", "AI", "Supply Chain"]
    },
    {
      id: 7,
      founder: "Deepika Nair",
      company: "EcoWaste",
      institute: "CEG Anna University",
      location: "Chennai",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Waste management platform using IoT sensors to optimize collection routes.",
      likes: 198,
      comments: 34,
      date: "6 days ago",
      tags: ["WasteTech", "IoT", "Sustainability"]
    },
    {
      id: 8,
      founder: "Karthik Subramanian",
      company: "CodeCraft",
      institute: "SSN College",
      location: "Chennai",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      avatar: "https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=150",
      description: "Interactive coding platform making programming education accessible to rural students.",
      likes: 267,
      comments: 41,
      date: "1 week ago",
      tags: ["EdTech", "Programming", "Rural Education"]
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleViewMore = () => {
    sessionStorage.setItem('successStoriesScrollPosition', window.pageYOffset.toString());
  };

  const toggleLike = (storyId: number) => {
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

  const handleShare = (story: Story) => {
    setSelectedStory(story);
    setShareModalOpen(true);
  };

  return (
    <section id="success-stories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 group">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
              <p className="text-gray-600 mt-1">Inspiring journeys of entrepreneurs who transformed ideas into impactful startups</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View More Button */}
            <Link 
              to="/success-stories"
              onClick={handleViewMore}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group"
            >
              <span>View More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-purple-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-purple-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 mx-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 w-80 h-[520px] group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  {/* Story Header */}
                  <div className="p-3 flex items-center space-x-3 flex-shrink-0">
                    <img
                      src={story.avatar}
                      alt={story.founder}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{story.founder}</h3>
                      <p className="text-sm text-gray-600 truncate">{story.company}</p>
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
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={story.image}
                      alt={story.company}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {story.institute}
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-gray-800 mb-3 leading-relaxed text-sm line-clamp-3">{story.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {story.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {story.tags.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{story.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Engagement - Only Like and Share */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleLike(story.id);
                          }}
                          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group/like"
                        >
                          <Heart 
                            className={`w-4 h-4 transition-all duration-200 ${
                              likedStories.has(story.id) 
                                ? 'fill-red-500 text-red-500 scale-110' 
                                : 'group-hover/like:scale-110'
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
              </div>
            ))}
            
            {/* View More Card */}
            <div className="flex-shrink-0 w-80 h-[520px] group cursor-pointer">
              <Link 
                to="/success-stories"
                onClick={handleViewMore}
                className="block h-full"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-purple-400 relative overflow-hidden">
                  <div className="text-center p-8">
                    {/* Animated Arrow Container */}
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      {/* Arrow that moves to the right on hover */}
                      <ArrowRight className="w-8 h-8 text-white transform transition-transform duration-500 ease-out group-hover:translate-x-8" />
                      {/* Second arrow that comes from the left on hover */}
                      <ArrowRight className="w-8 h-8 text-white absolute transform -translate-x-8 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">View More</h3>
                    <p className="text-gray-600">Discover more inspiring journeys</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        story={selectedStory}
        type="story"
      />
    </section>
  );
};

export default SuccessStories;