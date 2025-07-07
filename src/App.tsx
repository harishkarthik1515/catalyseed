import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import SuccessStories from './components/SuccessStories';
import AllSuccessStories from './components/AllSuccessStories';
import AllHackathons from './components/AllHackathons';
import UserProfile from './components/UserProfile';
import Hackathons from './components/Hackathons';
import Community from './components/Community';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
          <Routes>
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="/*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={
                    <>
                      <Hero />
                      <SuccessStories />
                      <Hackathons />
                      <Community />
                      <Testimonials />
                    </>
                  } />
                  <Route path="/success-stories" element={<AllSuccessStories />} />
                  <Route path="/hackathons" element={<AllHackathons />} />
                  <Route path="/profile" element={<UserProfile />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;