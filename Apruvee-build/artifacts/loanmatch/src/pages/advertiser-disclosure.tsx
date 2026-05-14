import { PageWrapper } from "@/components/layout/page-wrapper";
import { Link } from "wouter";

export default function AdvertiserDisclosure() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Advertiser Disclosure</h1>
        <p className="text-sm text-slate-500 mb-10">Last Updated: May 14, 2026</p>

        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-primary prose-strong:text-slate-900">

          <h2>How Apruvee Makes Money</h2>
          <p>
            Apruvee, LLC ("Apruvee") operates a free comparison marketplace for consumers seeking
            personal loans. We are compensated by our lending partners — the lenders whose offers
            appear on our platform — through referral fees when a consumer we have matched with a
            lender submits an application or obtains a loan through that lender.
          </p>
          <p>
            This compensation may influence which lenders appear on our platform and the order in
            which they are displayed. However, Apruvee does not accept payment to guarantee favorable
            reviews, ratings, or editorial coverage of any lender.
          </p>

          <h2>What This Means for You</h2>
          <p>
            The lender offers displayed on Apruvee's results page are from companies with which we
            have a commercial relationship. These are labeled as "Paid Partner" on our results page.
            Not all lenders or loan products available in the market are shown on our platform.
          </p>
          <p>
            Apruvee receives the same referral fee regardless of which lender you choose. We have no
            financial incentive to steer you toward any particular offer. Our goal is to show you the
            options most likely to match your credit profile so you can make an informed decision.
          </p>

          <h2>Estimated Rates and Terms</h2>
          <p>
            The APR ranges, monthly payment estimates, loan amounts, and terms shown on our results
            page are estimated ranges based on each lender's publicly available product information.
            They are not pre-qualified offers or guarantees. Your actual rate, loan amount, and terms
            will be determined by the lender based on a full review of your credit profile,
            income, and other factors — and may differ from the estimates shown.
          </p>

          <h2>We Are Not a Lender</h2>
          <p>
            Apruvee is a marketplace, not a lender, broker, or financial advisor. We do not originate
            loans, make credit decisions, or set interest rates. All loans are made by our lending
            partners under their own terms and underwriting criteria.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about our advertiser relationships or how we are compensated,
            please contact us at{" "}
            <a href="mailto:chris@apruvee.com">chris@apruvee.com</a> or{" "}
            <a href="tel:+19195189294">(919) 518-9294</a>.
          </p>

          <p>
            For more information, see our{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            {" "}and{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
