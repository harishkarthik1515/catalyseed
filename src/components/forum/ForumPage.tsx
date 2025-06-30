import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock, 
  Pin, 
  Award, 
  Bookmark,
  ChevronRight,
  Home,
  User,
  Calendar,
  Tag,
  ArrowUp,
  ArrowDown,
  Share2,
  Flag,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ForumPageProps {
  onNavigate: (page: string) => void;
}

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  replies: number;
  isPinned: boolean;
  isSolved: boolean;
  upvotes: number;
  downvotes: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  postCount: number;
  lastActivity: string;
}

const ForumPage: React.FC<ForumPageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'discussions' | 'categories' | 'leaderboard'>('discussions');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());

  const categories: Category[] = [
    {
      id: 'incubation',
      name: 'Incubation Programs',
      description: 'Discuss incubation strategies, program management, and startup support',
      icon: MessageSquare,
      color: 'blue',
      postCount: 156,
      lastActivity: '2 hours ago'
    },
    {
      id: 'acceleration',
      name: 'Acceleration & Growth',
      description: 'Share insights on scaling startups and acceleration methodologies',
      icon: TrendingUp,
      color: 'green',
      postCount: 89,
      lastActivity: '4 hours ago'
    },
    {
      id: 'funding',
      name: 'Funding & Investment',
      description: 'Connect with investors, discuss funding strategies and opportunities',
      icon: Award,
      color: 'yellow',
      postCount: 234,
      lastActivity: '1 hour ago'
    },
    {
      id: 'campus-startups',
      name: 'Campus Startups',
      description: 'Student entrepreneurs and campus-based startup initiatives',
      icon: Users,
      color: 'purple',
      postCount: 178,
      lastActivity: '3 hours ago'
    },
    {
      id: 'government-schemes',
      name: 'Government Schemes',
      description: 'Information about government policies, schemes, and support programs',
      icon: Star,
      color: 'red',
      postCount: 67,
      lastActivity: '6 hours ago'
    },
    {
      id: 'technology',
      name: 'Technology & Innovation',
      description: 'Discuss emerging technologies, R&D, and innovation trends',
      icon: MessageCircle,
      color: 'indigo',
      postCount: 145,
      lastActivity: '30 minutes ago'
    }
  ];

  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: 'Best practices for early-stage startup incubation programs',
      content: 'Looking for insights on structuring effective incubation programs for early-stage startups. What are the key components that make a program successful?',
      author: {
        name: 'Dr. Rajesh Kumar',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Incubation Manager',
        verified: true
      },
      category: 'incubation',
      tags: ['incubation', 'early-stage', 'best-practices'],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      views: 245,
      likes: 18,
      replies: 12,
      isPinned: true,
      isSolved: false,
      upvotes: 24,
      downvotes: 2
    },
    {
      id: 2,
      title: 'Government funding opportunities for AgriTech startups in Tamil Nadu',
      content: 'Can anyone share information about recent government schemes specifically targeting AgriTech startups? Looking for both state and central government programs.',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Founder',
        verified: false
      },
      category: 'government-schemes',
      tags: ['government', 'funding', 'agritech', 'tamil-nadu'],
      createdAt: '2024-01-14T16:45:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      views: 189,
      likes: 15,
      replies: 8,
      isPinned: false,
      isSolved: true,
      upvotes: 19,
      downvotes: 1
    },
    {
      id: 3,
      title: 'How to pitch to angel investors effectively?',
      content: 'First-time founder here. I have a working prototype and some traction. What are the key elements of a successful pitch to angel investors?',
      author: {
        name: 'Arjun Patel',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Founder',
        verified: false
      },
      category: 'funding',
      tags: ['angel-investors', 'pitching', 'fundraising'],
      createdAt: '2024-01-14T12:20:00Z',
      updatedAt: '2024-01-14T18:30:00Z',
      views: 312,
      likes: 22,
      replies: 15,
      isPinned: false,
      isSolved: false,
      upvotes: 28,
      downvotes: 3
    },
    {
      id: 4,
      title: 'Campus startup success stories - Share your journey',
      content: 'Let\'s create a thread where campus entrepreneurs can share their startup journeys, challenges faced, and lessons learned.',
      author: {
        name: 'Meera Krishnan',
        avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Student',
        verified: false
      },
      category: 'campus-startups',
      tags: ['campus', 'success-stories', 'entrepreneurship'],
      createdAt: '2024-01-13T14:10:00Z',
      updatedAt: '2024-01-15T11:45:00Z',
      views: 156,
      likes: 31,
      replies: 23,
      isPinned: false,
      isSolved: false,
      upvotes: 35,
      downvotes: 1
    },
    {
      id: 5,
      title: 'AI/ML trends in startup ecosystem - What\'s next?',
      content: 'Discussion on emerging AI/ML trends and their impact on the startup ecosystem. What technologies should entrepreneurs focus on?',
      author: {
        name: 'Dr. Sanjay Gupta',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Mentor',
        verified: true
      },
      category: 'technology',
      tags: ['ai', 'machine-learning', 'trends', 'technology'],
      createdAt: '2024-01-12T09:30:00Z',
      updatedAt: '2024-01-14T16:20:00Z',
      views: 278,
      likes: 19,
      replies: 17,
      isPinned: false,
      isSolved: false,
      upvotes: 26,
      downvotes: 2
    }
  ];

  const leaderboardData = [
    {
      rank: 1,
      name: 'Dr. Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Incubation Manager',
      points: 2450,
      posts: 45,
      solutions: 23,
      verified: true
    },
    {
      rank: 2,
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Investor',
      points: 2180,
      posts: 38,
      solutions: 19,
      verified: true
    },
    {
      rank: 3,
      name: 'Arjun Patel',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Founder',
      points: 1890,
      posts: 42,
      solutions: 15,
      verified: false
    }
  ];

  const handleBackToHome = () => {
    onNavigate('home');
    window.history.pushState({}, '', '/');
  };

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes + b.replies) - (a.likes + a.replies);
      case 'trending':
        return b.views - a.views;
      case 'latest':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'gray';
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'Incubation Manager': 'bg-blue-100 text-blue-800',
      'Investor': 'bg-green-100 text-green-800',
      'Founder': 'bg-purple-100 text-purple-800',
      'Mentor': 'bg-orange-100 text-orange-800',
      'Student': 'bg-pink-100 text-pink-800',
      'Admin': 'bg-red-100 text-red-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button
                onClick={handleBackToHome}
                className="flex items-center hover:text-red-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Forum & Community</span>
            </div>

            {/* New Post Button */}
            {isAuthenticated && (
              <button
                onClick={() => setShowNewPostModal(true)}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Forum & Community
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect, discuss, and collaborate with the innovation and entrepreneurship community across Tamil Nadu
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">456</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600">Solved Questions</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">23</div>
            <div className="text-sm text-gray-600">Online Now</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'discussions', label: 'Discussions', icon: MessageSquare },
              { id: 'categories', label: 'Categories', icon: Tag },
              { id: 'leaderboard', label: 'Leaderboard', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Filters */}
          {activeTab === 'discussions' && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'discussions' && (
          <div className="space-y-4">
            {sortedPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  {/* Author Avatar */}
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-red-600 cursor-pointer">
                            {post.isPinned && <Pin className="h-4 w-4 text-yellow-500 inline mr-1" />}
                            {post.title}
                          </h3>
                          {post.isSolved && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Solved
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">{post.author.name}</span>
                            {post.author.verified && (
                              <Star className="h-3 w-3 text-blue-500 fill-current" />
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(post.author.role)}`}>
                            {post.author.role}
                          </span>
                          <span>{getTimeAgo(post.updatedAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            bookmarkedPosts.has(post.id)
                              ? 'text-yellow-600 bg-yellow-50'
                              : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                          }`}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated {getTimeAgo(post.updatedAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Voting */}
                        <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium text-gray-700 px-2">
                            {post.upvotes - post.downvotes}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <ArrowDown className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Like */}
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                            likedPosts.has(post.id)
                              ? 'text-red-600 bg-red-50'
                              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                        </button>

                        {/* Share */}
                        <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setActiveTab('discussions');
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-${category.color}-100`}>
                      <Icon className={`h-6 w-6 text-${category.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{category.postCount} posts</span>
                        <span>Last activity: {category.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Community Leaderboard</h3>
              <p className="text-gray-600 text-sm">Top contributors in our community</p>
            </div>
            <div className="divide-y divide-gray-200">
              {leaderboardData.map((member, index) => (
                <div key={member.rank} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                      <span className="text-sm font-bold text-gray-700">#{member.rank}</span>
                    </div>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        {member.verified && (
                          <Star className="h-4 w-4 text-blue-500 fill-current" />
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{member.points}</div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{member.posts} posts</div>
                      <div className="text-sm text-gray-600">{member.solutions} solutions</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;