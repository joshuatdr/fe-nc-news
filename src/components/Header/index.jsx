import { useState, useEffect } from 'react';
import { getTopics } from '../../apiCalls';
import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import './Header.css';

export const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [topics, setTopics] = useState([]);

  const handleMenuClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <header>
      <nav className='header-nav'>
        <button onClick={handleMenuClick}>Menu</button>
        <Link to='/'>
          <h1>NC News</h1>
        </Link>
        <button disabled={true}>Profile</button>
      </nav>
      {isSidebarVisible ? <Sidebar topics={topics} /> : null}
    </header>
  );
};
