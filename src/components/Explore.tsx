import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CenterSection from './CenterSection';
import '../assets/css/Home.css'; // Import the new Home CSS

const Home = () => {
  return (
    <div className="home-layout">
      <LeftSidebar />
      <CenterSection />
      <RightSidebar />
    </div>
  );
};

export default Home;