import React, { useState, FormEvent } from 'react';
import { join, JoinData } from '../../../services/api/userService';
import './JoinPage.css';

const JoinPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const joinData: JoinData = { email, password, nickname };

    try {
      await join(joinData);
      setSuccess(true);
    } catch (err) {
      setError('Join failed. Please try again.');
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
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Signup successful!</p>}
    </div>
  );
};

export default JoinPage;
