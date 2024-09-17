import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <button disabled={true}>Menu</button>
      <Link to='/'>
        <h1>NC News</h1>
      </Link>
      <button disabled={true}>Profile</button>
    </header>
  );
};
