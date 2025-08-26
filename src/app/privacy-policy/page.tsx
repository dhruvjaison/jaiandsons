import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ARC Luxury',
  description: 'Privacy Policy for ARC Luxury residential project',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-6">
              Information Collection and Use
            </h2>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              At ARC Luxury, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website and services.
            </p>
            
            <h3 className="text-xl font-playfair font-bold text-slate-900 mb-4">
              Information We Collect
            </h3>
            
            <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
              <li>Personal information (name, email, phone number) when you submit enquiries</li>
              <li>Visit preferences and scheduling information</li>
              <li>Communication preferences and interaction history</li>
              <li>Website usage data and analytics information</li>
            </ul>
            
            <h3 className="text-xl font-playfair font-bold text-slate-900 mb-4">
              How We Use Your Information
            </h3>
            
            <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
              <li>To respond to your enquiries and schedule site visits</li>
              <li>To provide information about ARC Luxury project</li>
              <li>To improve our website and services</li>
              <li>To comply with legal requirements</li>
            </ul>
            
            <h3 className="text-xl font-playfair font-bold text-slate-900 mb-4">
              Contact Us
            </h3>
            
            <p className="text-slate-700">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: info@arc-luxury.com
              <br />
              Phone: +91 98765 43210
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 