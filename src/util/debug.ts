/**
 * Debug utility for conditional console logging
 * Set DEBUG_ENABLED to true to enable debug logging
 */

// Debug configuration
const DEBUG_CONFIG = {
  // Set to true to enable debug logging, false to disable
  DEBUG_ENABLED: true,

  // Debug prefixes for different types of logs
  PREFIXES: {
    LOG: '[DEBUG]',
    INFO: '[INFO]',
    WARN: '[WARN]',
    ERROR: '[ERROR]'
  }
};

// Debug logging functions
export const debug = {
  /**
   * Log debug messages (only if DEBUG_ENABLED is true)
   */
  log: (...args: any[]) => {
    if (DEBUG_CONFIG.DEBUG_ENABLED) {
      console.log(DEBUG_CONFIG.PREFIXES.LOG, ...args);
    }
  },

  /**
   * Log info messages (only if DEBUG_ENABLED is true)
   */
  info: (...args: any[]) => {
    if (DEBUG_CONFIG.DEBUG_ENABLED) {
      console.info(DEBUG_CONFIG.PREFIXES.INFO, ...args);
    }
  },

  /**
   * Log warning messages (only if DEBUG_ENABLED is true)
   */
  warn: (...args: any[]) => {
    if (DEBUG_CONFIG.DEBUG_ENABLED) {
      console.warn(DEBUG_CONFIG.PREFIXES.WARN, ...args);
    }
  },

  /**
   * Log error messages (only if DEBUG_ENABLED is true)
   */
  error: (...args: any[]) => {
    if (DEBUG_CONFIG.DEBUG_ENABLED) {
      console.error(DEBUG_CONFIG.PREFIXES.ERROR, ...args);
    }
  },

  /**
   * Enable debug logging
   */
  enable: () => {
    DEBUG_CONFIG.DEBUG_ENABLED = true;
    console.info('Debug logging enabled');
  },

  /**
   * Disable debug logging
   */
  disable: () => {
    DEBUG_CONFIG.DEBUG_ENABLED = false;
    console.info('Debug logging disabled');
  },

  /**
   * Check if debug logging is enabled
   */
  isEnabled: (): boolean => {
    return DEBUG_CONFIG.DEBUG_ENABLED;
  }
};

// Export default for convenience
export default debug;