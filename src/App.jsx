import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { ArticlePage } from './components/ArticlePage';
import { ErrorPage } from './components/ErrorPage';
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/scrollToTop';
import './App.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Articles />} />
        <Route path='/article/:article_id' element={<ArticlePage />} />
        <Route path='/topic/:topic' element={<Articles />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
