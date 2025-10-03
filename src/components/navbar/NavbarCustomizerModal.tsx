import { useState } from 'react';
import { useTheme } from '../../util/ThemeContext';

interface NavbarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarCustomizerModal = ({ isOpen, onClose }: NavbarCustomizerModalProps) => {
  const { navbarColors, setNavbarColors, resetNavbarColors } = useTheme();
  const [tempColors, setTempColors] = useState(navbarColors);

  const colorPresets = [
    {
      name: 'Ocean Blue',
      colors: { background: '#a7cdf3', hover: '#7fd5f1', text: '#2c5282' }
    },
    {
      name: 'Forest Green',
      colors: { background: '#9ae6b4', hover: '#68d391', text: '#22543d' }
    },
    {
      name: 'Sunset Orange',
      colors: { background: '#fbb6ce', hover: '#f687b3', text: '#702459' }
    },
    {
      name: 'Purple Dream',
      colors: { background: '#d6bcfa', hover: '#b794f6', text: '#553c9a' }
    },
    {
      name: 'Rose Gold',
      colors: { background: '#fed7d7', hover: '#feb2b2', text: '#742a2a' }
    },
    {
      name: 'Midnight Dark',
      colors: { background: '#2d3748', hover: '#4a5568', text: '#e2e8f0' }
    }
  ];

  const handleColorChange = (type: keyof typeof navbarColors, value: string) => {
    setTempColors(prev => ({ ...prev, [type]: value }));
  };

  const applyColors = () => {
    setNavbarColors(tempColors);
    onClose();
  };

  const cancelChanges = () => {
    setTempColors(navbarColors);
    onClose();
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setTempColors(preset.colors);
    setNavbarColors(preset.colors);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#333' }}>Navbar Color Settings</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        {/* Color Presets */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#555' }}>Color Presets</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {colorPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  background: `linear-gradient(135deg, ${preset.colors.background}, ${preset.colors.hover})`,
                  color: preset.colors.text,
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color Pickers */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px', color: '#555' }}>Custom Colors</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Background
              </label>
              <input
                type="color"
                value={tempColors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Hover
              </label>
              <input
                type="color"
                value={tempColors.hover}
                onChange={(e) => handleColorChange('hover', e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Text
              </label>
              <input
                type="color"
                value={tempColors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#555' }}>Preview</h4>
          <div style={{
            background: `linear-gradient(135deg, ${tempColors.background}, ${tempColors.hover})`,
            padding: '10px 20px',
            borderRadius: '6px',
            color: tempColors.text,
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Prep Galaxy</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span>Home</span>
              <span>Explore</span>
              <span>About</span>
            </div>
            <div style={{ marginLeft: 'auto', background: tempColors.hover, padding: '5px 10px', borderRadius: '4px' }}>
              Theme
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={resetNavbarColors}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1em'
            }}
          >
            Reset
          </button>
          <button
            onClick={cancelChanges}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1em'
            }}
          >
            Cancel
          </button>
          <button
            onClick={applyColors}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1em'
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarCustomizerModal;