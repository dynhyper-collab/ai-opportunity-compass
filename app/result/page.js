'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateProfile } from '@/lib/scoring';
import profilesData from '@/data/questions.json';

export default function ResultPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scores, setScores] = useState(null);

  useEffect(() => {
    try {
      // Read answers from localStorage
      const storedAnswers = localStorage.getItem('quizAnswers');
      
      if (!storedAnswers) {
        setError('No quiz answers found. Please complete the quiz first.');
        setIsLoading(false);
        return;
      }

      const answers = JSON.parse(storedAnswers);
      const questions = profilesData.questions;

      // Calculate user profile using scoring engine
      const result = calculateProfile(answers, questions);
      
      if (!result.primaryProfile) {
        setError('Unable to calculate profile. Please try again.');
        setIsLoading(false);
        return;
      }

      // Find the primary profile data
      const primaryProfileData = profilesData.profiles.find(
        (p) => p.id === result.primaryProfile
      );

      if (!primaryProfileData) {
        setError('Profile not found. Please try again.');
        setIsLoading(false);
        return;
      }

      // Build comprehensive profile object
      const userProfile = {
        id: primaryProfileData.id,
        name: primaryProfileData.name,
        icon: primaryProfileData.icon,
        description: primaryProfileData.description,
        color: primaryProfileData.color,
        opportunities: primaryProfileData.opportunities,
        skills_to_develop: primaryProfileData.skills_to_develop,
        score_breakdown: result.scores,
        secondary_profile: result.secondaryProfile,
      };

      setProfile(userProfile);
      setScores(result.scores);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('An error occurred while loading your profile.');
      setIsLoading(false);
    }
  }, []);

  const handleRetakingQuiz = () => {
    localStorage.removeItem('quizAnswers');
    router.push('/quiz');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
          <p className="text-gray-600 mb-6 text-lg">{error || 'Unable to load your profile'}</p>
          <button
            onClick={handleRetakingQuiz}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Take the Quiz
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

        {/* Primary Profile Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          {/* Profile Header */}
          <div className="text-center mb-8 pb-8 border-b-2 border-indigo-100">
            <div className="text-7xl mb-4">{profile.icon}</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">{profile.name}</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {profile.description}
            </p>
          </div>

          {/* Score Breakdown Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">📊</span>
              Your Score Breakdown
            </h3>
            <div className="space-y-4">
              {scores && Object.entries(scores).map(([profileType, score]) => (
                <div key={profileType} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-800 capitalize">
                        {profileType === 'builder' && '🔨 Builder'}
                        {profileType === 'analyzer' && '📊 Analyzer'}
                        {profileType === 'creator' && '🎨 Creator'}
                        {profileType === 'strategist' && '🎯 Strategist'}
                      </span>
                      <span className="text-lg font-bold text-indigo-600">{score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          profileType === 'builder' ? 'bg-blue-500' :
                          profileType === 'analyzer' ? 'bg-green-500' :
                          profileType === 'creator' ? 'bg-purple-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
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

          {/* Skills to Develop Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Skills to Develop
            </h3>
            <div className="space-y-3">
              {profile.skills_to_develop.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg"
                >
                  <p className="text-gray-800 font-medium">{skill}</p>
                </div>
              ))}
            </div>
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
      </div>
    </div>
  );
}
