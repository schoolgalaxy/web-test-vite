/*
  Utility helpers for working with Vite's import.meta.glob for JSON and images.
  These helpers centralize common patterns so features can consume structured
  content without repeating glob boilerplate in components.
  Fixed to use literal glob patterns for production compatibility.
 */

// ------------------------------
// JSON helpers
// ------------------------------

// Eagerly imports all JSON files from the data directory and returns a map
// from absolute module path to parsed JSON value.
export function loadAllDataJson<T = unknown>(): Record<string, T> {
  try {
    const modules = import.meta.glob('/src/assets/data/**/*.json', { eager: true });
    const jsonByPath: Record<string, T> = {};
    for (const [path, mod] of Object.entries(modules)) {
      // Vite exposes the JSON content on the default export
      jsonByPath[path] = (mod as any).default as T;
    }
    return jsonByPath;
  } catch (error) {
    console.error('Error loading JSON data:', error);
    // Return empty object as fallback - components should handle empty data gracefully
    return {};
  }
}

// Eagerly imports quiz JSON files from a specific category
export function loadQuizDataByCategory<T = unknown>(category: string): Record<string, T> {
  try {
    const modules = import.meta.glob('/src/assets/data/**/*.json', { eager: true });
    const jsonByPath: Record<string, T> = {};
    for (const [path, mod] of Object.entries(modules)) {
      // Only include files from the specified category
      if (path.includes(`/${category}/`)) {
        jsonByPath[path] = (mod as any).default as T;
      }
    }
    return jsonByPath;
  } catch (error) {
    console.error(`Error loading quiz data for category ${category}:`, error);
    // Return empty object as fallback
    return {};
  }
}

// Eagerly imports widget JSON files
export function loadWidgetData<T = unknown>(): Record<string, T> {
  try {
    const modules = import.meta.glob('/src/assets/widget/*.json', { eager: true });
    const jsonByPath: Record<string, T> = {};
    for (const [path, mod] of Object.entries(modules)) {
      jsonByPath[path] = (mod as any).default as T;
    }
    return jsonByPath;
  } catch (error) {
    console.error('Error loading widget data:', error);
    // Return empty object as fallback
    return {};
  }
}

// Creates lazy JSON loaders for all data files
export function createLazyDataLoader<T = unknown>(): Record<string, () => Promise<T>> {
  try {
    const loaders = import.meta.glob('/src/assets/data/**/*.json');
    const wrapped: Record<string, () => Promise<T>> = {};
    for (const [path, loader] of Object.entries(loaders)) {
      wrapped[path] = async () => {
        const mod = await (loader as () => Promise<{ default: T }>)();
        return mod.default;
      };
    }
    return wrapped;
  } catch (error) {
    console.error('Error creating lazy data loader:', error);
    // Return empty object as fallback
    return {};
  }
}

// ------------------------------
// Image helpers
// ------------------------------

// Eagerly resolves image URLs and returns a map from absolute module path to public URL
export function loadAllImageUrls(): Record<string, string> {
  try {
    const modules = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,svg,gif}', {
      eager: true,
      query: '?url',
      import: 'default'
    }) as Record<string, string>;
    const urlByPath: Record<string, string> = {};
    for (const [path, url] of Object.entries(modules)) {
      urlByPath[path] = url as string;
    }
    return urlByPath;
  } catch (error) {
    console.error('Error loading image URLs:', error);
    // Return empty object as fallback
    return {};
  }
}

// Eagerly resolves image URLs for img directory
export function loadImgUrls(): Record<string, string> {
  try {
    const modules = import.meta.glob('/src/assets/img/*.{png,jpg,jpeg,svg,gif}', {
      eager: true,
      query: '?url',
      import: 'default'
    }) as Record<string, string>;
    const urlByPath: Record<string, string> = {};
    for (const [path, url] of Object.entries(modules)) {
      urlByPath[path] = url as string;
    }
    return urlByPath;
  } catch (error) {
    console.error('Error loading img URLs:', error);
    // Return empty object as fallback
    return {};
  }
}

