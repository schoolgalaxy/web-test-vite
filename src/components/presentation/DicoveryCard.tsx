import React from 'react';

// --- Type Definitions ---
interface DiscoveryBookProps {
  id: string; // Unique identifier for each book
  title: string;
  description: string;
  coverImage: string; // URL to the book cover image
  oneTimePrice: number;
}

// --- Individual Book Card Component ---
const DiscoveryBookCard: React.FC<DiscoveryBookProps> = ({ title, description, coverImage, oneTimePrice }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.15)' : '0 6px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
    maxWidth: '300px', // Max width for individual card
    cursor: 'pointer',
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
  };

  const coverImageStyle: React.CSSProperties = {
    width: '100%',
    height: '220px', // Fixed height for consistent look
    objectFit: 'cover', // Ensures the image covers the area
    borderBottom: '1px solid #eee',
  };

  const detailsStyle: React.CSSProperties = {
    padding: '20px',
    flexGrow: 1, // Allows details section to expand
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '22px',
    color: '#2c3e50',
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '15px',
  };

  const priceBuyContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
  };

  const priceStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#27ae60', // Green for price
  };

  const giftButtonStyle: React.CSSProperties = {
    backgroundColor: '#3498db', // Blue
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };
  
  const giftButtonHoverStyle: React.CSSProperties = {
    backgroundColor: '#2980b9', // Darker blue on hover
  };

  return (
    <div
      style={cardContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => alert(`Navigating to ${title} details!`)} // Placeholder for navigation
    >
      <img src={coverImage} alt={title} style={coverImageStyle} />
      <div style={detailsStyle}>
        <div>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descriptionStyle}>{description}</p>
        </div>
        <div style={priceBuyContainerStyle}>
          <span style={priceStyle}>₹{oneTimePrice}</span>
          <button 
            style={{...giftButtonStyle, ...(isHovered ? giftButtonHoverStyle : {})}}
            onClick={(e) => { e.stopPropagation(); alert(`Added ${title} to cart for gifting!`); }} // Prevent card click
          >
            Gift This Book
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main: Discovery Book Shelf Grid Component ---
const DiscoveryBookShelf: React.FC = () => {
  // Using placeholder image URLs. Replace with actual image paths.
  const discoveryBooks: DiscoveryBookProps[] = [
    {
      id: 'feathered-friends',
      title: 'Feathered Friends',
      description: 'Soar through the skies and discover the secrets of the most majestic birds.',
      coverImage: 'https://i.ibb.co/L6V2f03/feathered-friends.png', // Placeholder URL, replace this
      oneTimePrice: 349,
    },
    {
      id: 'jungle-giants',
      title: 'Jungle Giants',
      description: 'Trek into the wild to meet the biggest and bravest animals of the jungle.',
      coverImage: 'https://i.ibb.co/y4L267m/jungle-giants.png', // Placeholder URL, replace this
      oneTimePrice: 349,
    },
    {
      id: 'incredible-insects',
      title: 'Incredible Insects',
      description: 'Shrink down to explore the hidden world of ants, butterflies, and beetles.',
      coverImage: 'https://i.ibb.co/Q8QWv1J/incredible-insects.png', // Placeholder URL, replace this
      oneTimePrice: 349,
    },
    {
      id: 'space-explorers',
      title: 'Space Explorers',
      description: 'Blast off on an adventure to distant planets, stars, and mysterious galaxies.',
      coverImage: 'https://i.ibb.co/sK01fL8/space-explorers.png', // Placeholder URL, replace this
      oneTimePrice: 349,
    },
    {
      id: 'sports-legends',
      title: 'Sports Legends',
      description: 'Learn the science and skill behind the world’s most popular and exciting sports.',
      coverImage: 'https://i.ibb.co/3k5fH4p/sports-legends.png', // Placeholder URL, replace this
      oneTimePrice: 349,
    },
    {
      id: 'ai-pioneers',
      title: 'AI Pioneers',
      description: 'Uncover the building blocks of artificial intelligence and how robots think.',
      coverImage: 'https://i.ibb.co/Q8nJ0zW/ai-pioneers.png', // Placeholder URL, replace this
      oneTimePrice: 349,
    },
  ];

  const shelfContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 20px',
    backgroundColor: '#f8f9fa', // Light background for the shelf
    fontFamily: 'Roboto, sans-serif',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  const mainTitleStyle: React.CSSProperties = {
    fontSize: '42px',
    color: '#2c3e50',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const subTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    color: '#7f8c8d',
    maxWidth: '700px',
    lineHeight: '1.6',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive grid
    gap: '30px',
    width: '100%',
    maxWidth: '1200px', // Max width for the grid to keep it centered
    justifyContent: 'center',
  };

  return (
    <div style={shelfContainerStyle}>
      <div style={headerStyle}>
        <h2 style={mainTitleStyle}>Give the Gift of Wonder</h2>
        <p style={subTitleStyle}>
          Ignite their curiosity with WonderScope Discovery Books! Each digital book is packed with immersive videos, stunning pictures, and thought-provoking questions, making learning an unforgettable adventure.
        </p>
      </div>
      
      <div style={gridStyle}>
        {discoveryBooks.map((book) => (
          <DiscoveryBookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default DiscoveryBookShelf;