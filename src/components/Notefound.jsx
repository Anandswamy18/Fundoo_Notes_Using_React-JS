// import React from 'react';
// import notfoundimage from '../assets/404.jpg';

// const NotFound = () => {
//   return (
//     <div style={{ height: '100vh', overflow: 'hidden' }}>
//       <img
//         src={notfoundimage}
//         alt="404 Not Found"
//         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//       />
//     </div>
//   );
// };

// export default NotFound;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import notfoundimage from '../assets/404.jpg';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <img
        src={notfoundimage}
        alt="404 Not Found"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <button
        onClick={handleBackToHome}
        style={{
          position: 'absolute',
          top: '200px',
          left: '700px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
