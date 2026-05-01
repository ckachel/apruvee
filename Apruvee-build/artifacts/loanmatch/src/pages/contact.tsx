import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function Contact() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>Get in touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            We're here to help.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Questions about your loan options? Looking to partner with us? We read every message.
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Email us</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The fastest way to reach us. We respond to most emails within one business day.
              </p>
              <a
                href="mailto:chris@apruvee.com"
                className="text-primary font-semibold text-lg hover:underline break-all"
              >
                chris@apruvee.com
              </a>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Call or text</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Prefer to talk? Leave a message if we don't pick up — we'll call you back the same day.
              </p>
              <a
                href="tel:+19195189294"
                className="text-primary font-semibold text-lg hover:underline"
              >
                (919) 518-9294
              </a>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Mailing address</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                For paper correspondence and legal notices.
              </p>
              <address className="not-italic text-slate-900 font-medium leading-relaxed">
                Apruvee, LLC<br />
                4030 Wake Forest Road, STE 349<br />
                Raleigh, NC 27609
              </address>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Support hours</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">All times Eastern.</p>
              <ul className="text-slate-900 font-medium space-y-1">
                <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
                <li>Saturday: 10:00 AM – 2:00 PM</li>
                <li className="text-slate-500 font-normal">Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specific contacts */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Who to contact</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Borrower questions</h3>
              <p className="text-slate-600 mb-2">
                Help with your application, questions about lender offers, or trouble using the site.
              </p>
              <a href="mailto:chris@apruvee.com" className="text-primary font-semibold hover:underline">
                chris@apruvee.com
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Lender &amp; affiliate partnerships</h3>
              <p className="text-slate-600 mb-2">
                Interested in becoming an Apruvee partner? We'd love to talk. Please attach your media kit
                and a brief overview of your loan products.
              </p>
              <a href="mailto:chris@apruvee.com" className="text-primary font-semibold hover:underline">
                chris@apruvee.com
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Press &amp; media inquiries</h3>
              <p className="text-slate-600 mb-2">
                Writing a story about personal finance, debt consolidation, or fintech marketplaces?
                We're happy to provide commentary or interviews.
              </p>
              <a href="mailto:chris@apruvee.com" className="text-primary font-semibold hover:underline">
                chris@apruvee.com
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Privacy &amp; data requests</h3>
              <p className="text-slate-600 mb-2">
                To exercise your rights under CCPA, GDPR, or other privacy laws — including data
                deletion or opt-out requests.
              </p>
              <a href="mailto:chris@apruvee.com" className="text-primary font-semibold hover:underline">
                chris@apruvee.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-slate-50 border-l-4 border-primary p-6 rounded-r-xl text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-2">A note about urgent financial situations</p>
            <p>
              If you're facing immediate financial hardship — past-due bills, threatened utility
              shutoff, or imminent eviction — a personal loan may not be the right tool. We strongly
              recommend speaking with a free, nonprofit credit counselor first. Visit{" "}
              <a href="https://www.nfcc.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                nfcc.org
              </a>{" "}
              to find one in your area.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
