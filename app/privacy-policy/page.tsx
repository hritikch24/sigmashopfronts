import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sigma Shop Fronts',
  description:
    'Read the Privacy Policy for Sigma Shopfronts and Shutter Limited. Learn how we collect, use, and protect your personal data in accordance with UK GDPR.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="section-padding">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[{ label: 'Privacy Policy' }]}
          />

          <h1 className="text-4xl md:text-5xl font-bold text-navy mt-4 mb-2">
            Privacy Policy
          </h1>
          <p className="text-grey-500 text-sm mb-10">Last updated: May 2026</p>

          <div className="prose-content space-y-10 text-grey-700 leading-relaxed">

            {/* Introduction */}
            <section>
              <p>
                Sigma Shopfronts and Shutter Limited (<strong className="text-navy">&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;</strong>) is committed to protecting and respecting your privacy. This policy explains what personal data we collect, how we use it, and your rights in relation to it. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
              <p className="mt-4">
                Please read this policy carefully. By using our website or contacting us, you acknowledge that you have read and understood this policy.
              </p>
            </section>

            {/* 1. Data Controller */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Data Controller</h2>
              <p>The data controller responsible for your personal data is:</p>
              <address className="not-italic mt-4 pl-4 border-l-4 border-gold space-y-1">
                <p className="font-semibold text-navy">Sigma Shopfronts and Shutter Limited</p>
                <p>Company No: 16794487</p>
                <p>West Midlands, United Kingdom</p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:sales@sigmashopfronts.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    sales@sigmashopfronts.com
                  </a>
                </p>
              </address>
              <p className="mt-4">
                If you have any questions about this privacy policy or how we handle your data, please contact us at the address above.
              </p>
            </section>

            {/* 2. What Personal Data We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. What Personal Data We Collect</h2>
              <p>We collect personal data through three main channels:</p>

              <h3 className="text-lg font-semibold text-navy mt-6 mb-2">2.1 Contact Form</h3>
              <p>When you submit an enquiry through our contact form, we collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Telephone number (if provided)</li>
                <li>Location or site address</li>
                <li>Service of interest (e.g. aluminium shopfronts, roller shutters, security grilles)</li>
                <li>The content of your message</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy mt-6 mb-2">2.2 Chatbot Conversations</h3>
              <p>
                Our website features an AI-powered chatbot to assist with initial enquiries. If you use it, we collect:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The content of your conversation with the chatbot</li>
                <li>Any contact details or project information you provide during the conversation</li>
              </ul>
              <p className="mt-2 text-grey-500 text-sm">
                Conversation data is processed by Anthropic&rsquo;s Claude AI (see Section 5).
              </p>

              <h3 className="text-lg font-semibold text-navy mt-6 mb-2">2.3 Analytics and Cookies</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP address (anonymised where possible)</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring URL</li>
                <li>Cookie identifiers (see Section 7)</li>
              </ul>
            </section>

            {/* 3. How We Use Your Data */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">3. How We Use Your Personal Data</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong className="text-navy">Responding to enquiries</strong> — to reply to your questions, requests for information, or site survey requests.
                </li>
                <li>
                  <strong className="text-navy">Preparing and sending quotations</strong> — to produce accurate, tailored quotes for shopfront installation, repair, or maintenance work.
                </li>
                <li>
                  <strong className="text-navy">Fulfilling contracts</strong> — to manage and perform the services you have engaged us to provide.
                </li>
                <li>
                  <strong className="text-navy">Improving our services and website</strong> — to analyse how visitors use our site and identify areas for improvement.
                </li>
                <li>
                  <strong className="text-navy">Legal and regulatory compliance</strong> — to comply with our obligations under applicable law.
                </li>
              </ul>
              <p className="mt-4">
                We will not use your personal data for automated decision-making or profiling that produces legal or similarly significant effects.
              </p>
            </section>

            {/* 4. Legal Basis */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Legal Basis for Processing</h2>
              <p>Under UK GDPR, we must have a lawful basis for processing your personal data. We rely on:</p>
              <div className="mt-4 space-y-4">
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Legitimate Interests (Article 6(1)(f))</p>
                  <p className="mt-1">
                    Processing enquiry and chatbot data to respond to potential customers and improve our services. We have balanced our interests against your rights and determined this processing is necessary and proportionate.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Contractual Necessity (Article 6(1)(b))</p>
                  <p className="mt-1">
                    Processing data necessary to fulfil a contract you have entered into with us, or to take steps at your request before entering a contract (such as preparing a quotation).
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Consent (Article 6(1)(a))</p>
                  <p className="mt-1">
                    Where we place non-essential cookies or use analytics tools, we will ask for your consent. You may withdraw consent at any time by adjusting your cookie preferences.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Legal Obligation (Article 6(1)(c))</p>
                  <p className="mt-1">
                    Processing necessary to comply with a legal obligation to which we are subject, such as tax and accounting requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Third Parties */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Third-Party Service Providers</h2>
              <p>
                We share your data with the following trusted third-party providers solely to operate our business and deliver our services. Each provider is contractually obligated to handle your data securely and only as instructed.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-grey-100">
                      <th className="text-left px-4 py-3 font-semibold text-navy border border-grey-200">Provider</th>
                      <th className="text-left px-4 py-3 font-semibold text-navy border border-grey-200">Purpose</th>
                      <th className="text-left px-4 py-3 font-semibold text-navy border border-grey-200">Data Transferred</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey-200">
                    <tr className="hover:bg-grey-50">
                      <td className="px-4 py-3 border border-grey-200 font-medium">Vercel Inc.</td>
                      <td className="px-4 py-3 border border-grey-200">Website hosting and deployment</td>
                      <td className="px-4 py-3 border border-grey-200">IP address, request logs</td>
                    </tr>
                    <tr className="hover:bg-grey-50">
                      <td className="px-4 py-3 border border-grey-200 font-medium">Neon Technologies</td>
                      <td className="px-4 py-3 border border-grey-200">Database storage for form submissions and chatbot logs</td>
                      <td className="px-4 py-3 border border-grey-200">Contact form data, chatbot conversation data</td>
                    </tr>
                    <tr className="hover:bg-grey-50">
                      <td className="px-4 py-3 border border-grey-200 font-medium">Resend Inc.</td>
                      <td className="px-4 py-3 border border-grey-200">Transactional email delivery (sending enquiry notifications)</td>
                      <td className="px-4 py-3 border border-grey-200">Name, email address, message content</td>
                    </tr>
                    <tr className="hover:bg-grey-50">
                      <td className="px-4 py-3 border border-grey-200 font-medium">Anthropic PBC</td>
                      <td className="px-4 py-3 border border-grey-200">AI chatbot processing (Claude)</td>
                      <td className="px-4 py-3 border border-grey-200">Chatbot conversation content</td>
                    </tr>
                    <tr className="hover:bg-grey-50">
                      <td className="px-4 py-3 border border-grey-200 font-medium">Google LLC</td>
                      <td className="px-4 py-3 border border-grey-200">Website analytics (Google Analytics)</td>
                      <td className="px-4 py-3 border border-grey-200">Anonymised IP, page views, device data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                We do not sell your personal data to any third party. We do not share your data with any other organisations except where required by law or with your explicit consent.
              </p>
              <p className="mt-2">
                Some of our service providers are based outside the United Kingdom. Where data is transferred internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the ICO.
              </p>
            </section>

            {/* 6. Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">6. How Long We Keep Your Data</h2>
              <p>We retain your personal data only for as long as is necessary for the purposes for which it was collected:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong className="text-navy">Enquiries that do not result in a contract:</strong> Up to 12 months from receipt, after which they are securely deleted.
                </li>
                <li>
                  <strong className="text-navy">Enquiries that result in a contract:</strong> For the duration of the contract and for 6 years thereafter, in accordance with the Limitation Act 1980.
                </li>
                <li>
                  <strong className="text-navy">Chatbot conversation logs:</strong> Up to 90 days, unless the conversation leads to an enquiry or contract, in which case the relevant data is retained as above.
                </li>
                <li>
                  <strong className="text-navy">Analytics data:</strong> Up to 26 months, as per Google Analytics default retention settings.
                </li>
                <li>
                  <strong className="text-navy">Financial and accounting records:</strong> 6 years from the end of the relevant tax year, as required by HMRC.
                </li>
              </ul>
            </section>

            {/* 7. Cookie Policy */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">7. Cookie Policy</h2>
              <p>
                Our website uses cookies — small text files placed on your device — to improve functionality and analyse usage. The types of cookies we use are:
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-semibold text-navy">Strictly Necessary Cookies</p>
                  <p className="mt-1">
                    Required for the website to function correctly (e.g. session management). These cannot be disabled.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Analytics Cookies</p>
                  <p className="mt-1">
                    Set by Google Analytics to help us understand how visitors interact with our website. These are only placed with your consent. You may opt out at any time.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                You can control and delete cookies through your browser settings. For more information about cookies and how to manage them, visit{' '}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  www.allaboutcookies.org
                </a>.
              </p>
            </section>

            {/* 8. Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">8. Your Rights Under UK GDPR</h2>
              <p>
                Under UK data protection law, you have the following rights in relation to your personal data:
              </p>
              <div className="mt-4 space-y-4">
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Right of Access</p>
                  <p className="mt-1">You have the right to request a copy of the personal data we hold about you (a Subject Access Request).</p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Right to Rectification</p>
                  <p className="mt-1">You may request that we correct any inaccurate or incomplete personal data we hold about you.</p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;)</p>
                  <p className="mt-1">You may request that we delete your personal data in certain circumstances (e.g. where it is no longer necessary for the purpose for which it was collected).</p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Right to Data Portability</p>
                  <p className="mt-1">Where processing is based on consent or contractual necessity, you may request that we provide your data in a structured, commonly used, machine-readable format.</p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Right to Object</p>
                  <p className="mt-1">You have the right to object to processing based on legitimate interests. We will stop processing unless we can demonstrate compelling legitimate grounds that override your interests.</p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Right to Restrict Processing</p>
                  <p className="mt-1">You may request that we restrict processing in certain circumstances, such as while we verify the accuracy of your data following a rectification request.</p>
                </div>
                <div className="pl-4 border-l-2 border-grey-200">
                  <p className="font-semibold text-navy">Right to Withdraw Consent</p>
                  <p className="mt-1">Where processing is based on your consent, you may withdraw it at any time without affecting the lawfulness of processing carried out before withdrawal.</p>
                </div>
              </div>
              <p className="mt-4">
                To exercise any of these rights, please contact us using the details in Section 9. We will respond within one calendar month. We may need to verify your identity before processing your request.
              </p>
            </section>

            {/* 9. Contact for Data Requests */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">9. Contact Us About Your Data</h2>
              <p>
                To make a data subject request, raise a concern, or ask any question about this privacy policy, please contact us:
              </p>
              <address className="not-italic mt-4 pl-4 border-l-4 border-gold space-y-1">
                <p className="font-semibold text-navy">Sigma Shopfronts and Shutter Limited</p>
                <p>Data Enquiries</p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:sales@sigmashopfronts.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    sales@sigmashopfronts.com
                  </a>
                </p>
              </address>
              <p className="mt-4">
                We will acknowledge your request within 5 working days and respond in full within one calendar month. If your request is particularly complex or we receive a high volume of requests, we may extend this period by a further two months, but we will notify you if this is the case.
              </p>
            </section>

            {/* 10. Complaints */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">10. Right to Complain to the ICO</h2>
              <p>
                If you are unhappy with how we have handled your personal data, you have the right to lodge a complaint with the Information Commissioner&rsquo;s Office (ICO), the UK supervisory authority for data protection:
              </p>
              <address className="not-italic mt-4 pl-4 border-l-4 border-gold space-y-1">
                <p className="font-semibold text-navy">Information Commissioner&rsquo;s Office</p>
                <p>Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</p>
                <p>
                  Website:{' '}
                  <a
                    href="https://www.ico.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    www.ico.org.uk
                  </a>
                </p>
                <p>Helpline: 0303 123 1113</p>
              </address>
              <p className="mt-4">
                We would, however, appreciate the opportunity to address your concerns before you contact the ICO. Please do get in touch with us first.
              </p>
            </section>

            {/* 11. Changes */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices, technology, or legal requirements. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
              </p>
              <p className="mt-4">
                Continued use of our website or services after changes are posted constitutes your acceptance of the revised policy.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
