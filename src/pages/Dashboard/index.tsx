import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setLoading(true);

    if (!newRepo) {
      setInputError('You need to inform one repository');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      const hasRepo = repositories.find(
        (repo) =>
          repo.full_name.toLowerCase() === repository.full_name.toLowerCase(),
      );

      if (hasRepo) {
        setInputError('Duplicated Repository');
        return;
      }

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Error in searching for this repository');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <img src={logoImg} alt="Logo" />
      <Title>Explore repositories in GitHub</Title>

      <Form
        hasError={!!inputError}
        loading={!!loading}
        onSubmit={handleAddRepository}
      >
        <input
          value={newRepo}
          onChange={(event) => setNewRepo(event.target.value)}
          placeholder="Enter the name of the repository"
        />
        <button type="submit">
          {loading ? <FiLoader size={20} /> : 'Search'}
        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
