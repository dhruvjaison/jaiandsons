import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use - ARC Luxury',
  description: 'Terms of Use for ARC Luxury residential project',
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-8">
          Terms of Use
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-6">
              Agreement to Terms
            </h2>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              By accessing and using the ARC Luxury website and services, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h3 className="text-xl font-playfair font-bold text-slate-900 mb-4">
              Use License
            </h3>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              Permission is granted to temporarily download one copy of the materials on ARC Luxury&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            
            <h3 className="text-xl font-playfair font-bold text-slate-900 mb-4">
              Property Information
            </h3>
            
            <ul className="list-disc list-inside text-slate-700 mb-6 space-y-2">
              <li>All property information is subject to change without notice</li>
              <li>Images and renderings are for representational purposes only</li>
              <li>Actual specifications may vary from those shown</li>
              <li>Prices are subject to change and availability</li>
            </ul>
            
            <h3 className="text-xl font-playfair font-bold text-slate-900 mb-4">
              RERA Compliance
            </h3>
            
            <p className="text-slate-700 mb-6 leading-relaxed">
              This project is registered under RERA (Real Estate Regulatory Authority) with registration number UP-RERA-2023-001234. All information provided complies with RERA guidelines and regulations.
            </p>
            
            <h3 className="text-xl font-playfair font-bold text-slate-900 mb-4">
              Contact Information
            </h3>
            
            <p className="text-slate-700">
              For questions regarding these Terms of Use, please contact:
              <br />
              Email: info@arc-luxury.com
              <br />
              Phone: +91 98765 43210
              <br />
              Address: ARC Luxury, Sector 62, Noida, Uttar Pradesh 201309
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 