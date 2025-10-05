import McqList from './mcq/McqList';
import DiscoveryGrid from './presentation/Discovery';
// import DiscoveryBookShelf from './presentation/DicoveryCard';
import '../assets/css/Home.css'; // Assuming Home.css will contain styles for center section

const Home = () => {
  return (
    <div className="home">
      <DiscoveryGrid />
      {/* <DiscoveryBookShelf /> */}
      <McqList />
    </div>
  );
};

export default Home;