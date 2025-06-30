import React from 'react';
import { Building, Users, TrendingUp, Award, Lightbulb, Rocket } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
}

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const roles: Role[] = [
    {
      id: 'institute',
      title: 'Institute Manager',
      description: 'Manage your educational institution\'s innovation ecosystem',
      icon: Building,
      color: 'blue',
      features: ['Dashboard Analytics', 'Event Management', 'Startup Tracking', 'Awards Submission']
    },
    {
      id: 'incubation_manager',
      title: 'Incubation Manager',
      description: 'Lead incubation programs and support startup growth',
      icon: Rocket,
      color: 'purple',
      features: ['Startup Portfolio', 'Mentorship Programs', 'Funding Tracking', 'Performance Analytics']
    },
    {
      id: 'accelerator',
      title: 'Accelerator',
      description: 'Run acceleration programs and scale startups',
      icon: TrendingUp,
      color: 'green',
      features: ['Program Management', 'Cohort Tracking', 'Demo Day Events', 'Investor Network']
    },
    {
      id: 'investor',
      title: 'Investor',
      description: 'Discover and invest in promising startups',
      icon: Award,
      color: 'yellow',
      features: ['Startup Discovery', 'Due Diligence', 'Portfolio Management', 'Deal Flow']
    },
    {
      id: 'mentor',
      title: 'Mentor',
      description: 'Guide and support entrepreneurs in their journey',
      icon: Lightbulb,
      color: 'orange',
      features: ['Mentee Management', 'Session Scheduling', 'Progress Tracking', 'Knowledge Sharing']
    },
    {
      id: 'founder',
      title: 'Founder',
      description: 'Build and grow your startup with ecosystem support',
      icon: Users,
      color: 'red',
      features: ['Profile Showcase', 'Investor Connect', 'Mentor Access', 'Event Participation']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 hover:border-blue-300 bg-blue-50 text-blue-600',
      purple: 'border-purple-200 hover:border-purple-300 bg-purple-50 text-purple-600',
      green: 'border-green-200 hover:border-green-300 bg-green-50 text-green-600',
      yellow: 'border-yellow-200 hover:border-yellow-300 bg-yellow-50 text-yellow-600',
      orange: 'border-orange-200 hover:border-orange-300 bg-orange-50 text-orange-600',
      red: 'border-red-200 hover:border-red-300 bg-red-50 text-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
        <p className="text-gray-600">Select the role that best describes your position in the ecosystem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          const colorClasses = getColorClasses(role.color);
          
          return (
            <button
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${colorClasses}`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${role.color === 'blue' ? 'bg-blue-100' : 
                  role.color === 'purple' ? 'bg-purple-100' :
                  role.color === 'green' ? 'bg-green-100' :
                  role.color === 'yellow' ? 'bg-yellow-100' :
                  role.color === 'orange' ? 'bg-orange-100' :
                  'bg-red-100'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{role.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                {role.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <div className="w-1 h-1 bg-current rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Note about admin access */}
      <div className="border-t pt-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 text-center">
            <strong>Note:</strong> Admin accounts are created by existing administrators only. 
            If you need admin access, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;