import React, { useState } from 'react';

// --- Type Definitions ---
// Defines the props for a single Discovery Set card
type DiscoveryCardProps = {
  icon: string;
  title: string;
  description: string;
  color: string;
};

// Defines the props for the Icon helper component
type IconProps = {
  children: React.ReactNode;
  color: string;
};

// --- Helper: Icon Component ---
const Icon: React.FC<IconProps> = ({ children, color }) => (
  <div style={{
    fontSize: '48px',
    color: color,
    lineHeight: 1,
    marginBottom: '16px',
  }}>
    {children}
  </div>
);

// --- Main: Card Component for each Discovery Set ---
const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ icon, title, description, color }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    border: '1px solid #e0e0e0',
    boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)',
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon color={color}>{icon}</Icon>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', color: '#333' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '16px', color: '#666', lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
};

// --- Main: Grid Container for all Discovery Sets ---
const DiscoveryGrid: React.FC = () => {
  // The 'sets' array is now typed to ensure each object matches our props definition
  const sets: DiscoveryCardProps[] = [
    {
      icon: '🦅',
      title: 'Feathered Friends',
      description: 'Soar through the skies and discover the secrets of the most majestic birds.',
      color: '#3498db', // Blue
    },
    {
      icon: '🐘',
      title: 'Jungle Giants',
      description: 'Trek into the wild to meet the biggest and bravest animals of the jungle.',
      color: '#27ae60', // Green
    },
    {
      icon: '🦋',
      title: 'Incredible Insects',
      description: 'Shrink down to explore the hidden world of ants, butterflies, and beetles.',
      color: '#f1c40f', // Yellow
    },
    {
      icon: '🚀',
      title: 'Space Explorers',
      description: 'Blast off on an adventure to distant planets, stars, and mysterious galaxies.',
      color: '#8e44ad', // Purple
    },
    {
      icon: '🏆',
      title: 'Sports Legends',
      description: 'Learn the science and skill behind the world’s most popular and exciting sports.',
      color: '#e67e22', // Orange
    },
    {
      icon: '🤖',
      title: 'AI Pioneers',
      description: 'Uncover the building blocks of artificial intelligence and how robots think.',
      color: '#e74c3c', // Red
    },
  ];

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f9fc',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  return (
    <div style={{backgroundColor: '#f7f9fc'}}>
      <div style={headerStyle}>
        <h2 style={{fontSize: '36px', color: '#2c3e50', marginBottom: '8px'}}>Explore Your Universe</h2>
        <p style={{fontSize: '18px', color: '#7f8c8d'}}>Select a Discovery Set to begin your adventure!</p>
      </div>
      
      <div style={gridStyle}>
        {sets.map((set) => (
          <DiscoveryCard key={set.title} {...set} />
        ))}
      </div>
    </div>
  );
};

export default DiscoveryGrid;