// Eagerly resolves image URLs for real_images directory
export function loadRealImageUrls(): Record<string, string> {
  try {
    const modules = import.meta.glob('/src/assets/real_images/*.{png,jpg,jpeg,svg,gif}', {
      eager: true,
      query: '?url',
      import: 'default'
    }) as Record<string, string>;
    const urlByPath: Record<string, string> = {};
    for (const [path, url] of Object.entries(modules)) {
      urlByPath[path] = url as string;
    }
    return urlByPath;
  } catch (error) {
    console.error('Error loading real image URLs:', error);
    // Return empty object as fallback
    return {};
  }
}

// Creates lazy image URL loaders for all images
export function createLazyImageLoader(): Record<string, () => Promise<string>> {
  try {
    const loaders = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,svg,gif}', {
      query: '?url',
      import: 'default'
    }) as Record<string, () => Promise<string>>;
    const wrapped: Record<string, () => Promise<string>> = {};
    for (const [path, loader] of Object.entries(loaders)) {
      wrapped[path] = async () => (await (loader as () => Promise<string>)());
    }
    return wrapped;
  } catch (error) {
    console.error('Error creating lazy image loader:', error);
    // Return empty object as fallback
    return {};
  }
}

// ------------------------------
// Error handling utilities
// ------------------------------

/**
 * Creates a fallback error handler that serves placeholder content from assets folder
 */
export function createAssetErrorHandler<T>(fallbackPath: string, fallbackData: T) {
  return (error: Error): T => {
    console.warn(`Asset loading error, falling back to ${fallbackPath}:`, error);
    return fallbackData;
  };
}

/**
 * Safely loads JSON data with fallback to asset folder error handling
 */
export function safeLoadJson<T>(loader: () => Record<string, T>, fallback: Record<string, T> = {} as Record<string, T>): Record<string, T> {
  try {
    return loader();
  } catch (error) {
    console.error('JSON loading failed, using fallback:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace available',
      fallbackType: typeof fallback,
      fallbackKeys: Object.keys(fallback)
    });
    return fallback;
  }
}

/**
 * Safely loads image URLs with fallback to placeholder images
 */
export function safeLoadImages(loader: () => Record<string, string>, fallback: Record<string, string> = {}): Record<string, string> {
  try {
    return loader();
  } catch (error) {
    console.error('Image loading failed, using fallback:', error);
    return fallback;
  }
}

// ------------------------------
// Small niceties
// ------------------------------

/**
 * Filters a record by predicate on [path, value]. Useful to scope assets.
 */
export function filterRecord<V>(
  record: Record<string, V>,
  predicate: (entry: { path: string; value: V }) => boolean
): Record<string, V> {
  const result: Record<string, V> = {};
  for (const [path, value] of Object.entries(record)) {
    if (predicate({ path, value })) {
      result[path] = value;
    }
  }
  return result;
}

/**
 * Maps a record's values while preserving keys.
 */
export function mapRecord<V, R>(
  record: Record<string, V>,
  mapper: (entry: { path: string; value: V }) => R
): Record<string, R> {
  const result: Record<string, R> = {};
  for (const [path, value] of Object.entries(record)) {
    result[path] = mapper({ path, value });
  }
  return result;
}

/**
 * Gets quiz metadata from loaded JSON data with error handling
 */
export function extractQuizMetadata(jsonData: Record<string, any>): any[] {
  try {
    return Object.entries(jsonData).map(([path, data]) => {
      const id = path.split('/').pop()?.replace('.json', '') || '';
      return {
        id,
        name: data.title || 'Unknown Quiz',
        description: data.description || 'No description available',
        profilePic: data.profile_pic_link || '',
        path
      };
    });
  } catch (error) {
    console.error('Error extracting quiz metadata:', error);
    return [];
  }
}
