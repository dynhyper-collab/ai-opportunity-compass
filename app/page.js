export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-slate-900">
              AI Worldview
            </div>
            <div className="text-xs text-slate-500">
              Opportunity Compass
            </div>
          </div>

          <div className="text-sm text-slate-600 hidden sm:block">
            AI Era Decision Tool
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">


          {/* Left Content */}
          <div>

            <div className="mb-8 inline-block">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                🧭 AI Opportunity Assessment · 5 minutes
              </span>
            </div>


            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight mb-6">

              AI is changing the world.

              <br />

              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Find your place
              </span>

              <br />

              in the new economy.

            </h1>


            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">

              Discover your AI opportunity profile based on your skills,
              experience and strengths — and explore how you can create value
              in the AI era.

            </p>


            <div className="flex flex-col sm:flex-row gap-4">

              <a
                href="/quiz"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Discover My Profile →
              </a>

            </div>

          </div>



          {/* Preview Card */}
          <div className="relative">

            <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full"></div>


            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-md mx-auto">


              <div className="text-sm text-slate-500 mb-4">
                Your AI Opportunity Profile
              </div>


              <div className="flex items-center gap-4 mb-6">

                <div className="text-4xl">
                  🧭
                </div>


                <div>

                  <div className="text-2xl font-bold text-slate-900">
                    Strategist
                  </div>

                  <div className="text-slate-500">
                    Connect ideas with opportunities
                  </div>

                </div>

              </div>


              <div className="space-y-3">


                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                  ✓ Pattern recognition
                </div>


                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                  ✓ Strategic thinking
                </div>


                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                  ✓ Cross-domain exploration
                </div>


              </div>


              <div className="mt-6 pt-6 border-t border-slate-100">

                <div className="text-sm text-slate-500 mb-2">
                  Possible paths
                </div>

                <div className="flex flex-wrap gap-2">

                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    AI Strategy
                  </span>

                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    Entrepreneurship
                  </span>

                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    Research
                  </span>

                </div>

              </div>


            </div>

          </div>


        </div>

      </section>



      {/* Features */}
      <section
        id="learn-more"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60"
      >

        <div className="max-w-5xl mx-auto">


          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Understand your AI-era opportunity
            </h2>

            <p className="text-lg text-slate-600">
              A simple framework to help you make better decisions.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8">


            <div className="p-8 rounded-xl bg-white border border-slate-200">
              
              <div className="text-3xl mb-4">
                🔍
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Understand Yourself
              </h3>

              <p className="text-slate-600">
                Identify your strengths, experience and working style.
              </p>

            </div>



            <div className="p-8 rounded-xl bg-white border border-slate-200">

              <div className="text-3xl mb-4">
                🌎
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Find Your Opportunity Zone
              </h3>

              <p className="text-slate-600">
                Discover where your profile fits in the AI economy.
              </p>

            </div>



            <div className="p-8 rounded-xl bg-white border border-slate-200">

              <div className="text-3xl mb-4">
                🚀
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Take Action
              </h3>

              <p className="text-slate-600">
                Get practical suggestions for your next steps.
              </p>

            </div>


          </div>


        </div>

      </section>



      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mx-auto text-center">


          <h2 className="text-4xl font-bold text-slate-900 mb-6">

            Ready to discover your AI path?

          </h2>


          <p className="text-lg text-slate-600 mb-8">

            Take the assessment and get your personalized AI opportunity profile.

          </p>


          <a
            href="/quiz"
            className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Assessment →
          </a>


        </div>

      </section>



      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 bg-slate-50">

        <div className="max-w-6xl mx-auto px-4 text-center">

          <div className="font-semibold text-slate-900 mb-2">
            AI Worldview
          </div>

          <div className="text-sm text-slate-600">
            Building tools for better decisions in the AI era.
          </div>

          <div className="text-xs text-slate-400 mt-4">
            © 2026 AI Worldview
          </div>

        </div>

      </footer>


    </main>
  );
}
