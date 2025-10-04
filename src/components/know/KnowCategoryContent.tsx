import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../assets/css/Explore.css';
import FreeProIndicator from './FreeProIndicator';

interface ContentItem {
   title: string;
   description: string;
   slides: number;
   unique_id: string;
   play_type?: string;
 }

const KnowCategoryContent = () => {
  const { category } = useParams<{ category: string }>();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    const loadCategoryContent = async () => {
      if (!category) return;

      try {
        // Map category names to display names
        const categoryNames: Record<string, string> = {
          'animal': 'Animals',
          'birds': 'Birds',
          'sports': 'Sports'
        };

        setCategoryTitle(categoryNames[category] || category);

        // Use Vite's import.meta.glob to load all JSON files from all category directories
        const allModules = import.meta.glob('/src/assets/know/*/*.json', { eager: true });

        // Filter modules to only include files from the current category
        const categoryModules = Object.entries(allModules).filter(([path]) =>
          path.includes(`/know/${category}/`)
        );

        const items: ContentItem[] = categoryModules.map(([, module]: [string, any]) => {
          const data = module.default;
          return {
            title: data.title,
            description: data.description,
            slides: data.slides?.length || 0,
            unique_id: data.unique_id,
            play_type: data.play_type || 'pro'
          };
        });

        setContentItems(items);
      } catch (error) {
        console.error('Error loading category content:', error);
        setContentItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryContent();
  }, [category]);

  if (loading) {
    return (
      <div className="data-folder-widget">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading {categoryTitle} content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="data-folder-widget">
      <h2>{categoryTitle} Knowledge Base</h2>
      <p className="widget-description">
        Explore detailed educational content about {categoryTitle.toLowerCase()}.
        Each topic includes comprehensive presentations with key information.
      </p>

      <div className="content-items-grid">
        {contentItems.map((item, index) => (
          <div key={item.unique_id || index} className="content-item">
            <div className="content-item-header">
              <h3>{item.title}</h3>
              <FreeProIndicator playType={item.play_type} />
            </div>
            <p className="content-description">{item.description}</p>
            <div className="content-actions">
              <Link to={`/know/${category}/${item.unique_id}`} className="content-link">
                Show Slides
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="widget-footer">
        <p>Total Items: {contentItems.length}</p>
        <p>Click on any item to view the detailed presentation</p>
        <Link to="/know-widget" className="back-link">← Back to Categories</Link>
      </div>
    </div>
  );
};

export default KnowCategoryContent;