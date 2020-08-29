import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const {repositories, setRepositories} = useState([]);
  useEffect(() => {
    const response = await api.get('/repositories', (response) => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
       title: `Novo Repositorio ${Date.now()}`,
       url: `Nova URL ${Date.now()}`,
       techs: [`Novo Tech ${Date.now()}`]
      });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
   await api.delete('repositories/' + id);
   setRepositories(repositories.filter(
     repository => repository.id !== id
   ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          <>
          <li key={repository.id}>{repository.title}</li>
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
