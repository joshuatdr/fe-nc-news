import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { ArticlePage } from './components/ArticlePage';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Articles />} />
        <Route path='/article/:article_id' element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
