import React, { useState } from 'react';
import Header from './components/Header';
import InteractiveMap from './components/InteractiveMap';
import { FilterProvider } from './components/GlobalFilter';
import HackathonsSection from './components/HackathonsSection';
import SuccessStories from './components/SuccessStories';
import ECellAwards from './components/ECellAwards';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <FilterProvider>
      <div className="min-h-screen bg-white">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main>
          <InteractiveMap />
          <HackathonsSection />
          <SuccessStories />
          <ECellAwards />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </FilterProvider>
  );
}

export default App;