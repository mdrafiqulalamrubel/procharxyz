import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Statistics from './components/Statistics';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Partners from './components/Partners';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';

export default function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handleSignup = (plan: string = 'free') => {
    setSelectedPlan(plan);
    setShowSignupModal(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar onSignup={() => handleSignup('free')} />
      <Hero />
      <HowItWorks />
      <Statistics />
      <Pricing onSignup={handleSignup} />
      <Features />
      <Partners />
      <Testimonials />
      <Blog />
      <Contact />
      <CTA onSignup={() => handleSignup('free')} />
      <Footer />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
