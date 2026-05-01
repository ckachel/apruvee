import { Link } from "wouter";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  category: string;
  publishedAt: string;
  comingSoon?: boolean;
}

const posts: Post[] = [
  {
    slug: "how-to-consolidate-credit-card-debt",
    title: "How to Consolidate Credit Card Debt: A Complete 2026 Guide",
    excerpt:
      "Learn how debt consolidation actually works, when it's the right move (and when it isn't), and how to choose between a personal loan, balance-transfer card, HELOC, or debt management plan — with real APR math.",
    readingTime: "12 min read",
    category: "Debt Consolidation",
    publishedAt: "April 28, 2026",
  },
  {
    slug: "personal-loan-vs-balance-transfer",
    title: "Personal Loan vs. Balance Transfer Card: Which Actually Saves More?",
    excerpt:
      "Both can lower the cost of your credit card debt — but in very different ways. We compare APRs, origination vs. transfer fees, credit score impact, and run the numbers on a real $10,000 balance.",
    readingTime: "11 min read",
    category: "Comparisons",
    publishedAt: "April 30, 2026",
  },
  {
    slug: "credit-score-for-consolidation-loan",
    title: "What Credit Score Do You Need for a Debt Consolidation Loan?",
    excerpt:
      "The honest answer: it depends on the lender. Most start at 580–660, but the rate you actually get depends on your tier. Here's the APR-by-credit-tier breakdown, plus what to do if your score is below 600.",
    readingTime: "10 min read",
    category: "Credit Basics",
    publishedAt: "April 30, 2026",
  },
  {
    slug: "how-soft-credit-pull-works",
    title: "How a Soft Credit Pull Works (and Why It Doesn't Hurt Your Score)",
    excerpt:
      "Soft pull, hard pull, prequalification, preapproval — what these terms actually mean, what lenders see, the FCRA rules behind them, and exactly when a hard pull is triggered. Plus a myth-vs-fact cheat sheet.",
    readingTime: "7 min read",
    category: "Credit Basics",
    publishedAt: "April 30, 2026",
  },
  {
    slug: "debt-consolidation-calculator",
    title: "Debt Consolidation Calculator: How Much Could You Save?",
    excerpt:
      "An interactive calculator plus three worked examples ($5K, $15K, $30K) showing exactly how much a consolidation loan could save you over 3 and 5 years — at different APRs, with the math explained.",
    readingTime: "9 min read",
    category: "Calculators",
    publishedAt: "April 30, 2026",
  },
];

export default function Blog() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Plain-English guides to paying off debt.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Honest, jargon-free articles to help you understand your options before you borrow.
            Written by people who actually do the math.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {posts.map((post) =>
              post.comingSoon ? (
                <article
                  key={post.slug}
                  className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 opacity-75"
                >
                  <div className="flex items-center gap-3 mb-3 text-sm text-slate-500">
                    <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded-md text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                    <span>·</span>
                    <span className="font-medium">Coming soon</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-700 mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
                </article>
              ) : (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3 text-sm text-slate-500">
                      <span className="px-2 py-1 bg-secondary text-primary rounded-md text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime}
                      </span>
                      <span>·</span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </article>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ready to see your loan options?
          </h2>
          <p className="text-slate-600 mb-8">
            Find out what rates you qualify for in 2 minutes — no impact to your credit score.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1"
          >
            Check My Options
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
