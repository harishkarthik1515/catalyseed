import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Trophy, Clock, ArrowRight, Zap, Share2 } from 'lucide-react';
import ShareModal from './ShareModal';
import { useState, useRef, useEffect } from 'react';

interface Hackathon {
  id: number;
  title: string;
  organizer: string;
  location: string;
  date: string;
  participants: number;
  prizePool: string;
  image: string;
  status: string;
  theme: string;
  description: string;
  tags: string[];
  deadline: string;
}

const Hackathons = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedHackathon, setExpandedHackathon] = useState<number | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);

  const hackathons: Hackathon[] = [
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
      deadline: "5 days left"
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
      deadline: "Opens in 2 weeks"
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
      deadline: "12 days left"
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
      deadline: "Opens in 1 month"
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
      deadline: "Opens in 6 weeks"
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
      deadline: "Opens in 2 months"
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
      deadline: "Opens in 3 months"
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
      deadline: "Opens in 4 months"
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
    sessionStorage.setItem('hackathonsScrollPosition', window.pageYOffset.toString());
  };

  const handleShare = (hackathon: Hackathon) => {
    setSelectedHackathon(hackathon);
    setShareModalOpen(true);
  };

  const handleMouseEnter = (hackathonId: number) => {
    setExpandedHackathon(hackathonId);
  };

  const handleMouseLeave = () => {
    setExpandedHackathon(null);
  };

  return (
    <section id="hackathons" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 group">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Hackathons</h2>
              <p className="text-gray-600 mt-1">Join exciting hackathons and build innovative solutions with fellow entrepreneurs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View More Button */}
            <Link 
              to="/hackathons"
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
            onMouseLeave={handleMouseLeave}
          >
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className={`flex-shrink-0 group cursor-pointer transition-all duration-500 ease-in-out ${
                  expandedHackathon === hackathon.id ? 'w-[500px] z-10' : 'w-80'
                } h-[500px]`}
                onMouseEnter={() => handleMouseEnter(hackathon.id)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  {/* Hackathon Image */}
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img
                      src={hackathon.image}
                      alt={hackathon.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hackathon.status === 'Registration Open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hackathon.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {hackathon.theme}
                      </div>
                    </div>
                  </div>

                  {/* Hackathon Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">{hackathon.title}</h3>
                    <p className={`text-gray-600 mb-3 leading-relaxed text-sm ${
                      expandedHackathon === hackathon.id ? '' : 'line-clamp-2'
                    }`}>
                      {hackathon.description}
                      {expandedHackathon === hackathon.id && (
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
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{hackathon.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{hackathon.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{hackathon.participants} participants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4" />
                          <span className="text-sm font-semibold text-purple-600">{hackathon.prizePool}</span>
                        </div>
                      </div>
                    </div>

                    {/* Deadline and Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs font-medium">{hackathon.deadline}</span>
                        </div>
                        <button 
                          onClick={() => handleShare(hackathon)}
                          className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-sm transform hover:scale-105">
                        {hackathon.status === 'Registration Open' ? 'Register' : 'Notify'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* View More Card */}
            <div className="flex-shrink-0 w-80 h-[500px] group cursor-pointer">
              <Link 
                to="/hackathons"
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
                    <p className="text-gray-600">Discover more opportunities</p>
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
        hackathon={selectedHackathon}
        type="hackathon"
      />
    </section>
  );
};

export default Hackathons;