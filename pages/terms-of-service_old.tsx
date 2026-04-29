import { useState } from 'react';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import SignupModal from '../src/components/SignupModal';
import SeoHead from '../src/components/SeoHead';

export default function TermsOfService() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');

  const handleSignup = (plan: string = 'free') => {
    setSelectedPlan(plan);
    setShowSignupModal(true);
  };

  return (
    <>
      <SeoHead
        title="Terms of Service - Prochar.xyz"
        description="Read our Terms of Service for using the Prochar Email Marketing Platform"
        url="https://prochar.xyz/terms-of-service"
        canonicalUrl="https://prochar.xyz/terms-of-service"
      />
      <div className="min-h-screen bg-white text-slate-900 antialiased">
        <Navbar onSignup={() => handleSignup('free')} />
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-16 lg:py-24 mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600">
              Last updated: April 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using Prochar.xyz, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on Prochar.xyz for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the site</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Disclaimer</h2>
              <p className="text-slate-600 leading-relaxed">
                The materials on Prochar.xyz are provided on an 'as is' basis. Prochar.xyz makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitations</h2>
              <p className="text-slate-600 leading-relaxed">
                In no event shall Prochar.xyz or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Prochar.xyz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Accuracy of Materials</h2>
              <p className="text-slate-600 leading-relaxed">
                The materials appearing on Prochar.xyz could include technical, typographical, or photographic errors. Prochar.xyz does not warrant that any of the materials on the site are accurate, complete, or current. Prochar.xyz may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Links</h2>
              <p className="text-slate-600 leading-relaxed">
                Prochar.xyz has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Prochar.xyz of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Modifications</h2>
              <p className="text-slate-600 leading-relaxed">
                Prochar.xyz may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. User Content</h2>
              <p className="text-slate-600 leading-relaxed">
                Any content provided by users on Prochar.xyz remains the intellectual property of the user. By posting content, you grant Prochar.xyz and other users a non-exclusive, royalty-free license to use, reproduce, modify and distribute your content in connection with the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact Information</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: hello@prochar.xyz
                <br />
                Phone: +880 171 234 5678
              </p>
            </section>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-slate-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        selectedPlan={selectedPlan}
      />
    </>
  );
}
