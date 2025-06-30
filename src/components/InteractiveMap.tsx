import React, { useState } from 'react';
import { ArrowRight, Sparkles, Target, TrendingUp, Users, Calendar, MapPin, Rocket } from 'lucide-react';

const InteractiveMap: React.FC = () => {
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-red-500/10 via-red-600/5 to-transparent rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-8 lg:py-0">
          
          {/* Left Map Section */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            {/* Enhanced Tamil Nadu Map */}
            <div className="relative w-full max-w-lg h-[400px] lg:h-[500px] flex items-center justify-center">
              <img 
                src="/Tamil_Nadu_Outline_Map-removebg-preview.png" 
                alt="Tamil Nadu Map" 
                className="w-full h-full object-contain filter brightness-150 contrast-125 drop-shadow-2xl"
                style={{ 
                  filter: 'brightness(2) contrast(1.5) drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                  transform: 'scale(1.05)'
                }}
              />
              
              {/* Subtle Glow Effect Around Map */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-red-500/5 rounded-full"></div>
            </div>
          </div>

          {/* Right Content Section - Moved Up */}
          <div className="space-y-6 text-white order-1 lg:order-2 lg:-mt-16">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-red-300 text-sm font-semibold border border-red-500/20">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              Innovation Hub of Tamil Nadu
            </div>
            
            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                First Innovation
                <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Ecosystem
                </span>
                <span className="block text-gray-300">Platform</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl font-light">
                Catalyseed, a platform showcasing innovation and entrepreneurship activities across Tamil Nadu's educational institutes
              </p>
            </div>

            {/* Compact CTA Section */}
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <div className="h-px bg-gradient-to-r from-red-500 to-transparent flex-1"></div>
                <Sparkles className="h-4 w-4 text-red-400" />
                <div className="h-px bg-gradient-to-l from-red-500 to-transparent flex-1"></div>
              </div>
              
              {/* Compact CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                {/* Primary CTA Button - Compact */}
                <button 
                  className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-2.5 px-5 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center text-sm border border-red-400/30"
                  onMouseEnter={() => setPrimaryHovered(true)}
                  onMouseLeave={() => setPrimaryHovered(false)}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center space-x-2">
                    <Rocket className={`h-4 w-4 transition-all duration-300 ${primaryHovered ? 'animate-bounce' : ''}`} />
                    <span className="font-bold">
                      {primaryHovered ? 'Launch Journey' : 'Discover Now'}
                    </span>
                    <ArrowRight className={`h-4 w-4 transition-all duration-300 ${primaryHovered ? 'translate-x-1' : ''}`} />
                  </div>
                </button>
                
                {/* Secondary CTA Button - Compact */}
                <button 
                  className="group relative overflow-hidden bg-white/5 backdrop-blur-sm text-white py-2.5 px-5 rounded-xl transition-all duration-300 font-semibold border border-white/20 hover:bg-white/10 hover:border-white/40 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center text-sm"
                  onMouseEnter={() => setSecondaryHovered(true)}
                  onMouseLeave={() => setSecondaryHovered(false)}
                >
                  <div className="relative flex items-center space-x-2">
                    <Target className={`h-4 w-4 transition-all duration-300 ${secondaryHovered ? 'text-red-400' : ''}`} />
                    <span className="font-semibold">
                      {secondaryHovered ? 'Explore Events' : 'View Events'}
                    </span>
                    <Calendar className={`h-4 w-4 transition-all duration-300 ${secondaryHovered ? 'scale-110 text-red-400' : ''}`} />
                  </div>
                </button>
              </div>

              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                {[
                  { icon: Target, text: 'Live 24/7', color: 'green' },
                  { icon: Users, text: '50+ Institutes', color: 'blue' },
                  { icon: TrendingUp, text: '200+ Stories', color: 'purple' }
                ].map(({ icon: Icon, text, color }, index) => (
                  <div key={index} className="group flex items-center space-x-2 cursor-pointer hover:text-white transition-colors duration-200">
                    <div className={`w-1.5 h-1.5 bg-${color}-500 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-200`}></div>
                    <span className="group-hover:font-semibold transition-all duration-200">{text}</span>
                    <Icon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                ))}
              </div>

              {/* Compact Call-to-Action Subtitle */}
              <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <p className="text-center text-gray-300 text-xs">
                  <span className="text-red-400 font-semibold">Join 10,000+</span> innovators discovering opportunities
                </p>
                <div className="flex justify-center mt-1 space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { number: '50+', label: 'Institutes', color: 'from-red-400 to-red-500' },
                { number: '200+', label: 'Startups', color: 'from-orange-400 to-red-400' },
                { number: '75+', label: 'Events', color: 'from-red-500 to-red-600' },
                { number: '32', label: 'Districts', color: 'from-red-600 to-red-700' }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className={`text-lg md:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;