import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginScreen = () => {
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #737a9aff 0%, #06528cff 30%)',
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }}>
      {/* Left side: Enhanced content */}
      <div style={{
        flex: 1,
        padding: '60px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ marginBottom: '35px' }}>
          <img
            src="/src/assets/img/galaxy.png"
            alt="AI-Powered Learning"
            style={{ 
              width: '200px', 
              height: '200px', 
              marginTop: '20px',
              borderRadius: '5%',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          />
        </div>
        
        <p style={{
          fontSize: '1.3em',
          lineHeight: '1.7',
          marginBottom: '50px',
          maxWidth: '450px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          fontWeight: '400',
          color: '#ffffff',
          opacity: '0.95'
        }}>
          Transform your study experience with interactive slides, engaging quizzes, and AI-powered summaries that make learning fun and effective.
        </p>

        {/* Feature highlights */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '25px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{ fontSize: '1.2em' }}>🧠</span>
            <span style={{ fontWeight: '500' }}>AI-Powered</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '25px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{ fontSize: '1.2em' }}>🎯</span>
            <span style={{ fontWeight: '500' }}>Interactive</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '25px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{ fontSize: '1.2em' }}>⚡</span>
            <span style={{ fontWeight: '500' }}>Engaging</span>
          </div>
        </div>
      </div>

      {/* Right side: Compact Sign-in */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px 30px',
          borderRadius: '15px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '380px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3 style={{ color: '#555', fontSize: '1.1em', fontWeight: '500', margin: '0' }}>Access your learning journey</h3>
          </div>
          {/* <Authenticator socialProviders={['google']}/> */}
          <Authenticator />
          {/* <Authenticator socialProviders={['amazon', 'apple', 'facebook', 'google']}/> */}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;