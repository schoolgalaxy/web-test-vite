import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SignoutScreen = () => {
  const { user, signOut } = useAuthenticator();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      // Navigation will be handled by the signOut function
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  // Show loading or redirect if no user
  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Redirecting...</div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }}>
      {/* Left side: Sign out message */}
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
            alt="Thank you for using Prep Galaxy"
            style={{
              width: '200px',
              height: '200px',
              marginTop: '20px',
              borderRadius: '5%',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        <h1 style={{
          fontSize: '2.5em',
          marginBottom: '30px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          fontWeight: '600',
          color: '#ffffff'
        }}>
          Thank You!
        </h1>

        <p style={{
          fontSize: '1.3em',
          lineHeight: '1.7',
          marginBottom: '40px',
          maxWidth: '500px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          fontWeight: '400',
          color: '#ffffff',
          opacity: '0.95'
        }}>
          We hope you enjoyed your learning journey with Prep Galaxy. Come back anytime to continue exploring our interactive quizzes and AI-powered content!
        </p>

        {/* Motivational message */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          marginBottom: '40px'
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
            <span style={{ fontSize: '1.2em' }}>🎓</span>
            <span style={{ fontWeight: '500' }}>Keep Learning</span>
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
            <span style={{ fontSize: '1.2em' }}>🚀</span>
            <span style={{ fontWeight: '500' }}>Explore More</span>
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
            <span style={{ fontSize: '1.2em' }}>⭐</span>
            <span style={{ fontWeight: '500' }}>See You Soon</span>
          </div>
        </div>
      </div>

      {/* Right side: Sign out actions */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px 30px',
          borderRadius: '15px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#333',
              fontSize: '1.5em',
              fontWeight: '600',
              margin: '0 0 10px 0'
            }}>
              Ready to sign out?
            </h2>
            <p style={{
              color: '#666',
              fontSize: '1em',
              lineHeight: '1.5',
              margin: '0'
            }}>
              You're currently signed in as: <strong>{user?.signInDetails?.loginId || 'User'}</strong>
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              style={{
                padding: '15px 30px',
                fontSize: '1.1em',
                fontWeight: '600',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: isSigningOut ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isSigningOut ? 0.7 : 1,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
            >
              {isSigningOut ? 'Signing out...' : 'Sign Out'}
            </button>

            <button
              onClick={handleSignIn}
              style={{
                padding: '12px 25px',
                fontSize: '1em',
                fontWeight: '500',
                color: '#667eea',
                background: 'transparent',
                border: '2px solid #667eea',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Stay Signed In
            </button>
          </div>

          <div style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #eee'
          }}>
            <p style={{
              color: '#888',
              fontSize: '0.9em',
              lineHeight: '1.4',
              margin: '0'
            }}>
              Want to come back? Simply sign in again to continue your learning journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignoutScreen;