import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; 

const CodingQuestions = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [tags, setTags] = useState([""]);
  const [starterCode, setStarterCode] = useState("");
  const [language, setLanguage] = useState(["cpp", "python", "js"]);
  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "" }]);
  const [track, setTrack] = useState("General");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const FacultyToken = localStorage.getItem("FacultyToken");

  const handleTagChange = (index, value) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const addTag = () => setTags([...tags, ""]);

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const addTestCase = () => setTestCases([...testCases, { input: "", expectedOutput: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      description,
      difficulty,
      tags,
      starterCode,
      language,
      testCases,
      track,
    };

    try {
      const response = await axios.post(
        `http://localhost:7000/api/coading-questions/add/${id}`,
        data,
        {
          headers: {
            token: FacultyToken,
          },
        }
      );

      if (response.data.success) {
        toast.success("Coding question added successfully!");

        // Clear form
        setTitle("");
        setDescription("");
        setDifficulty("Easy");
        setTags([""]);
        setStarterCode("");
        setLanguage(["cpp", "python", "js"]);
        setTestCases([{ input: "", expectedOutput: "" }]);
        setTrack("General");

        // Redirect
        navigate("/course");
      } else {
        toast.error(response.data.message || "Failed to add coding question.");
      }
    } catch (error) {
      console.error("Error adding coding question:", error);
      toast.error("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Coding Question</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Difficulty</label>
          <select
            className="w-full border rounded p-2"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Tags</label>
          {tags.map((tag, index) => (
            <input
              key={index}
              className="w-full border rounded p-2 mb-2"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={addTag}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add Tag
          </button>
        </div>

        <div>
          <label className="block font-medium">Starter Code</label>
          <textarea
            className="w-full border rounded p-2"
            value={starterCode}
            onChange={(e) => setStarterCode(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Languages</label>
          <select
            multiple
            className="w-full border rounded p-2"
            value={language}
            onChange={(e) =>
              setLanguage(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="js">JavaScript</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Track</label>
          <input
            className="w-full border rounded p-2"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Test Cases</h3>
          {testCases.map((test, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                className="flex-1 border rounded p-2"
                placeholder="Input"
                value={test.input}
                onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
              />
              <input
                className="flex-1 border rounded p-2"
                placeholder="Expected Output"
                value={test.expectedOutput}
                onChange={(e) =>
                  handleTestCaseChange(index, "expectedOutput", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTestCase}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add Test Case
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Question"}
        </button>
      </form>
    </div>
  );
};

export default CodingQuestions;
