import { Link } from 'react-router-dom';
import '../../assets/css/Explore.css';
import knowConfig from '../../assets/know/know.json';
import FreeProIndicator from './FreeProIndicator';

const KnowMenu = () => {
  // Get active know categories from config
  const activeCategories = (knowConfig as { categories: any[] }).categories.filter(category => category.active);

  // Map active categories to display format
  const knowCategories = activeCategories.map(category => ({
    name: category.displayName || category.name,
    path: category.category,
    icon: category.realIcon || '📚',
    description: category.description,
    route: category.route,
    play_type: category.play_type || 'pro' // Default to 'pro' if not specified
  }));

  return (
    <div className="data-folder-widget">
      <h2>Knowledge Categories</h2>
      <p className="widget-description">
        Explore our comprehensive collection of educational content organized by category.
      </p>

      <div className="folder-grid">
        {knowCategories.map((category, index) => (
          <Link key={index} to={category.route} className="folder-item-link">
            <div className="folder-item">
              <div className="know-item-footer">
                <FreeProIndicator playType={category.play_type} />
              </div>
              <div className="folder-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="widget-footer">
        <p>Total Categories: {knowCategories.length}</p>
        <p>Each category contains detailed educational content and presentations</p>
      </div>
    </div>
  );
};

export default KnowMenu;