import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Clock, Search, Filter } from 'lucide-react';

const AllHackathons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedHackathon, setExpandedHackathon] = useState<number | null>(null);
  const [clickedHackathon, setClickedHackathon] = useState<number | null>(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return () => {
      sessionStorage.removeItem('hackathonsScrollPosition');
    };
  }, []);

  const allHackathons = [
    {
      id: 1,
      title: "Smart Cities Hackathon 2024",
      organizer: "IIT Madras",
      location: "Chennai",
      date: "March 15-17, 2024",
      participants: 500,
      prizePool: "₹5 Lakhs",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Registration Open",
      theme: "Urban Innovation",
      description: "Build solutions for smart transportation, waste management, and energy efficiency in urban areas.",
      tags: ["Smart Cities", "IoT", "Sustainability"],
      deadline: "5 days left",
      category: "smartcities"
    },
    {
      id: 2,
      title: "AgriTech Innovation Challenge",
      organizer: "Anna University",
      location: "Coimbatore",
      date: "April 22-24, 2024",
      participants: 300,
      prizePool: "₹3 Lakhs",
      image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Coming Soon",
      theme: "Future of Farming",
      description: "Develop AI-powered solutions for precision agriculture and sustainable farming practices.",
      tags: ["AgriTech", "AI", "Sustainability"],
      deadline: "Opens in 2 weeks",
      category: "agritech"
    },
    {
      id: 3,
      title: "HealthTech Hackathon",
      organizer: "VIT Vellore",
      location: "Vellore",
      date: "May 10-12, 2024",
      participants: 400,
      prizePool: "₹4 Lakhs",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Registration Open",
      theme: "Healthcare Innovation",
      description: "Create digital health solutions for rural healthcare access and medical diagnostics.",
      tags: ["HealthTech", "Telemedicine", "Rural Health"],
      deadline: "12 days left",
      category: "healthtech"
    },
    {
      id: 4,
      title: "FinTech Revolution",
      organizer: "NIT Trichy",
      location: "Trichy",
      date: "June 5-7, 2024",
      participants: 350,
      prizePool: "₹6 Lakhs",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Coming Soon",
      theme: "Digital Banking",
      description: "Revolutionize financial services with blockchain, AI, and mobile-first solutions.",
      tags: ["FinTech", "Blockchain", "Mobile Banking"],
      deadline: "Opens in 1 month",
      category: "fintech"
    },
    {
      id: 5,
      title: "CleanTech Challenge",
      organizer: "SASTRA University",
      location: "Thanjavur",
      date: "July 8-10, 2024",
      participants: 280,
      prizePool: "₹4.5 Lakhs",
      image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Coming Soon",
      theme: "Sustainable Future",
      description: "Innovate clean energy solutions and environmental sustainability technologies.",
      tags: ["CleanTech", "Environment", "Sustainability"],
      deadline: "Opens in 6 weeks",
      category: "cleantech"
    },
    {
      id: 6,
      title: "EdTech Innovation Summit",
      organizer: "PSG College",
      location: "Coimbatore",
      date: "August 12-14, 2024",
      participants: 450,
      prizePool: "₹5.5 Lakhs",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Coming Soon",
      theme: "Future of Learning",
      description: "Transform education with AI, VR/AR, and personalized learning technologies.",
      tags: ["EdTech", "AI", "VR/AR"],
      deadline: "Opens in 2 months",
      category: "edtech"
    },
    {
      id: 7,
      title: "Blockchain Innovation Lab",
      organizer: "CEG Anna University",
      location: "Chennai",
      date: "September 15-17, 2024",
      participants: 320,
      prizePool: "₹4 Lakhs",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Coming Soon",
      theme: "Decentralized Future",
      description: "Build decentralized applications and explore blockchain use cases for social impact.",
      tags: ["Blockchain", "DeFi", "Web3"],
      deadline: "Opens in 3 months",
      category: "blockchain"
    },
    {
      id: 8,
      title: "IoT & Robotics Challenge",
      organizer: "SSN College",
      location: "Chennai",
      date: "October 20-22, 2024",
      participants: 380,
      prizePool: "₹5 Lakhs",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      status: "Coming Soon",
      theme: "Connected World",
      description: "Create IoT solutions and robotic systems for industrial automation and smart homes.",
      tags: ["IoT", "Robotics", "Automation"],
      deadline: "Opens in 4 months",
      category: "iot"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Hackathons' },
    { value: 'smartcities', label: 'Smart Cities' },
    { value: 'agritech', label: 'AgriTech' },
    { value: 'healthtech', label: 'HealthTech' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'cleantech', label: 'CleanTech' },
    { value: 'edtech', label: 'EdTech' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'IoT & Robotics' }
  ];

  const filteredHackathons = allHackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || hackathon.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleMouseEnter = (hackathonId: number) => {
    // Remove hover expansion - now only click-based
  };

  const handleMouseLeave = () => {
    // Remove hover expansion - now only click-based
  };

  const handleCardClick = (hackathonId: number) => {
    if (clickedHackathon === hackathonId) {
      setClickedHackathon(null);
      setExpandedHackathon(null);
    } else {
      setClickedHackathon(hackathonId);
      setExpandedHackathon(hackathonId);
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
              const scrollPosition = sessionStorage.getItem('hackathonsScrollPosition');
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
            All Hackathons
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Discover exciting hackathons and innovation challenges across Tamil Nadu
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search hackathons..."
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
            Showing {filteredHackathons.length} of {allHackathons.length} hackathons
          </p>
        </div>

        {/* Hackathons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out group ${
                clickedHackathon === hackathon.id ? 'sm:col-span-2 lg:col-span-2 xl:col-span-2 z-10 transform scale-105' : ''
              }`}
              onClick={() => handleCardClick(hackathon.id)}
            >
              {/* Hackathon Image */}
              <div className="relative">
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-40 lg:h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    hackathon.status === 'Registration Open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {hackathon.status}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {hackathon.theme}
                  </div>
                </div>
              </div>

              {/* Hackathon Content */}
              <div className="p-4 relative">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {hackathon.title}
                </h3>
                <p className={`text-sm text-gray-600 mb-3 leading-relaxed ${
                  clickedHackathon === hackathon.id ? '' : 'line-clamp-3'
                }`}>
                  {hackathon.description}
                  {clickedHackathon === hackathon.id && (
                    <span className="block mt-3 text-sm text-gray-700">
                      <strong>Organizer:</strong> {hackathon.organizer}<br />
                      <strong>Theme:</strong> {hackathon.theme}<br />
                      <strong>Eligibility:</strong> Open to all students and professionals<br />
                      <strong>Requirements:</strong> Participants should bring their own laptops and necessary equipment. 
                      Teams of 3-5 members are recommended. Prior experience with the technology stack is beneficial but not mandatory.
                    </span>
                  )}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {hackathon.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {hackathon.tags.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{hackathon.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Hackathon Details */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span className="truncate">{hackathon.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 whitespace-nowrap">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{hackathon.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 whitespace-nowrap">
                    <Users className="w-3 h-3" />
                    <span className="truncate">{hackathon.participants}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 whitespace-nowrap">
                    <Trophy className="w-3 h-3" />
                    <span className="truncate">{hackathon.prizePool}</span>
                  </div>
                </div>

                {/* Deadline and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1 text-orange-600 whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">{hackathon.deadline}</span>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-xs whitespace-nowrap">
                    {hackathon.status === 'Registration Open' ? 'Register' : 'Notify'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hackathons found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHackathons;