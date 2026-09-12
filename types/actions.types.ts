/**
 * Standardized Server Action Response Types
 */

export type ActionResponse<T = unknown> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never };
