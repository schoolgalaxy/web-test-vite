import { useState } from 'react';
import { useTheme } from '../../util/ThemeContext';
import '../../assets/css/Home.css'; // Import the new Home CSS

const NavbarCustomizer = () => {
  const { navbarColors, setNavbarColors, resetNavbarColors } = useTheme();
  const [tempColors, setTempColors] = useState(navbarColors);
  const [showCustomizer, setShowCustomizer] = useState(true);

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
  };

  const cancelChanges = () => {
    setTempColors(navbarColors);
    setShowCustomizer(false);
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setTempColors(preset.colors);
    setNavbarColors(preset.colors);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Navbar Color Customizer</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Customize your navbar colors with live preview. Your preferences will be saved automatically.
      </p>

      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={() => setShowCustomizer(!showCustomizer)}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          {showCustomizer ? 'Hide' : 'Show'} Color Customizer
        </button>

        {showCustomizer && (
          <div style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Customize Navbar Colors</h3>

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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    Background Color
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
                    Hover Color
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
                    Text Color
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
              <h4 style={{ marginBottom: '10px', color: '#555' }}>Live Preview</h4>
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
                  Theme Toggle
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
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
                Apply Colors
              </button>
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
                Reset to Default
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
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', color: '#666' }}>
        <p>Your navbar color preferences are automatically saved and will persist across sessions.</p>
      </div>
    </div>
  );
};

export default NavbarCustomizer;