import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Apruvee</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-5">
              Your trusted guide to finding the right debt consolidation loan.
              We help you compare offers from top lenders in one place,
              with no impact to your credit score to check rates.
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                <span>4030 Wake Forest Road, STE 349<br />Raleigh, NC 27609</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-slate-500" />
                <a href="mailto:chris@apruvee.com" className="hover:text-white transition-colors">chris@apruvee.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-slate-500" />
                <a href="tel:+19195189294" className="hover:text-white transition-colors">(919) 518-9294</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/apply" className="hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 space-y-4 text-xs text-slate-500 leading-relaxed">
          <p className="text-sm font-semibold text-slate-300">
            Apruvee is a marketplace, not a lender.
          </p>
          <p>
            Apruvee, LLC operates an online comparison marketplace and is compensated by our network
            of lending partners when borrowers obtain loans through our platform. We do not make
            credit decisions, set interest rates, or originate loans. All loans are made by our
            lending partners, who have their own underwriting criteria and may decline applications
            for any reason permitted by law.
          </p>
          <p>
            *APR ranges from 5.40% to 35.99%. For example, with a loan amount of $10,000 and an APR of 15% over a 36-month term, the monthly payment would be approximately $346.65, resulting in a total repayment of $12,479.40. Actual rates and terms vary depending on the lender, your credit history, loan amount, and other factors.
          </p>
          <p>
            Checking your rates on Apruvee does not affect your credit score. If you proceed with an application with a specific lender, they will perform a hard credit inquiry which may impact your credit score.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Apruvee, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
