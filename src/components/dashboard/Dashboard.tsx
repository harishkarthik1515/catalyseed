import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import DashboardStats from './DashboardStats';
import Charts from './Charts';
import UserManagement from './sections/UserManagement';
import ContentManagement from './sections/ContentManagement';
import EventsManagement from './sections/EventsManagement';
import StartupManagement from './sections/StartupManagement';
import InvestmentTracking from './sections/InvestmentTracking';
import MentorshipPrograms from './sections/MentorshipPrograms';
import AnalyticsReports from './sections/AnalyticsReports';
import SecuritySettings from './sections/SecuritySettings';
import MessagesCenter from './sections/MessagesCenter';
import NotificationsCenter from './sections/NotificationsCenter';
import SettingsPanel from './sections/SettingsPanel';
import HelpSupport from './sections/HelpSupport';
import { Settings, Bell, Search, Filter, Home, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleBackToHome = () => {
    onNavigate('home');
    window.history.pushState({}, '', '/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <button 
                onClick={handleBackToHome}
                className="flex items-center hover:text-red-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Dashboard</span>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.role === 'admin' ? 'Platform Administration' : 
                 user?.role === 'institute' ? 'Institute Dashboard' :
                 user?.role === 'investor' ? 'Investment Dashboard' :
                 user?.role === 'mentor' ? 'Mentorship Dashboard' :
                 user?.role === 'founder' ? 'Founder Dashboard' :
                 'Dashboard'}
              </h1>
              <p className="text-gray-600 text-lg">
                {user?.role === 'admin' 
                  ? 'Monitor and manage the entire Catalyseed ecosystem'
                  : user?.role === 'institute'
                  ? 'Manage your institute\'s innovation activities and startups'
                  : user?.role === 'investor'
                  ? 'Track your investments and discover new opportunities'
                  : user?.role === 'mentor'
                  ? 'Manage your mentorship programs and track progress'
                  : user?.role === 'founder'
                  ? 'Monitor your startup\'s growth and performance'
                  : 'Welcome to your dashboard'
                }
              </p>
            </div>
            <DashboardStats />
            <Charts />
          </div>
        );
      
      case 'analytics':
        return <AnalyticsReports />;
      
      case 'users':
        return <UserManagement />;
      
      case 'content':
        return <ContentManagement />;
      
      case 'events':
        return <EventsManagement />;
      
      case 'startups':
        return <StartupManagement />;
      
      case 'investments':
        return <InvestmentTracking />;
      
      case 'mentorships':
        return <MentorshipPrograms />;
      
      case 'security':
        return <SecuritySettings />;
      
      case 'messages':
        return <MessagesCenter />;
      
      case 'notifications':
        return <NotificationsCenter />;
      
      case 'settings':
        return <SettingsPanel />;
      
      case 'help':
        return <HelpSupport />;

      default:
        return (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <button 
                onClick={handleBackToHome}
                className="flex items-center hover:text-red-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium capitalize">
                {activeSection.replace('_', ' ')}
              </span>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                {activeSection.replace('_', ' ')}
              </h1>
              <p className="text-gray-600 text-lg">This section is under development</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-center py-12">
                <p className="text-gray-600">Content for {activeSection} coming soon...</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                {activeSection.replace('_', ' ')}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;