import React, { useState, useEffect } from "react";

import axios from './services/api';

import "./styles.css";
import api from "./services/api";

function App() {

  const [ repositories, setRepositories ]  = useState([]);

  useEffect( () => {
    axios.get('repositories').then( response => {
      setRepositories(response.data);
    } );
  },[]);

  async function handleAddRepository() {
    try{
      const repository = {
        title: `Repositório ${Date.now()}`,
      };

      const response = await axios.post('repositories', repository);
      setRepositories([ ...repositories, response.data ]);
    } catch(e){
      alert('Erro ao adicionar um repositório');
    }
  }

  async function handleRemoveRepository(id) {
    try{
      const _repositories = repositories;
      
      await api.delete(`repositories/${id}`);

      const repositoryIndex = _repositories.findIndex( repository => repository.id === id );

      _repositories.splice(repositoryIndex, 1);

      setRepositories([ ...repositories ]);

    } catch(e){
      alert('Erro ao deletar o repositório');
    }
  }



  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( (repository, i) => { return (
          <li key={i}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )} )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
