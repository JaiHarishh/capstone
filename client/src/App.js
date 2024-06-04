import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./App.css";

function App() {
  const [markdown, setMarkdown] = useState({
    edit: "# Markdown 123",
  });

  const backendURL = 'https://capstone-1-lx8q.onrender.com';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${backendURL}/`);
        const data = response.data;
        if (data.success) {
          setMarkdown({ edit: data.data[0].edit });
        } else {
          console.error("Failed to fetch data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  async function updateDB() {
    try {
      const response = await axios.put(`${backendURL}/update`, { edit: markdown.edit });
      const responseData = response.data;
      if (responseData.success) {
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const downloadFile = () => {
    const blob = new Blob([markdown.edit], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown.txt';
    link.click();
  };

  return (
    <main>
      <section className="markdown">
        <textarea
          className="input"
          value={markdown.edit}
          onChange={(e) => setMarkdown({ edit: e.target.value })}
        ></textarea>
        <button onClick={updateDB}>Update DB</button>
        <button onClick={downloadFile}>Download File</button>

        <article className="result">
          <ReactMarkdown>{markdown.edit}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}

export default App;