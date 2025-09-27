import DataFolderWidget from './DataFolderWidget';
import '../assets/css/Explore.css'; // Import the Explore CSS

const Explore = () => {
  return (
    <div className="explore-layout">
      <div className="left-sidebar"></div>
      <div className="center-content">
        <DataFolderWidget />
      </div>
      <div className="right-sidebar"></div>
    </div>
  );
};

export default Explore;