import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Users, DollarSign, Eye, Edit, Star, Building, MapPin, Calendar } from 'lucide-react';
import { mockStartups, mockUsers, getUserById } from '../../../data/mockData';

const StartupManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.institute.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || startup.sector === selectedSector;
    const matchesStage = selectedStage === 'all' || startup.stage === selectedStage;
    
    return matchesSearch && matchesSector && matchesStage;
  });

  const totalPages = Math.ceil(filteredStartups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStartups = filteredStartups.slice(startIndex, startIndex + itemsPerPage);

  const getSectorColor = (sector: string) => {
    const colors = {
      AgriTech: 'bg-green-100 text-green-800',
      EdTech: 'bg-blue-100 text-blue-800',
      HealthTech: 'bg-red-100 text-red-800',
      FinTech: 'bg-yellow-100 text-yellow-800',
      CleanTech: 'bg-emerald-100 text-emerald-800'
    };
    return colors[sector as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStageColor = (stage: string) => {
    const colors = {
      'Seed': 'bg-orange-100 text-orange-800',
      'Series A': 'bg-purple-100 text-purple-800',
      'Series B': 'bg-indigo-100 text-indigo-800',
      'Growth': 'bg-pink-100 text-pink-800'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Startup Management</h1>
          <p className="text-gray-600">Track and manage startups in the ecosystem</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Startups</p>
              <p className="text-2xl font-bold text-gray-900">{mockStartups.length}</p>
            </div>
            <Building className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Valuation</p>
              <p className="text-2xl font-bold text-gray-900">₹200 Cr</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">Combined value</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockStartups.reduce((sum, startup) => sum + startup.employees, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-purple-600">Jobs created</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Growth</p>
              <p className="text-2xl font-bold text-gray-900">165%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-orange-600">Year over year</span>
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
                placeholder="Search startups by name, founder, or institute..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Sectors</option>
            <option value="AgriTech">AgriTech</option>
            <option value="EdTech">EdTech</option>
            <option value="HealthTech">HealthTech</option>
            <option value="FinTech">FinTech</option>
            <option value="CleanTech">CleanTech</option>
          </select>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Stages</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B">Series B</option>
            <option value="Growth">Growth</option>
          </select>
        </div>
      </div>

      {/* Startups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedStartups.map((startup) => {
          const founder = getUserById(startup.founderId);
          return (
            <div key={startup.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48">
                <img
                  src={startup.logo}
                  alt={startup.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSectorColor(startup.sector)}`}>
                    {startup.sector}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(startup.stage)}`}>
                    {startup.stage}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{startup.name}</h3>
                    <p className="text-sm text-gray-600">{startup.founder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{startup.valuation}</p>
                    <p className="text-xs text-gray-500">Valuation</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{startup.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    <span>{startup.institute}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{startup.employees} employees</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{startup.fundingRaised} raised</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {startup.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{startup.metrics.revenue}</p>
                    <p className="text-gray-500 text-xs">Revenue</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{startup.metrics.growth}</p>
                    <p className="text-gray-500 text-xs">Growth</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{startup.metrics.customers.toLocaleString()}</p>
                    <p className="text-gray-500 text-xs">Customers</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredStartups.length)} of {filteredStartups.length} startups
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupManagement;