import styled from 'styled-components';

export const LoadingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="200"
    height="200"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      shapeRendering: 'auto',
      display: 'block',
      backgroundPositionX: '0%',
      backgroundPositionY: '0%',
      backgroundSize: 'auto',
      backgroundOrigin: 'padding-box',
      backgroundClip: 'border-box',
      background: 'scroll rgb(255, 255, 255) none repeat',
      width: '200px',
      height: '200px',
      animation: 'none',
    }}
  >
    <g>
      <circle
        strokeLinecap="round"
        fill="none"
        strokeDasharray="50.26548245743669 50.26548245743669"
        stroke="#9973c8"
        strokeWidth="8"
        r="32"
        cy="50"
        cx="50"
        transform="matrix(1,0,0,1,0,0)"
        style={{
          fill: 'none',
          stroke: '#9973c8',
          transform: 'matrix(1, 0, 0, 1, 0, 0)',
          animation: 'none',
        }}
      />
    </g>
  </svg>
);

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
