import React from 'react';

const MainPage: React.FC = () => (
  <div style={{ position: 'absolute', height: '100%', width: '100%' }}>
    <img
      src="images/banner.png"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      alt="banner"
    />
  </div>
);

export default MainPage;
