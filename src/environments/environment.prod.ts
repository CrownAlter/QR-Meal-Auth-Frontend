/**
 * @fileoverview Production Environment Configuration
 * @description Contains environment-specific settings for production deployment
 * 
 * CHANGES MADE:
 * - SECURITY FIX: Added encryption keys (previously hardcoded in components)
 * 
 * IMPORTANT SECURITY NOTES:
 * 1. Replace these placeholder keys with secure, randomly generated keys before deployment
 * 2. Keys should be at least 32 characters long with mixed characters
 * 3. Consider using environment variables in your CI/CD pipeline to inject these values
 * 4. Never commit actual production keys to version control
 * 5. Ensure these keys match between frontend and any backend validation
 */
export const environment = {
  production: true,
  apiUrl: 'https://qr-auth-backend-iv1n.onrender.com',
  
  // SECURITY: Encryption keys for QR code generation/validation
  // IMPORTANT: Replace these with secure keys before production deployment!
  // Recommended: Use CI/CD environment variables to inject these values at build time
  encryptionKey: 'REPLACE_WITH_SECURE_PRODUCTION_KEY_MIN_32_CHARS',
  hmacKey: 'REPLACE_WITH_SECURE_PRODUCTION_HMAC_KEY_MIN_32_CHARS'
};
