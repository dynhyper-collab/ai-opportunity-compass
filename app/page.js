export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">AI Compass</div>
          <div className="text-sm text-slate-600">Discover Your Opportunity</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
              ✨ Navigate the AI Era with Confidence
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Discover Your AI<br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Opportunity Profile
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Understand how you can create value in the AI era. Get personalized insights into your unique opportunities and start building your future today.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="/quiz"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Assessment
            </a>
            <a
              href="#learn-more"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg border border-slate-200 transition-colors duration-200"
            >
              Learn More
            </a>
          </div>

          {/* Social Proof */}
          <div className="text-sm text-slate-500">
            Join thousands discovering their AI opportunities
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Personalized Insights</h3>
              <p className="text-slate-600">Get tailored recommendations based on your unique skills and interests in the AI landscape.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Actionable Guidance</h3>
              <p className="text-slate-600">Discover concrete steps to position yourself for success in the rapidly evolving AI economy.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Future-Ready Skills</h3>
              <p className="text-slate-600">Understand which competencies matter most for creating value in your field.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Ready to explore your opportunities?</h2>
          <p className="text-lg text-slate-600 mb-8">Take our assessment and unlock personalized insights in just 5 minutes.</p>
          <a
            href="/quiz"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Assessment
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Assessment</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Results</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2024 AI Opportunity Compass. Navigate the AI era with confidence.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
