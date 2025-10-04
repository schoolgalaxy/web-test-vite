import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAnimalsAndBirds, SearchResult } from '../../util/assetsLoader';
import { useAuth } from '../../hook/useAuth';
import '../../assets/css/SearchComponent.css';

interface SearchComponentProps {
  className?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search as user types
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = searchAnimalsAndBirds(searchTerm);
        setSearchResults(results);
        setShowResults(results.length > 0);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setShowResults(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    setSearchTerm('');
    setShowResults(false);
    inputRef.current?.blur();

    // Check if user is logged in
    if (!isLoggedIn) {
      console.log('User not logged in, redirecting to upgrade page');
      navigate('/upgrade', { replace: true });
      return;
    }

    // Navigate directly to the final destination
    // Use uniqueId if available (from know files), otherwise use regular id
    const targetId = result.uniqueId || result.id;

    console.log('Search result clicked:', {
      title: result.title,
      type: result.type,
      id: result.id,
      uniqueId: result.uniqueId,
      targetId: targetId,
      hasUniqueId: !!result.uniqueId
    });

    if (result.uniqueId) {
      // Has uniqueId, navigate directly to presentation
      console.log('Navigating to presentation:', `/know/${result.type}/${result.uniqueId}`);
      navigate(`/know/${result.type}/${result.uniqueId}`, { replace: true });
    } else {
      // Navigate to category page for regular ids
      console.log('Navigating to category:', `/know/${result.type}`);
      navigate(`/quiz/${result.type}/${targetId}`, { replace: true });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`search-component ${className}`} ref={searchRef}>
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search animals, birds, and more..."
          className="search-input"
          aria-label="Search for animals, birds, aquatic life, insects, space, sports, and more"
        />
        <div className="search-icon">
          {isLoading ? '⏳' : '🔍'}
        </div>
      </div>

      {showResults && (
        <div className="search-dropdown">
          {searchResults.length === 0 ? (
            <div className="search-no-results">
              {searchTerm.trim().length >= 2 ? 'No results found' : 'Type at least 2 characters to search'}
            </div>
          ) : (
            <div className="search-results">
              {searchResults.slice(0, 8).map((result, index) => (
                <div
                  key={`${result.type}-${result.id}-${result.path}-${index}`}
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="search-result-icon">
                    {result.type === 'animals' ? '🐾' :
                     result.type === 'birds' ? '🐦' :
                     result.type === 'aquatic' ? '🐠' :
                     result.type === 'insects' ? '🦋' :
                     result.type === 'space' ? '🚀' :
                     result.type === 'sports' ? '⚽' :
                     result.type === 'ai' ? '🤖' :
                     result.type === 'computer_science' ? '💻' : '📚'}
                  </div>
                  <div className="search-result-content">
                    <div className="search-result-title">{result.title}</div>
                    <div className="search-result-type">{result.type}</div>
                  </div>
                </div>
              ))}
              {searchResults.length > 8 && (
                <div className="search-more-results">
                  And {searchResults.length - 8} more results...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;