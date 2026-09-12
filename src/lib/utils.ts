/**
 * Utility functions for class names and formatting
 */

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatMetricValue(value: string, unit?: string): string {
  return unit ? `${value} ${unit}` : value;
}
