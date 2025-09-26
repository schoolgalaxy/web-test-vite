import LeftSidebar from '../leftsidebar/LeftSidebar';
import RightSidebar from '../rightsidebar/RightSidebar';
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