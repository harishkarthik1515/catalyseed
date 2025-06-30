import React, { useState } from 'react';
import { Users, Clock, Star, Calendar, MessageSquare, Award, Eye, Filter, Search } from 'lucide-react';
import { mockMentorships, mockUsers, getUserById } from '../../../data/mockData';

const MentorshipPrograms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredMentorships = mockMentorships.filter(mentorship => {
    const mentee = getUserById(mentorship.menteeId);
    const matchesSearch = mentee?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || mentorship.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const activeMentorships = mockMentorships.filter(m => m.status === 'active').length;
  const totalSessions = mockMentorships.reduce((sum, m) => sum + m.sessions, 0);
  const avgRating = mockMentorships.reduce((sum, m) => sum + m.rating, 0) / mockMentorships.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mentorship Programs</h1>
          <p className="text-gray-600">Manage your mentorship relationships and track progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Mentees</p>
              <p className="text-2xl font-bold text-gray-900">{activeMentorships}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-blue-600">Currently mentoring</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">Across all mentees</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-yellow-600">Mentee feedback</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Stories</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-purple-600">Successful outcomes</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentees by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Mentorships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentorships.map((mentorship) => {
          const mentee = getUserById(mentorship.menteeId);
          return (
            <div key={mentorship.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={mentee?.avatar}
                    alt={mentee?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{mentee?.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{mentee?.role?.replace('_', ' ')}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mentorship.status)}`}>
                  {formatStatus(mentorship.status)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{new Date(mentorship.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Sessions:</span>
                  <span className="font-medium">{mentorship.sessions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{mentorship.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Focus Areas:</p>
                <div className="flex flex-wrap gap-1">
                  {mentorship.focus.map((area, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                  <MessageSquare className="h-4 w-4" />
                  <span>Message</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-700">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
        <div className="space-y-4">
          {[
            { mentee: 'Arjun Patel', time: 'Today, 3:00 PM', topic: 'Product Development Strategy' },
            { mentee: 'Priya Nair', time: 'Tomorrow, 10:00 AM', topic: 'Team Building & Leadership' },
            { mentee: 'Vikram Singh', time: 'Friday, 2:00 PM', topic: 'Fundraising Preparation' }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{session.mentee}</h4>
                <p className="text-sm text-gray-600">{session.topic}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session.time}</p>
                <button className="text-sm text-red-600 hover:text-red-700">Join Session</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipPrograms;