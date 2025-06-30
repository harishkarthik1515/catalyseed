import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Mail, 
  MapPin, 
  Building, 
  Globe, 
  Linkedin, 
  Twitter, 
  Edit3, 
  Save, 
  X,
  Shield,
  Calendar,
  Star,
  Award,
  Eye,
  Heart,
  MessageSquare,
  Home,
  ChevronRight,
  Users,
  UserPlus,
  UserCheck,
  TrendingUp,
  Activity,
  Briefcase,
  Phone
} from 'lucide-react';
import { mockUsers, mockConnections, getConnectionsByUser, getUserById } from '../../data/mockData';

interface UserProfileProps {
  onNavigate: (page: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onNavigate }) => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    linkedin: user?.linkedin || '',
    twitter: user?.twitter || '',
    expertise: user?.expertise?.join(', ') || ''
  });

  const handleBackToHome = () => {
    onNavigate('home');
    window.history.pushState({}, '', '/');
  };

  const handleSave = async () => {
    await updateProfile({
      ...formData,
      expertise: formData.expertise.split(',').map(s => s.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      linkedin: user?.linkedin || '',
      twitter: user?.twitter || '',
      expertise: user?.expertise?.join(', ') || ''
    });
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      institute: 'bg-blue-100 text-blue-800',
      investor: 'bg-green-100 text-green-800',
      mentor: 'bg-orange-100 text-orange-800',
      founder: 'bg-red-100 text-red-800',
      incubation_manager: 'bg-indigo-100 text-indigo-800',
      accelerator: 'bg-pink-100 text-pink-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatsForRole = () => {
    if (user?.role === 'founder') {
      return [
        { label: 'Startups Founded', value: '2', icon: Star, color: 'text-purple-600' },
        { label: 'Total Funding', value: '₹2.5Cr', icon: Award, color: 'text-green-600' },
        { label: 'Profile Views', value: '1.2K', icon: Eye, color: 'text-blue-600' },
        { label: 'Connections', value: user?.connections || '156', icon: Heart, color: 'text-red-600' }
      ];
    }
    
    if (user?.role === 'investor') {
      return [
        { label: 'Investments Made', value: '12', icon: Star, color: 'text-purple-600' },
        { label: 'Portfolio Value', value: '₹50Cr', icon: Award, color: 'text-green-600' },
        { label: 'Profile Views', value: '3.4K', icon: Eye, color: 'text-blue-600' },
        { label: 'Connections', value: user?.connections || '289', icon: Heart, color: 'text-red-600' }
      ];
    }

    if (user?.role === 'mentor') {
      return [
        { label: 'Mentees', value: '24', icon: Star, color: 'text-purple-600' },
        { label: 'Sessions', value: '156', icon: Award, color: 'text-green-600' },
        { label: 'Profile Views', value: '2.1K', icon: Eye, color: 'text-blue-600' },
        { label: 'Reviews', value: '45', icon: MessageSquare, color: 'text-orange-600' }
      ];
    }

    return [
      { label: 'Profile Views', value: '890', icon: Eye, color: 'text-blue-600' },
      { label: 'Connections', value: user?.connections || '67', icon: Heart, color: 'text-red-600' },
      { label: 'Posts', value: user?.posts || '12', icon: MessageSquare, color: 'text-orange-600' },
      { label: 'Achievements', value: '5', icon: Award, color: 'text-green-600' }
    ];
  };

  const stats = getStatsForRole();

  // Get user connections
  const userConnections = getConnectionsByUser(user?.id || '');
  const connectedUsers = userConnections
    .filter(conn => conn.status === 'connected')
    .map(conn => {
      const connectedUserId = conn.userId === user?.id ? conn.connectedUserId : conn.userId;
      return getUserById(connectedUserId);
    })
    .filter(Boolean);

  const pendingConnections = userConnections.filter(conn => conn.status === 'pending').length;

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* About Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
        <p className="text-gray-700 leading-relaxed">
          {user?.bio || 'No bio available'}
        </p>
      </div>

      {/* Expertise */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {user?.expertise?.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
              {skill}
            </span>
          )) || <span className="text-gray-500">No expertise listed</span>}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="space-y-3">
          {user?.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700">{achievement}</span>
            </div>
          )) || <span className="text-gray-500">No achievements listed</span>}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Activity className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <p className="text-gray-700">Posted a new discussion about startup funding</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-green-500 mt-1" />
            <div>
              <p className="text-gray-700">Connected with 3 new entrepreneurs</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MessageSquare className="h-5 w-5 text-purple-500 mt-1" />
            <div>
              <p className="text-gray-700">Replied to a question about incubation programs</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConnectionsTab = () => (
    <div className="space-y-6">
      {/* Connection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{user?.connections || 0}</div>
          <div className="text-sm text-gray-600">Connections</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <UserPlus className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{pendingConnections}</div>
          <div className="text-sm text-gray-600">Pending Requests</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">+12</div>
          <div className="text-sm text-gray-600">This Month</div>
        </div>
      </div>

      {/* Connections List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Connections</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <UserPlus className="h-4 w-4" />
            <span>Find People</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedUsers.slice(0, 6).map((connection) => (
            <div key={connection?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={connection?.avatar}
                  alt={connection?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{connection?.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{connection?.role?.replace('_', ' ')}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{connection?.bio}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(connection?.role || '')}`}>
                  {connection?.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <button className="text-sm text-red-600 hover:text-red-700">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {connectedUsers.length > 6 && (
          <div className="text-center mt-6">
            <button className="text-red-600 hover:text-red-700 font-medium">
              View All Connections ({connectedUsers.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{user?.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number
              </label>
              <p className="text-gray-900">+91 98765 43210</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="City, State"
                />
              ) : (
                <p className="text-gray-900">{user?.location || 'Not specified'}</p>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900">{user?.bio || 'No bio available'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="h-4 w-4 inline mr-2" />
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              ) : (
                <p className="text-gray-900">
                  {user?.website ? (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                      {user.website}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="h-4 w-4 inline mr-2" />
                LinkedIn
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="LinkedIn profile URL"
                />
              ) : (
                <p className="text-gray-900">
                  {user?.linkedin ? (
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                      View Profile
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expertise
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.expertise}
                  onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="AI, Machine Learning, Blockchain (comma separated)"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user?.expertise?.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      {skill}
                    </span>
                  )) || <span className="text-gray-500">No expertise listed</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Profile Visibility</h4>
              <p className="text-sm text-gray-600">Control who can see your profile</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option>Public</option>
              <option>Connections Only</option>
              <option>Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              <p className="text-sm text-gray-600">Show email and phone to connections</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Activity Status</h4>
              <p className="text-sm text-gray-600">Show when you're online</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <span className="text-gray-900 font-medium">Profile</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-red-500 to-red-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
                <div className="pb-2">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                    {user?.verified && (
                      <Shield className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user?.role || '')}`}>
                      {user?.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    {user?.institute && (
                      <span className="text-gray-600 text-sm flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {user.institute}
                      </span>
                    )}
                    <span className="text-gray-600 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user?.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'connections', label: 'Connections', icon: Users },
                  { id: 'settings', label: 'Settings', icon: Edit3 }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-red-500 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'connections' && renderConnectionsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
};

export default UserProfile;