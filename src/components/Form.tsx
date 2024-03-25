"use client"
import { useState } from 'react';

const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleChange = (index:any, value:any) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      question,
      options,
      correctAnswer
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create Quiz Question</h1>

      <form onSubmit={handleSubmit}>
        {/* Question Input */}
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question:</label>
          <input type="text" id="question" name="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="Enter your question" required />
        </div>

        {/* Answer Options */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Answer Options:</label>
          {options.map((option, index) => (
            <input key={index} type="text" value={option} onChange={(e) => handleChange(index, e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2" placeholder={`Option ${index + 1}`} required />
          ))}
        </div>

        {/* Correct Answer */}
        <div className="mb-4">
          <label htmlFor="correctAnswer" className="block text-gray-700 font-bold mb-2">Correct Answer:</label>
          <select id="correctAnswer" name="correctAnswer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2">
            {options.map((option, index) => (
              <option key={index} value={option}>Option {index + 1}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Create Question</button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
