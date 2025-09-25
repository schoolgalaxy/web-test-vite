import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';
import FeedbackForm from './FeedbackForm';
import '../../assets/css/Home.css'; // Re-use Home CSS for layout

const FeedbackLayout = () => {
  return (
    <div className="home-layout">
      <LeftSidebar />
      <FeedbackForm />
      <RightSidebar />
    </div>
  );
};

export default FeedbackLayout;