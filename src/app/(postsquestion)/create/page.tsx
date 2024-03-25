"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const router = useRouter();

  const handleChange = (index:any, value:any) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

 const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const token: any = localStorage.getItem('qtToken'); // Get token from local 
      if (!token) {
      alert('Token needed to create a question');
      return;
    }
      const response = await fetch('https://qt.organogram.app/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Token': token // Use the retrieved token
        },
        body: JSON.stringify({
          question,
          options,
          // correctAnswer
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create question');
      }

      const data = await response.json();
      console.log('Question created successfully:', data); // Log success message
      router.push('/');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };


  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create QT</h1>

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
