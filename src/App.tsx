import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import JoinPage from '@components/pages/JoinPage/JoinPage';
import LoginPage from '@components/pages/LoginPage/LoginPage';
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
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/join" element={<JoinPage />} />
        <Route path="/" element={<div>메인페이지</div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
