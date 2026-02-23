import React from 'react';
import { X } from 'lucide-react';
import logoImg from 'figma:asset/3b8a53a53ffbbad7e6a316f04169645e7f13c96b.png';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function LegalPageLayout({ title, children, onClose }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1F35]">
      <div className="sticky top-0 z-50 bg-white dark:bg-[#0A1F35] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-0 h-10 w-auto">
            <img src={logoImg} alt="Delt" className="h-full w-auto object-contain" />
            <span className="text-[#041E42] dark:text-white text-xl tracking-tight -ml-2 font-bold">Capital</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#041E42] dark:text-white mb-8">{title}</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}

export function TermsOfUse({ onClose }: { onClose?: () => void }) {
  return (
    <LegalPageLayout title="Terms of Use" onClose={onClose}>
      <p>Last updated: February 19, 2026</p>
      
      <h3>1. Agreement to Terms</h3>
      <p>By accessing or using the Delt Capital website and services, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      
      <h3>2. Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on Delt Capital's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
      <ul>
        <li>modify or copy the materials;</li>
        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
        <li>attempt to decompile or reverse engineer any software contained on Delt Capital's website;</li>
        <li>remove any copyright or other proprietary notations from the materials; or</li>
        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
      </ul>
      
      <h3>3. Disclaimer</h3>
      <p>The materials on Delt Capital's website are provided on an 'as is' basis. Delt Capital makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      
      <h3>4. Limitations</h3>
      <p>In no event shall Delt Capital or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Delt Capital's website, even if Delt Capital or a Delt Capital authorized representative has been notified orally or in writing of the possibility of such damage.</p>
      
      <h3>5. Accuracy of Materials</h3>
      <p>The materials appearing on Delt Capital's website could include technical, typographical, or photographic errors. Delt Capital does not warrant that any of the materials on its website are accurate, complete or current. Delt Capital may make changes to the materials contained on its website at any time without notice.</p>
      
      <h3>6. Links</h3>
      <p>Delt Capital has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Delt Capital of the site. Use of any such linked website is at the user's own risk.</p>
      
      <h3>7. Governing Law</h3>
      <p>These terms and conditions are governed by and construed in accordance with the laws of Delaware and you irrevocably submit to the exclusive jurisdiction of the courts in that State.</p>
    </LegalPageLayout>
  );
}

export function PrivacyPolicy({ onClose }: { onClose?: () => void }) {
  return (
    <LegalPageLayout title="Privacy Policy" onClose={onClose}>
      <p>Last updated: February 19, 2026</p>
      
      <h3>1. Information We Collect</h3>
      <p>We collect information that you provide directly to us, including:</p>
      <ul>
        <li>Name, email address, phone number, and mailing address</li>
        <li>Business information, including revenue, industry, and time in business</li>
        <li>Financial information required for qualification</li>
        <li>Identification documents for identity verification</li>
      </ul>
      
      <h3>2. How We Use Your Information</h3>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process your application for funding</li>
        <li>Communicate with you about products, services, offers, and events</li>
        <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
        <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
      </ul>
      
      <h3>3. Sharing of Information</h3>
      <p>We may share your information as follows:</p>
      <ul>
        <li>With our banking partners and funding sources to process your application</li>
        <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
        <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
      </ul>
      
      <h3>4. Data Security</h3>
      <p>We use reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use bank-grade encryption for all sensitive data transmission.</p>
      
      <h3>5. Your Choices</h3>
      <p>You may update, correct, or delete information about you at any time by contacting us. Note that we may retain certain information as required by law or for legitimate business purposes.</p>
    </LegalPageLayout>
  );
}

export function ElectronicCommunicationsAgreement({ onClose }: { onClose?: () => void }) {
  return (
    <LegalPageLayout title="Electronic Communications Agreement" onClose={onClose}>
      <p>Last updated: February 19, 2026</p>
      
      <h3>1. Scope of Communications to Be Provided in Electronic Form</h3>
      <p>You agree that we may provide you with any communications that we may be required to send to you by law or regulation in electronic format. These communications include, but are not limited to:</p>
      <ul>
        <li>Terms and conditions and policies you agree to (e.g., the Delt Capital Terms of Use and Privacy Policy), including updates to these agreements or policies;</li>
        <li>Disclosures and notices associated with your account;</li>
        <li>Transaction receipts or confirmations;</li>
        <li>Customer service communications; and</li>
        <li>Any other other communications related to your use of Delt Capital services.</li>
      </ul>
      
      <h3>2. Method of Providing Communications</h3>
      <p>We may provide communications to you by email or by posting them on the Delt Capital website or mobile application. All communications in either electronic or paper format will be considered to be "in writing."</p>
      
      <h3>3. How to Withdraw Consent</h3>
      <p>You may withdraw your consent to receive communications electronically by contacting us in writing. If you withdraw your consent, we reserve the right to close your account or charge you additional fees for paper copies.</p>
      
      <h3>4. Updating Your Contact Information</h3>
      <p>It is your responsibility to keep your primary email address up to date so that Delt Capital can communicate with you electronically. You understand and agree that if Delt Capital sends you an electronic communication but you do not receive it because your primary email address on file is incorrect, out of date, blocked by your service provider, or you are otherwise unable to receive electronic communications, Delt Capital will be deemed to have provided the communication to you.</p>
      
      <h3>5. Hardware and Software Requirements</h3>
      <p>In order to access and retain electronic communications, you will need a computer or mobile device with an internet connection, a valid email address, and software that allows you to view and save PDF files.</p>
    </LegalPageLayout>
  );
}
