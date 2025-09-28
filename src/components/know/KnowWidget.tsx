import { Link } from 'react-router-dom';
import knowConfig from '../../assets/know/know.json';
import '../../assets/css/Explore.css';

interface CategoryItem {
  name: string;
  path: string;
  icon: string;
  description: string;
  route: string;
  itemCount: number;
}

const KnowWidget = () => {
  // Get active know categories from config
  const activeCategories = (knowConfig as { categories: any[] }).categories.filter(category => category.active);

  // Map active categories to display format with item counts from actual directories
  const knowCategories: CategoryItem[] = activeCategories.map(category => {
    const getItemCount = (categoryPath: string) => {
      const itemCounts: Record<string, number> = {
        'animal': 12,
        'birds': 13,
        'sports': 12
      };
      return itemCounts[categoryPath] || 0;
    };

    return {
      name: category.displayName || category.name,
      path: category.category,
      icon: category.realIcon || '📚',
      description: category.description,
      route: `/know/${category.category}`, // Updated to use category content route
      itemCount: getItemCount(category.category)
    };
  });

  // Split categories into two rows
  const midPoint = Math.ceil(knowCategories.length / 2);
  const firstRow = knowCategories.slice(0, midPoint);
  const secondRow = knowCategories.slice(midPoint);

  return (
    <div className="data-folder-widget">
      <h2>Knowledge Categories</h2>
      <p className="widget-description">
        Explore our comprehensive collection of educational content organized by category.
      </p>

      <div className="know-widget-container">
        {/* First Row */}
        <div className="know-row">
          {firstRow.map((category, index) => (
            <Link key={index} to={category.route} className="folder-item-link">
              <div className="folder-item">
                <div className="folder-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="item-count">
                  {category.itemCount} items
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Second Row */}
        <div className="know-row">
          {secondRow.map((category, index) => (
            <Link key={index + midPoint} to={category.route} className="folder-item-link">
              <div className="folder-item">
                <div className="folder-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="item-count">
                  {category.itemCount} items
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="widget-footer">
        <p>Total Categories: {knowCategories.length}</p>
        <p>Each category contains detailed educational content and presentations</p>
      </div>
    </div>
  );
};

export default KnowWidget;