import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const LoginScreen = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {/* Left side: Quiz related content */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#333', fontSize: '3em' }}>Subject Quiz</h1>
          <p style={{ color: '#555', fontSize: '1.2em' }}>Test your knowledge and learn something new!</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '150px', height: '150px', color: '#007bff', marginTop: '20px' }}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.09L19 6.47v4.53c0 4.27-2.69 8.2-7 9.83-4.31-1.63-7-5.56-7-9.83V6.47L12 3.09zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
          </svg>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {/* Right side: Sign-in dialog box */}
        <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', maxWidth: '400px', width: '100%' }}>
          <Authenticator />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;