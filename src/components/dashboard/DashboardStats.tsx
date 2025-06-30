import React from 'react';
import { TrendingUp, TrendingDown, Users, Calendar, Trophy, Star, Eye, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDashboardData } from '../../data/mockData';

const DashboardStats: React.FC = () => {
  const { user } = useAuth();
  
  const dashboardData = getDashboardData(user?.role || '', user?.id);
  const stats = dashboardData.stats || {};

  const getStatsForRole = () => {
    if (user?.role === 'admin') {
      return [
        {
          title: 'Total Platform Users',
          value: stats.totalUsers?.toLocaleString() || '2,847',
          change: '+12%',
          trend: 'up',
          icon: Users,
          color: 'blue',
          subtitle: 'this month'
        },
        {
          title: 'Pending Verifications',
          value: stats.pendingVerifications || '23',
          change: '3 new today',
          trend: 'neutral',
          icon: Eye,
          color: 'yellow',
          subtitle: 'awaiting approval'
        },
        {
          title: 'Platform Events',
          value: stats.totalEvents || '156',
          change: '+8%',
          trend: 'up',
          icon: Calendar,
          color: 'green',
          subtitle: 'growth'
        },
        {
          title: 'System Health',
          value: stats.systemHealth || '99.9%',
          change: 'All systems operational',
          trend: 'up',
          icon: Trophy,
          color: 'purple',
          subtitle: 'uptime'
        }
      ];
    }

    if (user?.role === 'institute') {
      return [
        {
          title: 'Active Startups',
          value: stats.activeStartups || '24',
          change: '+3',
          trend: 'up',
          icon: Star,
          color: 'blue',
          subtitle: 'this month'
        },
        {
          title: 'Upcoming Events',
          value: stats.upcomingEvents || '8',
          change: '2 this week',
          trend: 'neutral',
          icon: Calendar,
          color: 'green',
          subtitle: 'scheduled'
        },
        {
          title: 'Total Views',
          value: stats.totalViews || '12.5K',
          change: '+15%',
          trend: 'up',
          icon: Eye,
          color: 'purple',
          subtitle: 'this month'
        },
        {
          title: 'Engagement Rate',
          value: stats.engagementRate || '8.2%',
          change: '+0.5%',
          trend: 'up',
          icon: Heart,
          color: 'red',
          subtitle: 'avg rate'
        }
      ];
    }

    if (user?.role === 'investor') {
      return [
        {
          title: 'Portfolio Companies',
          value: stats.portfolioCompanies || '12',
          change: '+2',
          trend: 'up',
          icon: Star,
          color: 'blue',
          subtitle: 'this quarter'
        },
        {
          title: 'Total Invested',
          value: stats.totalInvested || '₹45 Cr',
          change: '+₹5 Cr',
          trend: 'up',
          icon: Trophy,
          color: 'green',
          subtitle: 'this quarter'
        },
        {
          title: 'Average Return',
          value: stats.avgReturn || '8.5x',
          change: '+0.3x',
          trend: 'up',
          icon: TrendingUp,
          color: 'purple',
          subtitle: 'portfolio performance'
        },
        {
          title: 'Active Deals',
          value: stats.activeDeals || '3',
          change: '1 due diligence',
          trend: 'neutral',
          icon: Eye,
          color: 'yellow',
          subtitle: 'in pipeline'
        }
      ];
    }

    if (user?.role === 'mentor') {
      return [
        {
          title: 'Active Mentees',
          value: stats.activeMentees || '8',
          change: '+2',
          trend: 'up',
          icon: Users,
          color: 'blue',
          subtitle: 'this month'
        },
        {
          title: 'Total Sessions',
          value: stats.totalSessions || '156',
          change: '+12',
          trend: 'up',
          icon: Calendar,
          color: 'green',
          subtitle: 'conducted'
        },
        {
          title: 'Average Rating',
          value: stats.avgRating || '4.8',
          change: '+0.2',
          trend: 'up',
          icon: Star,
          color: 'yellow',
          subtitle: 'from mentees'
        },
        {
          title: 'Success Stories',
          value: stats.successStories || '12',
          change: '+3',
          trend: 'up',
          icon: Trophy,
          color: 'purple',
          subtitle: 'this year'
        }
      ];
    }

    if (user?.role === 'founder') {
      return [
        {
          title: 'Startup Valuation',
          value: stats.startupValuation || '₹50 Cr',
          change: '+15%',
          trend: 'up',
          icon: TrendingUp,
          color: 'green',
          subtitle: 'this quarter'
        },
        {
          title: 'Team Size',
          value: stats.teamSize || '150',
          change: '+10',
          trend: 'up',
          icon: Users,
          color: 'blue',
          subtitle: 'employees'
        },
        {
          title: 'Monthly Revenue',
          value: stats.monthlyRevenue || '₹2.5 Cr',
          change: '+8%',
          trend: 'up',
          icon: Trophy,
          color: 'purple',
          subtitle: 'growth'
        },
        {
          title: 'Funding Raised',
          value: stats.fundingRaised || '₹25 Cr',
          change: 'Series A',
          trend: 'neutral',
          icon: Star,
          color: 'yellow',
          subtitle: 'total'
        }
      ];
    }

    return [];
  };

  const dashboardStats = getStatsForRole();

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      yellow: 'bg-yellow-500 text-yellow-600 bg-yellow-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      red: 'bg-red-500 text-red-600 bg-red-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {dashboardStats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color).split(' ');
        const bgColor = colorClasses[0];
        const textColor = colorClasses[1];
        const lightBg = colorClasses[2];

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${lightBg}`}>
                <Icon className={`h-6 w-6 ${textColor}`} />
              </div>
              <div className="flex items-center space-x-1">
                {stat.trend === 'up' && (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                )}
                {stat.trend === 'down' && (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                {stat.title}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {stat.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;