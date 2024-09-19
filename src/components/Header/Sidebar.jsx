import { Link } from 'react-router-dom';

export const Sidebar = ({ topics }) => {
  return (
    <div className='sidebar'>
      <nav className='topics-list'>
        <h3>Topics:</h3>
        {topics.map((topic, i) => {
          return (
            <Link
              to={`/topic/${topic.slug}`}
              key={i}
              onClick={() => {
                setIsSidebarVisible(false);
              }}
            >
              {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
