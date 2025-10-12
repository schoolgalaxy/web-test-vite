// Environment variable utilities for AWS Amplify
// This file provides helper functions for accessing and validating environment variables

export interface EnvironmentConfig {
  razorpayKeyId: string;
  razorpayKeySecret: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

/**
 * Get environment variable with validation
 * @param key - Environment variable name
 * @param defaultValue - Default value if variable is not set
 * @param required - Whether the variable is required (throws error if missing)
 */
export function getEnvVar(key: string, defaultValue?: string, required: boolean = false): string {
  const value = import.meta.env[key] || defaultValue;

  if (required && !value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }

  return value || '';
}

/**
 * Get all payment-related environment variables
 */
export function getPaymentEnvironment(): EnvironmentConfig {
  return {
    razorpayKeyId: getEnvVar('VITE_RAZORPAY_KEY_ID', 'rzp_test_demo_key'),
    razorpayKeySecret: getEnvVar('VITE_RAZORPAY_KEY_SECRET', 'demo_secret_key'),
    isProduction: import.meta.env.MODE === 'production',
    isDevelopment: import.meta.env.MODE === 'development'
  };
}

/**
 * Validate that required environment variables are set
 */
export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const config = getPaymentEnvironment();

  if (!config.razorpayKeyId) {
    errors.push('VITE_RAZORPAY_KEY_ID is required');
  }

  if (!config.razorpayKeySecret) {
    errors.push('VITE_RAZORPAY_KEY_SECRET is required');
  }

  // Check if using demo keys in production
  if (config.isProduction) {
    if (config.razorpayKeyId === 'rzp_test_demo_key') {
      errors.push('Using demo Razorpay key in production environment');
    }
    if (config.razorpayKeySecret === 'demo_secret_key') {
      errors.push('Using demo Razorpay secret in production environment');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Log environment information for debugging (only in development)
 */
export function logEnvironmentInfo(): void {
  if (import.meta.env.DEV) {
    const validation = validateEnvironment();

    if (!validation.isValid) {
      console.warn('Environment validation failed:', validation.errors);
    }
  }
}

/**
 * Check if we're in a test environment
 */
export function isTestEnvironment(): boolean {
  const config = getPaymentEnvironment();
  return config.razorpayKeyId === 'rzp_test_demo_key' ||
         config.razorpayKeySecret === 'demo_secret_key' ||
         import.meta.env.MODE === 'test';
}

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig() {
  const config = getPaymentEnvironment();
  const validation = validateEnvironment();

  return {
    ...config,
    validation,
    isTest: isTestEnvironment(),
    environment: import.meta.env.MODE || 'development'
  };
}