import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <Link to="/">
          <img src={logoImg} alt="Github Explorer" />
        </Link>
        <Link to="/">
          <FiChevronLeft size={18} />
          Back to Dashboard
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars0.githubusercontent.com/u/42623554?s=460&u=a3a49601be691e3addf7295621fbbf6acf2ed5da&v=4"
            alt="avatar"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Descrição do repositório</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1808</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>18</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="DAUHDUSAH">
          <div>
            <strong>saushdau</strong>
            <p>ashduah</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
