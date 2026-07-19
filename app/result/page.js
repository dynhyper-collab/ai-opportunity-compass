'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would calculate the profile based on quiz selections
    // For now, we're showing a placeholder profile
    const mockProfile = {
      id: 'explorer',
      name: 'The AI Explorer',
      icon: '🧭',
      description:
        'You are an adaptable and curious professional who sees the potential in AI across multiple domains. You are not confined to a single approach—instead, you explore how AI can be applied to solve problems, create value, and drive innovation in your field.',
      strengths: [
        'Curiosity and willingness to experiment with new AI tools and approaches',
        'Versatility across multiple AI applications and use cases',
        'Ability to identify opportunities for AI integration in diverse contexts',
        'Strong foundation for continuous learning and adaptation',
        'Bridge-builder between technical and non-technical teams'
      ],
      trapsToAvoid: [
        'Lack of focus—trying to do everything at once without prioritizing impact areas',
        'Superficial understanding—exploring tools without deeply learning key concepts',
        'Analysis paralysis—over-researching without taking action and building experience',
        'Ignoring domain expertise—applying generic AI knowledge without industry context',
        'Neglecting ethics—exploring AI possibilities without considering responsible implementation'
      ],
      challenge: {
        title: '7-Day AI Integration Challenge',
        description: 'Dive deeper into AI by completing one focused exploration task each day.',
        days: [
          {
            day: 'Day 1',
            task: 'Identify 3 specific problems in your work that AI could help solve',
            action: 'List them with a brief description of how AI could help'
          },
          {
            day: 'Day 2',
            task: 'Explore one AI tool relevant to your industry',
            action: 'Sign up and complete the tutorial'
          },
          {
            day: 'Day 3',
            task: 'Learn about a key AI concept you\'ve never explored',
            action: 'Read one article or watch a 15-minute video'
          },
          {
            day: 'Day 4',
            task: 'Interview a colleague about their experience with AI',
            action: 'Document their use case and lessons learned'
          },
          {
            day: 'Day 5',
            task: 'Prototype a small AI solution for one of your identified problems',
            action: 'Use existing tools (ChatGPT, Zapier, etc.) to build it'
          },
          {
            day: 'Day 6',
            task: 'Present your prototype to a peer or mentor',
            action: 'Get feedback and suggestions for improvement'
          },
          {
            day: 'Day 7',
            task: 'Reflect and plan next steps',
            action: 'Document what you learned and commit to one concrete next action'
          }
        ]
      },
      opportunities: [
        'Develop expertise in emerging AI applications within your industry',
        'Lead cross-functional AI adoption initiatives',
        'Mentor others on AI exploration and implementation',
        'Create a personal AI toolkit tailored to your specific needs',
        'Position yourself as an AI-informed leader in your organization'
      ]
    };

    setProfile(mockProfile);
    setIsLoading(false);
  }, []);

  const handleRetakingQuiz = () => {
    sessionStorage.removeItem('quizSelections');
    router.push('/quiz');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading your profile...</div>;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load your profile</p>
          <button
            onClick={handleRetakingQuiz}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Your AI Opportunity Profile
          </h1>
          <p className="text-gray-600">Discover your unique path in the AI era</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          {/* Profile Header */}
          <div className="text-center mb-8 pb-8 border-b-2 border-indigo-100">
            <div className="text-7xl mb-4">{profile.icon}</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">{profile.name}</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {profile.description}
            </p>
          </div>

          {/* Strengths Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">💪</span>
              Your Strengths
            </h3>
            <div className="space-y-3">
              {profile.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
                >
                  <p className="text-gray-800 font-medium">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">🚀</span>
              Your Opportunities
            </h3>
            <div className="space-y-3">
              {profile.opportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
                >
                  <p className="text-gray-800 font-medium">{opportunity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Traps to Avoid Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              Traps to Avoid
            </h3>
            <div className="space-y-3">
              {profile.trapsToAvoid.map((trap, index) => (
                <div
                  key={index}
                  className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg"
                >
                  <p className="text-gray-800 font-medium">{trap}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7-Day Challenge Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="mb-8 pb-8 border-b-2 border-indigo-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <span className="text-3xl mr-3">📅</span>
              {profile.challenge.title}
            </h3>
            <p className="text-gray-600 text-lg">{profile.challenge.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.challenge.days.map((dayChallenge, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold text-indigo-700 mb-3">
                  {dayChallenge.day}
                </h4>
                <div className="mb-3">
                  <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Task
                  </p>
                  <p className="text-gray-800">{dayChallenge.task}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">
                    Action
                  </p>
                  <p className="text-gray-800">{dayChallenge.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleRetakingQuiz}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Print Profile
          </button>
          <a
            href="/"
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
          >
            Back to Home
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-gray-700">
            <span className="font-semibold">💡 Tip:</span> This is a placeholder profile.
            Complete the quiz to get a personalized profile based on your answers!
          </p>
        </div>
      </div>
    </div>
  );
}
