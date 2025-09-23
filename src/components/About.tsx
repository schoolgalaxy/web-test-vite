
import LeftSidebar from './LeftSidebar';
import '../assets/css/Home.css'; // Import the new Home CSS

const About = () => {
  return (
    <div className="home-layout">
      <LeftSidebar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>About Us</h1>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555' }}>
          Welcome to our platform! We are dedicated to providing high-quality educational resources and tools to help students and professionals enhance their knowledge and skills. Our mission is to make learning accessible, engaging, and effective for everyone.
        </p>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555' }}>
          Our team is composed of passionate educators, developers, and designers who work tirelessly to create innovative solutions. We believe in continuous improvement and are always striving to bring you the best possible experience.
        </p>
        <h2 style={{ color: '#333', marginTop: '30px' }}>Our Vision</h2>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555' }}>
          To empower learners worldwide with the knowledge and tools they need to succeed in a rapidly evolving world. We envision a future where education is personalized, interactive, and limitless.
        </p>
        <h2 style={{ color: '#333', marginTop: '30px' }}>Contact Us</h2>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555' }}>
          Have questions or feedback? We'd love to hear from you!
          Please reach out to us at <a href="mailto:schoolgalaxy40@gmail.com" style={{ color: '#007bff', textDecoration: 'none' }}>schoolgalaxy40@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;