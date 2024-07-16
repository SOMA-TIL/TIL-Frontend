import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import JoinPage from './components/pages/JoinPage/JoinPage';
import './App.css';

const App: React.FC = () => (
  <Router>
    <div className="app-container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/join">Join</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/join" element={<JoinPage />} />
        <Route path="/" element={<div>메인페이지</div>} />
      </Routes>
    </div>
  </Router>
);

export default App;
