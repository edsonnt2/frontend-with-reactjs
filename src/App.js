import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadingRepository = async () => {
      try {
        const response = await api.get("repositories");
        setRepositories(response.data);
      } catch (error) {
        console.error(error);
        alert("Error in Server");
      }
    };
    loadingRepository();
  }, [setRepositories]);

  async function handleAddRepository() {
    const data = {
      title:
        "Repository create in " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      url: "http://github.com/edsonnt2",
      techs: "react, react native, nodejs",
    };
    try {
      const response = await api.post("repositories", data);

      if (response) setRepositories([...repositories, response.data]);
    } catch (error) {
      console.error(error);
      alert("Error in Server");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error in Server");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
