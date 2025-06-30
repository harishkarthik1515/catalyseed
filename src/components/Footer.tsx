import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/calayseed logo.png" 
                alt="Catalyseed" 
                className="h-12 w-auto"
              />
              <div className="h-8 w-px bg-gradient-to-b from-red-500 to-transparent"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Innovation Hub
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Catalyseed is Tamil Nadu's premier platform showcasing innovation and entrepreneurship 
              activities across educational institutes, fostering the next generation of startups and innovators.
            </p>
            
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Instagram, href: '#', label: 'Instagram' }
              ].map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  className="group p-3 bg-white/5 rounded-full border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-red-600"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Hackathons', href: '#hackathons' },
                { label: 'Success Stories', href: '#success-stories' },
                { label: 'E-Cell Awards', href: '#awards' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'About Us', href: '#' },
                { label: 'Contact', href: '#' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a 
                    href={href} 
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center group"
                  >
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white relative">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-red-600"></div>
            </h3>
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'info@catalyseed.in', href: 'mailto:info@catalyseed.in' },
                { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: MapPin, text: 'Chennai, Tamil Nadu\nIndia - 600001', href: '#' }
              ].map(({ icon: Icon, text, href }, index) => (
                <a 
                  key={index}
                  href={href}
                  className="flex items-start space-x-3 text-gray-300 hover:text-red-400 transition-colors duration-200 group"
                >
                  <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                    <Icon className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="whitespace-pre-line text-sm leading-relaxed">{text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2024 Catalyseed. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>in Tamil Nadu</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {[
                'Privacy Policy',
                'Terms of Service', 
                'Cookie Policy',
                'Sitemap'
              ].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;