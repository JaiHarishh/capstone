import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./App.css";

function App() {
  const [markdown, setMarkdown] = useState({
    edit: "# Markdown 123",
  });

  const backendURL = 'http://localhost:8080';

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

  return (
    <main>
      <section className="markdown">
        <textarea
          className="input"
          value={markdown.edit}
          onChange={(e) => setMarkdown({ edit: e.target.value })}
        ></textarea>
        <button onClick={updateDB}>Update DB</button>

        <article className="result">
          <ReactMarkdown>{markdown.edit}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}

export default App;
