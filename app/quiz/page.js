'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import questions from '../../data/questions.json';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const questionsList = questions.questions;
  const currentQuestion = questionsList[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questionsList.length) * 100;

  const handleAnswer = (optionId, isMultiple = false) => {
    setSelections((prev) => {
      const newSelections = { ...prev };
      
      if (isMultiple) {
        // For multiple choice questions
        if (!newSelections[currentQuestion.id]) {
          newSelections[currentQuestion.id] = [];
        }
        if (newSelections[currentQuestion.id].includes(optionId)) {
          newSelections[currentQuestion.id] = newSelections[currentQuestion.id].filter(
            (id) => id !== optionId
          );
        } else {
          newSelections[currentQuestion.id].push(optionId);
        }
      } else {
        // For single choice and scale questions
        newSelections[currentQuestion.id] = optionId;
      }
      
      return newSelections;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, navigate to results
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Save answers to localStorage as JSON before navigating
    localStorage.setItem('quizAnswers', JSON.stringify(selections));
    router.push('/result');
  };

  const isCurrentQuestionAnswered = selections[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === questionsList.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            AI Opportunity Compass
          </h1>
          <p className="text-gray-600">Discover your AI opportunity path</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questionsList.length}
            </span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.type === 'scale' ? (
              // Scale Question
              <div className="flex justify-between gap-2">
                {Array.from({ length: currentQuestion.scale.max }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAnswer(num)}
                    className={`flex-1 py-3 px-2 rounded-lg font-medium transition-all duration-200 ${
                      selections[currentQuestion.id] === num
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ) : (
              // Single Choice or Multiple Choice
              currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    handleAnswer(
                      option.id,
                      currentQuestion.type === 'multiple-choice'
                    )
                  }
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    currentQuestion.type === 'multiple-choice'
                      ? selections[currentQuestion.id]?.includes(option.id)
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-gray-50 hover:border-indigo-300'
                      : selections[currentQuestion.id] === option.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-gray-50 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                        currentQuestion.type === 'multiple-choice'
                          ? selections[currentQuestion.id]?.includes(option.id)
                            ? 'border-indigo-600 bg-indigo-600'
                            : 'border-gray-300'
                          : selections[currentQuestion.id] === option.id
                            ? 'border-indigo-600 bg-indigo-600 rounded-full'
                            : 'border-gray-300'
                      }`}
                    >
                      {currentQuestion.type === 'multiple-choice' &&
                        selections[currentQuestion.id]?.includes(option.id) && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      {currentQuestion.type === 'single-choice' &&
                        selections[currentQuestion.id] === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                    </div>
                    <span className="font-medium text-gray-800">{option.label}</span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Info Text for Scale */}
          {currentQuestion.type === 'scale' && (
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{currentQuestion.scale.labels[0]}</span>
              <span>{currentQuestion.scale.labels[1]}</span>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isCurrentQuestionAnswered
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>

        {/* Question Counter */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Press <span className="font-semibold">Submit</span> on the last question to see your
          results
        </div>
      </div>
    </div>
  );
}
