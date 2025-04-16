import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Assessments = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('quiz');
  const [dueDate, setDueDate] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const FacultyToken = localStorage.getItem('FacultyToken');

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      questionText: '',
      type: 'mcq',
      options: [''],
      correctAnswer: '',
      codeTemplate: '',
      testCases: [{ input: '', expectedOutput: '' }],
    }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addOption = (index) => {
    const updated = [...questions];
    updated[index].options.push('');
    setQuestions(updated);
  };

  const handleTestCaseChange = (qIndex, tIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].testCases[tIndex][field] = value;
    setQuestions(updated);
  };

  const addTestCase = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].testCases.push({ input: '', expectedOutput: '' });
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = {
      title,
      description,
      type,
      dueDate,
      totalMarks,
      questions,
    };

    try {
      const response = await axios.post(`https://xhorizon-backend-1-4pjq.onrender.com/api/assesment/add/${id}`, data, {
        headers: {
          token: FacultyToken,
        },
      });

      if (response.data.success) {
        toast.success("Assessment created successfully!");
        setTitle('');
        setDescription('');
        setType('quiz');
        setDueDate('');
        setTotalMarks('');
        setQuestions([]);
        setMessage(response.data.message);
        navigate("/course");
      } else {
        toast.warn(response.data.message || "Assessment creation failed.");
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error("Error adding assessment.");
      setMessage('Failed to create assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Create Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block font-medium">Type</label>
          <select
            className="w-full border p-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="quiz">Quiz</option>
            <option value="assignment">Assignment</option>
            <option value="coding">Coding</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        {/* Total Marks */}
        <div>
          <label className="block font-medium">Total Marks</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            required
          />
        </div>

        {/* Questions Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Questions</h3>
          {questions.map((q, index) => (
            <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
              <label className="block font-medium">Question Text</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-2"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              />

              <label className="block font-medium">Type</label>
              <select
                className="w-full border p-2 rounded mb-2"
                value={q.type}
                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
              >
                <option value="mcq">MCQ</option>
                <option value="short-answer">Short Answer</option>
                <option value="code">Code</option>
              </select>

              {/* MCQ Options */}
              {q.type === 'mcq' && (
                <div>
                  <label className="block font-medium">Options</label>
                  {q.options.map((opt, i) => (
                    <input
                      key={i}
                      className="w-full border p-1 rounded mb-1"
                      value={opt}
                      onChange={(e) => handleOptionChange(index, i, e.target.value)}
                    />
                  ))}
                  <button
                    type="button"
                    className="text-blue-600 text-sm"
                    onClick={() => addOption(index)}
                  >
                    + Add Option
                  </button>
                </div>
              )}

              {/* Correct Answer */}
              <label className="block font-medium mt-2">Correct Answer</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-2"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
              />

              {/* Code Type */}
              {q.type === 'code' && (
                <>
                  <label className="block font-medium">Code Template</label>
                  <textarea
                    className="w-full border p-2 rounded mb-2"
                    value={q.codeTemplate}
                    onChange={(e) => handleQuestionChange(index, 'codeTemplate', e.target.value)}
                  />

                  <h4 className="font-medium">Test Cases</h4>
                  {q.testCases.map((test, tIndex) => (
                    <div key={tIndex} className="mb-2">
                      <input
                        type="text"
                        placeholder="Input"
                        className="border p-1 mr-2 rounded"
                        value={test.input}
                        onChange={(e) =>
                          handleTestCaseChange(index, tIndex, 'input', e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Expected Output"
                        className="border p-1 rounded"
                        value={test.expectedOutput}
                        onChange={(e) =>
                          handleTestCaseChange(index, tIndex, 'expectedOutput', e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-600 text-sm"
                    onClick={() => addTestCase(index)}
                  >
                    + Add Test Case
                  </button>
                </>
              )}
            </div>
          ))}

          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddQuestion}
          >
            + Add Question
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Submitting...' : 'Create Assessment'}
        </button>

        {message && (
          <p className="text-center text-lg mt-4 font-medium text-blue-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Assessments;
