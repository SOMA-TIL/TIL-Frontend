import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { JoinData, join } from '@services/api/userService';
import { alertError } from '@utils/errorHandler';
import { showAlertPopup } from '@utils/showPopup';
import './JoinPage.css';

const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const joinData: JoinData = { email, password, nickname };

    try {
      await join(joinData);
      showAlertPopup('회원가입 성공');
      navigate('/');
    } catch (err) {
      alertError(err);
    }
  };

  return (
    <div className="join-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default JoinPage;
