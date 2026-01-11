/**
 * @fileoverview Development Environment Configuration
 * @description Contains environment-specific settings for development
 * 
 * CHANGES MADE:
 * - SECURITY FIX: Added encryption keys (previously hardcoded in components)
 * - Keys should be replaced with secure values in production
 * 
 * WARNING: These are development keys only. For production, use environment.prod.ts
 * with properly secured keys managed through CI/CD environment variables.
 */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  
  // SECURITY: Encryption keys for QR code generation/validation
  // These keys MUST match between user-dashboard (generation) and qr-scanner (validation)
  // In production, these should be loaded from secure environment variables
  encryptionKey: 'dev-encryption-key-change-in-production',
  hmacKey: 'dev-hmac-signing-key-change-in-production'
};
