/*
  Utility helpers for working with Vite's import.meta.glob for JSON and images.
  These helpers centralize common patterns so features can consume structured
  content without repeating glob boilerplate in components.
*/

// ------------------------------
// JSON helpers
// ------------------------------

/**
 * Eagerly imports all JSON files under a directory tree and returns a map
 * from absolute module path to parsed JSON value.
 *
 * Example pattern: '/src/assets/json_data/**/*.json'
 */
export function loadJsonDirectoryEager<T = unknown>(
  globPattern: string
): Record<string, T> {
  const modules = import.meta.glob(globPattern, { eager: true });
  const jsonByPath: Record<string, T> = {};
  for (const [path, mod] of Object.entries(modules)) {
    // Vite exposes the JSON content on the default export
    jsonByPath[path] = (mod as any).default as T;
  }
  return jsonByPath;
}

/**
 * Creates a lazy JSON loader map. Each key is a module path; call the function
 * to dynamically import and receive the parsed JSON value.
 */
export function createLazyJsonLoader<T = unknown>(
  globPattern: string
): Record<string, () => Promise<T>> {
  const loaders = import.meta.glob(globPattern);
  const wrapped: Record<string, () => Promise<T>> = {};
  for (const [path, loader] of Object.entries(loaders)) {
    wrapped[path] = async () => {
      const mod = await (loader as () => Promise<{ default: T }>)();
      return mod.default;
    };
  }
  return wrapped;
}

// ------------------------------
// Image helpers
// ------------------------------

/**
 * Eagerly resolves image URLs for given extensions and returns a map from
 * absolute module path to a public URL string suitable for <img src>.
 *
 * Example pattern: '/src/assets/**/*.{png,jpg,jpeg,svg,gif}'
 */
export function loadImageUrlsEager(
  globPattern: string
): Record<string, string> {
  const modules = import.meta.glob(globPattern, { eager: true, query: '?url' });
  const urlByPath: Record<string, string> = {};
  for (const [path, mod] of Object.entries(modules)) {
    // With query: '?url', Vite returns the resolved URL as the default export
    urlByPath[path] = (mod as any).default as string;
  }
  return urlByPath;
}

/**
 * Creates a lazy image URL loader map. Each key returns a function which,
 * when awaited, yields a URL string for the asset.
 */
export function createLazyImageUrlLoader(
  globPattern: string
): Record<string, () => Promise<string>> {
  const loaders = import.meta.glob(globPattern, { query: '?url' });
  const wrapped: Record<string, () => Promise<string>> = {};
  for (const [path, loader] of Object.entries(loaders)) {
    wrapped[path] = async () => {
      const mod = await (loader as () => Promise<{ default: string }>)();
      return mod.default;
    };
  }
  return wrapped;
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
