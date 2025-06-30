import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import InteractiveMap from './components/InteractiveMap';
import { FilterProvider } from './components/GlobalFilter';
import HackathonsSection from './components/HackathonsSection';
import SuccessStories from './components/SuccessStories';
import ECellAwards from './components/ECellAwards';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import UserProfile from './components/profile/UserProfile';
import ForumPage from './components/forum/ForumPage';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const { loading } = useAuth();

  // Check URL to determine which page to show
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/dashboard') {
      setCurrentPage('dashboard');
    } else if (path === '/profile') {
      setCurrentPage('profile');
    } else if (path === '/forum') {
      setCurrentPage('forum');
    } else {
      setCurrentPage('home');
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <FilterProvider>
      <div className="min-h-screen bg-white">
        {/* Dashboard page */}
        {currentPage === 'dashboard' && (
          <Dashboard onNavigate={setCurrentPage} />
        )}

        {/* Profile page */}
        {currentPage === 'profile' && (
          <UserProfile onNavigate={setCurrentPage} />
        )}

        {/* Forum page */}
        {currentPage === 'forum' && (
          <div className="min-h-screen bg-gray-50">
            <Header 
              isMenuOpen={isMenuOpen} 
              setIsMenuOpen={setIsMenuOpen}
              onNavigate={setCurrentPage}
            />
            <ForumPage onNavigate={setCurrentPage} />
            <Footer />
          </div>
        )}

        {/* Main home page */}
        {currentPage === 'home' && (
          <div className="min-h-screen bg-white">
            <Header 
              isMenuOpen={isMenuOpen} 
              setIsMenuOpen={setIsMenuOpen}
              onNavigate={setCurrentPage}
            />
            <main>
              <InteractiveMap />
              <HackathonsSection />
              <SuccessStories />
              <ECellAwards />
              <Testimonials />
            </main>
            <Footer />
          </div>
        )}
      </div>
    </FilterProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;