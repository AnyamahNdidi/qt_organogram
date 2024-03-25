import { useState, useEffect } from 'react';
import './style.css';

const EditQuestionModal = ({ isOpen, onClose, questionData, onQuestionUpdate }: any) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Populate form fields with existing question data
      setQuestion(questionData.question);
      setOptions(questionData.options);
    }
  }, [isOpen, questionData]);

  const handleOptionChange = (index: any, value: any) => {
    const newOptions: any = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token: any = localStorage.getItem('qtToken');
      const response = await fetch(`https://qt.organogram.app/questions/${questionData.questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Token': token
        },
        body: JSON.stringify({
          question,
          options
        })
      });

      if (!response.ok) {
        console.log("Failed to update");
        return;
      }

      // Call the onQuestionUpdate callback with updated question data
      onQuestionUpdate({
        questionId: questionData.questionId,
        question,
        options
      });

      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-content">
          <h2 className="text-xl font-bold mb-4">Edit Question</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="question" className="block mb-2">Question:</label>
            <input type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4" required />
            {options.map((option, index) => (
              <input key={index} type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2" placeholder={`Option ${index + 1}`} required />
            ))}
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Update Question</button>
          </form>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default EditQuestionModal;
