import React, { useState } from 'react';
import { HelpCircle, Search, MessageSquare, FileText, Book, Video, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const HelpSupport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I create a new event?',
      answer: 'To create a new event, navigate to the Events section in your dashboard and click on the "Create Event" button. Fill in the required details such as event title, date, location, and description. You can also add additional information like event capacity, registration details, and event image.'
    },
    {
      id: 2,
      question: 'How can I connect with other users?',
      answer: 'You can connect with other users by visiting their profile and clicking on the "Connect" button. You can also find potential connections in the "Connections" tab of your profile, where we suggest users based on your interests, industry, and mutual connections.'
    },
    {
      id: 3,
      question: 'How do I update my profile information?',
      answer: 'To update your profile information, go to your profile page and click on the "Edit Profile" button. You can update your personal information, professional details, expertise, and achievements. Don\'t forget to save your changes when you\'re done.'
    },
    {
      id: 4,
      question: 'What are the benefits of a verified account?',
      answer: 'Verified accounts enjoy higher visibility in search results, increased credibility with other users, access to exclusive features, and priority support. To get verified, you need to complete your profile and submit verification documents through the settings page.'
    },
    {
      id: 5,
      question: 'How can I track my startup\'s performance?',
      answer: 'Founders can track their startup\'s performance through the dashboard, which provides metrics like user growth, revenue trends, and engagement statistics. You can also set up custom KPIs to monitor specific aspects of your business performance.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600">Find answers and get assistance</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Support</h3>
          </div>
          <p className="text-gray-600 mb-4">Get in touch with our support team for personalized assistance</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Start Chat
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
          </div>
          <p className="text-gray-600 mb-4">Explore our comprehensive guides and documentation</p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            View Docs
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Video Tutorials</h3>
          </div>
          <p className="text-gray-600 mb-4">Watch step-by-step video guides on using the platform</p>
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
            Watch Videos
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
        
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">{faq.question}</h4>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No results found</h4>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Help Resources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Resources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Getting Started Guide', description: 'Learn the basics of using the platform', icon: Book, color: 'text-blue-600 bg-blue-100' },
            { title: 'API Documentation', description: 'Technical documentation for developers', icon: FileText, color: 'text-green-600 bg-green-100' },
            { title: 'Community Forums', description: 'Connect with other users and share knowledge', icon: MessageSquare, color: 'text-purple-600 bg-purple-100' },
            { title: 'Webinars & Workshops', description: 'Join live training sessions', icon: Video, color: 'text-red-600 bg-red-100' }
          ].map((resource, index) => {
            const Icon = resource.icon;
            const [bgColor, textColor] = resource.color.split(' ');
            return (
              <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${bgColor}`}>
                  <Icon className={`h-5 w-5 ${textColor}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <a href="#" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center">
                    Learn more
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Email Support</h4>
            <p className="text-sm text-gray-600 mb-2">For general inquiries and support</p>
            <a href="mailto:support@catalyseed.in" className="text-red-600 hover:text-red-700">
              support@catalyseed.in
            </a>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Phone Support</h4>
            <p className="text-sm text-gray-600 mb-2">Available Monday-Friday, 9am-6pm</p>
            <a href="tel:+919876543210" className="text-red-600 hover:text-red-700">
              +91 98765 43210
            </a>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Office Address</h4>
            <p className="text-sm text-gray-600 mb-2">Visit our headquarters</p>
            <address className="text-sm text-gray-600 not-italic">
              123 Innovation Street<br />
              Chennai, Tamil Nadu<br />
              India - 600001
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;