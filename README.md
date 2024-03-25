# QuestionTime (QT) Frontend Application

Welcome to the QuestionTime (QT) frontend application! QT provides a platform for registered users to set up multiple-choice questions for public interaction. This README provides an overview of the project setup, functionalities, and usage instructions.

## Getting Started

To get started with the QT frontend application, follow the steps below:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/AnyamahNdidi/qt_organogram

2. Navigate to the project directory:

cd qt

Install dependencies:

npm install

Run the development server:

npm run dev


Access the application in your browser at http://localhost:3000

# Token Generation
Before you can interact with the QT frontend application, you need to generate a personal token by providing your email address. Follow the steps below to obtain your token:

Open the QT frontend application in your browser.
You will be prompted to enter your email address.
Provide your email address and submit the form.
Upon successful submission, you will receive a personal token.
Copy the token and keep it secure.



# Usage

Once you have obtained your personal token, you can use it to interact with the QT frontend application. The application allows you to perform the following actions:

Display existing questions and their options.
Create new questions with multiple options.
Add or remove options to existing questions.
Edit the content of questions and options.
Delete questions.


# API Endpoints
The frontend application interacts with the backend API available at https://qt.organogram.app/. Below are the key API endpoints used in the application:

POST /token: Endpoint to obtain a personal token by providing the user's email address.
GET /questions: Endpoint to retrieve all questions.
POST /questions: Endpoint to add a new question.
PUT /questions/{questionId}: Endpoint to edit an existing question.
DELETE /questions/{questionId}: Endpoint to delete an existing question.
Refer to the OpenAPI documentation for detailed API specifications.