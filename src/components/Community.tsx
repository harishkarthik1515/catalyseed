import React, { useState } from 'react';
import { MessageSquare, Users, TrendingUp, Calendar, ChevronRight, Pin, Star, Plus, X, Send, Lightbulb, UserCheck, Briefcase, Target, ExternalLink, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [ideaFormData, setIdeaFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    lookingFor: ''
  });
  const { user } = useAuth();

  const forumPosts = [
    {
      id: 1,
      title: "How to validate your startup idea before building an MVP?",
      author: "Priya Krishnan",
      avatar: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100",
      replies: 24,
      views: 145,
      lastActivity: "2 hours ago",
      category: "Startup Advice",
      isPinned: true,
      tags: ["MVP", "Validation", "Startup"]
    },
    {
      id: 2,
      title: "Looking for co-founder with technical background in AI/ML",
      author: "Arjun Patel",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100",
      replies: 18,
      views: 89,
      lastActivity: "4 hours ago",
      category: "Co-founder Search",
      isPinned: false,
      tags: ["Co-founder", "AI", "ML"]
    },
    {
      id: 3,
      title: "Funding opportunities for EdTech startups in Tamil Nadu",
      author: "Meera Sharma",
      avatar: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=100",
      replies: 31,
      views: 203,
      lastActivity: "6 hours ago",
      category: "Funding",
      isPinned: false,
      tags: ["EdTech", "Funding", "Tamil Nadu"]
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      expertise: "AI/ML, Product Strategy",
      company: "Former CTO at TechCorp",
      experience: "15+ years",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.9,
      sessions: 150,
      location: "Chennai"
    },
    {
      id: 2,
      name: "Priya Nair",
      expertise: "Business Development, Fundraising",
      company: "Venture Partner at StartupFund",
      experience: "12+ years",
      avatar: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.8,
      sessions: 120,
      location: "Bangalore"
    },
    {
      id: 3,
      name: "Arun Vijay",
      expertise: "Marketing, Growth Hacking",
      company: "Growth Lead at ScaleUp",
      experience: "10+ years",
      avatar: "https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.7,
      sessions: 95,
      location: "Coimbatore"
    }
  ];

  const problemStatements = [
    {
      id: 1,
      title: "Smart Waste Management for Urban Areas",
      organization: "Chennai Corporation",
      description: "Develop an IoT-based solution for optimizing waste collection routes and monitoring bin levels in real-time.",
      category: "Smart Cities",
      deadline: "March 30, 2024",
      reward: "₹2 Lakhs",
      difficulty: "Medium",
      tags: ["IoT", "Smart Cities", "Sustainability"]
    },
    {
      id: 2,
      title: "AI-Powered Crop Disease Detection",
      organization: "Tamil Nadu Agricultural Department",
      description: "Create a mobile app that can identify crop diseases using image recognition and provide treatment recommendations.",
      category: "AgriTech",
      deadline: "April 15, 2024",
      reward: "₹3 Lakhs",
      difficulty: "Hard",
      tags: ["AI", "Agriculture", "Mobile App"]
    },
    {
      id: 3,
      title: "Digital Health Records for Rural Areas",
      organization: "Health Ministry TN",
      description: "Design a system for maintaining digital health records in areas with limited internet connectivity.",
      category: "HealthTech",
      deadline: "May 10, 2024",
      reward: "₹2.5 Lakhs",
      difficulty: "Medium",
      tags: ["HealthTech", "Rural", "Digital Records"]
    }
  ];

  const internships = [
    {
      id: 1,
      title: "Full Stack Developer Intern",
      company: "TechStart Innovations",
      location: "Chennai",
      duration: "3 months",
      stipend: "₹15,000/month",
      type: "Paid",
      skills: ["React", "Node.js", "MongoDB"],
      postedDate: "2 days ago",
      deadline: "March 25, 2024",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      title: "UI/UX Design Intern",
      company: "DesignCraft Studio",
      location: "Coimbatore",
      duration: "4 months",
      stipend: "₹12,000/month",
      type: "Paid",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      postedDate: "1 week ago",
      deadline: "April 5, 2024",
      logo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Analytics Pro",
      location: "Remote",
      duration: "6 months",
      stipend: "₹20,000/month",
      type: "Paid",
      skills: ["Python", "Machine Learning", "SQL"],
      postedDate: "3 days ago",
      deadline: "March 30, 2024",
      logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const communityStats = [
    {
      label: "Active Members",
      value: "10,247",
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Discussions",
      value: "2,156",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      label: "Weekly Posts",
      value: "340",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      label: "Events",
      value: "28",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  const categories = [
    { name: "Startup Advice", posts: 456, color: "bg-blue-100 text-blue-800" },
    { name: "Co-founder Search", posts: 234, color: "bg-green-100 text-green-800" },
    { name: "Funding", posts: 189, color: "bg-purple-100 text-purple-800" },
    { name: "Marketing", posts: 167, color: "bg-orange-100 text-orange-800" },
    { name: "Technical", posts: 145, color: "bg-pink-100 text-pink-800" },
    { name: "Legal", posts: 123, color: "bg-indigo-100 text-indigo-800" }
  ];

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Idea submitted:', ideaFormData);
    // In real app, this would submit to backend
    setShowIdeaForm(false);
    setIdeaFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      lookingFor: ''
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="community" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Community & Forum
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Connect with fellow entrepreneurs, share experiences, and grow together
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} mx-auto mb-2 sm:mb-3`} />
                <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Community Hub</h3>
                  {user && (
                    <button
                      onClick={() => setShowIdeaForm(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 text-sm"
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Share Your Idea</span>
                    </button>
                  )}
                </div>
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg text-sm overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('forum')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === 'forum' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Forum
                  </button>
                  <button
                    onClick={() => setActiveTab('mentors')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === 'mentors' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Mentors
                  </button>
                  <button
                    onClick={() => setActiveTab('problems')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === 'problems' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Problems
                  </button>
                  <button
                    onClick={() => setActiveTab('internships')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === 'internships' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Internships
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {activeTab === 'forum' && (
                  <>
                    {forumPosts.map((post) => (
                      <div key={post.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-4">
                          <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {post.isPinned && (
                                <Pin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.category === 'Startup Advice' ? 'bg-blue-100 text-blue-800' :
                                post.category === 'Co-founder Search' ? 'bg-green-100 text-green-800' :
                                post.category === 'Funding' ? 'bg-purple-100 text-purple-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {post.category}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2 hover:text-purple-600 cursor-pointer text-sm sm:text-base">
                              {post.title}
                            </h4>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-0">
                              <div className="flex items-center space-x-3 sm:space-x-4">
                                <span>by {post.author}</span>
                                <span>{post.replies} replies</span>
                                <span>{post.views} views</span>
                              </div>
                              <span>{post.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {activeTab === 'mentors' && (
                  <div className="p-4 sm:p-6">
                    <div className="grid gap-4">
                      {mentors.map((mentor) => (
                        <div key={mentor.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-start space-x-4">
                            <img
                              src={mentor.avatar}
                              alt={mentor.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
                                  <p className="text-sm text-gray-600">{mentor.expertise}</p>
                                  <p className="text-xs text-gray-500">{mentor.company}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center space-x-1 text-yellow-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="text-xs font-medium">{mentor.rating}</span>
                                  </div>
                                  <p className="text-xs text-gray-500">{mentor.sessions} sessions</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{mentor.location}</span>
                                  </span>
                                  <span>{mentor.experience}</span>
                                </div>
                                <button className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-xs">
                                  Connect
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'problems' && (
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {problemStatements.map((problem) => (
                        <div key={problem.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{problem.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{problem.organization}</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{problem.description}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {problem.tags.map((tag, index) => (
                              <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Due: {problem.deadline}</span>
                              </span>
                              <span className="font-medium text-green-600">{problem.reward}</span>
                            </div>
                            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-xs">
                              Apply Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'internships' && (
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {internships.map((internship) => (
                        <div key={internship.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-start space-x-4">
                            <img
                              src={internship.logo}
                              alt={internship.company}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                                  <p className="text-sm text-gray-600">{internship.company}</p>
                                </div>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                  {internship.type}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-3">
                                {internship.skills.map((skill, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                                <span className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{internship.location}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{internship.duration}</span>
                                </span>
                                <span className="font-medium text-green-600">{internship.stipend}</span>
                                <span>Due: {internship.deadline}</span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Posted {internship.postedDate}</span>
                                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-xs flex items-center space-x-1">
                                  <ExternalLink className="w-3 h-3" />
                                  <span>Apply</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 sm:p-6 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 sm:py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-sm sm:text-base">
                  {activeTab === 'forum' && 'View All Discussions'}
                  {activeTab === 'mentors' && 'View All Mentors'}
                  {activeTab === 'problems' && 'View All Problem Statements'}
                  {activeTab === 'internships' && 'View All Internships'}
                </button>
              </div>
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-gray-500">{category.posts}</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 sm:p-6 text-white">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-bold mb-2">Join Our Community</h3>
              <p className="text-purple-100 text-xs sm:text-sm mb-3 sm:mb-4">
                Connect with 10,000+ entrepreneurs and get access to exclusive resources.
              </p>
              <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg font-medium hover:bg-white/30 transition-colors text-sm">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Idea Submission Modal */}
      {showIdeaForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowIdeaForm(false)} />
            
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Share Your Idea</h3>
                    <p className="text-gray-600 text-sm">Let the community know about your innovative idea</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIdeaForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleIdeaSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idea Title *
                  </label>
                  <input
                    type="text"
                    value={ideaFormData.title}
                    onChange={(e) => setIdeaFormData({ ...ideaFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Give your idea a catchy title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={ideaFormData.category}
                    onChange={(e) => setIdeaFormData({ ...ideaFormData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="EdTech">EdTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="FinTech">FinTech</option>
                    <option value="AgriTech">AgriTech</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={ideaFormData.description}
                    onChange={(e) => setIdeaFormData({ ...ideaFormData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your idea, the problem it solves, and your vision..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are you looking for?
                  </label>
                  <select
                    value={ideaFormData.lookingFor}
                    onChange={(e) => setIdeaFormData({ ...ideaFormData, lookingFor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select what you need</option>
                    <option value="Co-founder">Co-founder</option>
                    <option value="Technical Partner">Technical Partner</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Funding">Funding</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Team Members">Team Members</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={ideaFormData.tags}
                    onChange={(e) => setIdeaFormData({ ...ideaFormData, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter tags separated by commas (e.g., AI, Mobile App, SaaS)"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Share Idea</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowIdeaForm(false)}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Community;