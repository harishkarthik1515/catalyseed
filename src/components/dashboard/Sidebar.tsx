import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  Users, 
  Calendar, 
  Settings, 
  HelpCircle, 
  LogOut,
  Home,
  Trophy,
  Star,
  FileText,
  Shield,
  Database,
  DollarSign,
  Briefcase,
  Rocket,
  Target
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, onNavigate }) => {
  const { user, logout } = useAuth();

  const handleBackToHome = () => {
    onNavigate('home');
    window.history.pushState({}, '', '/');
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
    window.history.pushState({}, '', '/');
  };

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    if (user?.role === 'admin') {
      return [
        ...commonItems,
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'content', label: 'Content Management', icon: FileText },
        { id: 'events', label: 'All Events', icon: Calendar },
        { id: 'reports', label: 'System Reports', icon: Database },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ];
    }

    if (user?.role === 'institute') {
      return [
        ...commonItems,
        { id: 'events', label: 'My Events', icon: Calendar },
        { id: 'startups', label: 'Startups', icon: Star },
        { id: 'awards', label: 'Awards', icon: Trophy },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ];
    }

    if (user?.role === 'investor') {
      return [
        ...commonItems,
        { id: 'investments', label: 'Investments', icon: DollarSign },
        { id: 'startups', label: 'Startups', icon: Star },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ];
    }

    if (user?.role === 'mentor') {
      return [
        ...commonItems,
        { id: 'mentorships', label: 'Mentorships', icon: Target },
        { id: 'startups', label: 'Startups', icon: Star },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ];
    }

    if (user?.role === 'founder') {
      return [
        ...commonItems,
        { id: 'startup', label: 'My Startup', icon: Rocket },
        { id: 'investments', label: 'Investments', icon: DollarSign },
        { id: 'mentorships', label: 'Mentorships', icon: Target },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ];
    }

    if (user?.role === 'incubation_manager' || user?.role === 'accelerator') {
      return [
        ...commonItems,
        { id: 'startups', label: 'Startups', icon: Star },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'mentorships', label: 'Mentorships', icon: Target },
        { id: 'investments', label: 'Investments', icon: DollarSign },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="/calayseed logo.png" 
            alt="Catalyseed" 
            className="h-8 w-auto"
          />
          <span className="text-lg font-bold text-gray-900">Dashboard</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role?.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-red-50 text-red-600 border-r-2 border-red-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-red-600' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <button
          onClick={handleBackToHome}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Home className="h-5 w-5 text-gray-400" />
          <span className="font-medium">Back to Home</span>
        </button>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;