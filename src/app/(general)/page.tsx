"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditQuestionModal from '@/components/EditQuestionModal';

export default function Home() {
  const [responseData, setResponseData] = useState<any[]>([]);
  const [tokenExists, setTokenExists] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('qtToken');
        setTokenExists(!!token);

        if (!token) {
          window.location.href = '/request';
          return;
        }

        const response = await fetch('https://qt.organogram.app/questions', {
          headers: {
            'Token': token
          }
        });

        if (!response.ok) {
          console.log('Failed to fetch questions');
          return;
        }

        const data = await response.json();

        const dataArray = Object.entries(data).map(([questionId, questionData]: [string, any]) => {
          const formattedQuestionData = {
            questionId,
            question: questionData.question,
            options: questionData.options
          };
          return formattedQuestionData;
        });

        setResponseData(dataArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionUpdate = (updatedQuestionData: any) => {
    setResponseData(prevData =>
      prevData.map(item =>
        item.questionId === updatedQuestionData.questionId
          ? { ...item, ...updatedQuestionData }
          : item
      )
    );
  };

  const handleEditModalOpen = (questionData: any) => {
    setSelectedQuestion(questionData);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedQuestion(null);
    setEditModalOpen(false);
  };

  const handleDelete = async (questionId: string) => {
    try {
      const response = await fetch(`https://qt.organogram.app/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Token': "163cadcf-f669-41dc-b61d-8ca90ad1572a"
        }
      });
      if (!response.ok) {
        console.log('Failed to delete question');
      } else {
        setResponseData(prevData => prevData.filter(item => item.questionId !== questionId));
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className={`flex flex-col pt-12  w-full items-center ${(!tokenExists || isLoading) && 'hidden'}`}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        responseData.length === 0 ? (
          <>
            <p>No questions created yet. Click to create a question.</p>
            <Link href="/create">
              <div className="text-blue-500 underline">Create Question</div>
            </Link>
          </>      
        ) : (
          responseData.map((item: any, index: number) => (
            <div key={index} className="flex px-6 mb-6 bg-slate-100 max-auto py-6 flex-col w-5/6 shadow-xl  rounded-md">
              <div className="text-zinc-800 pb-6">
                {item.question}
              </div>
              <ul className="w-full">
                {item.options.map((option: any, optionIndex: number) => (
                  <label key={optionIndex} className="border-b-2 w-full h-10 flex items-center" htmlFor={`option-${index}-${optionIndex}`}>
                    <input type="radio" id={`option-${index}-${optionIndex}`} name={`question-${index}`} className="mr-2" />
                    {option}
                  </label>
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => { handleDelete(item.questionId); console.log("this id id", item.questionId)} }>Delete</button>
                <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600" onClick={() => handleEditModalOpen(item)}>Edit</button>
              </div>
            </div>
          ))
        )
      )}

      <EditQuestionModal
        isOpen={editModalOpen} 
        onClose={handleEditModalClose} 
        questionData={selectedQuestion} 
        onQuestionUpdate={handleQuestionUpdate}
      />
    </div>
  );
}
