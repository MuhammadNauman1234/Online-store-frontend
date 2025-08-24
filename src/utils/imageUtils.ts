import { STATIC_FILES_URL } from '../lib/axios';

/**
 * Generates the full URL for an image from the backend
 * @param imagePath - The image path from the backend (e.g., "/img/bed.jpg", "img/sofa.jpg")
 * @returns Full URL to the image
 */
export const getImageUrl = (imagePath: string): string => {
  // Combine static files URL with image path
  return `${STATIC_FILES_URL}/${imagePath}`;
};

/**
 * Generates the full URL for an image with fallback
 * @param imagePath - The image path from the backend
 * @param fallbackPath - Fallback image path if the main one fails
 * @returns Full URL to the image
 */
export const getImageUrlWithFallback = (imagePath: string, fallbackPath?: string): string => {
  if (!imagePath) {
    return fallbackPath || getPlaceholderImageUrl();
  }
  
  return getImageUrl(imagePath);
};

/**
 * Generates a placeholder image URL using a service like placehold.co
 * @param width - Image width (default: 400)
 * @param height - Image height (default: 400)
 * @param text - Text to display on placeholder (default: "No Image")
 * @returns Placeholder image URL
 */
export const getPlaceholderImageUrl = (width: number = 400, height: number = 400, text: string = "No Image"): string => {
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/e5e7eb/6b7280?text=${encodedText}`;
};

/**
 * Generates a data URL for a simple colored placeholder
 * @param width - Image width (default: 400)
 * @param height - Image height (default: 400)
 * @param bgColor - Background color (default: "#e5e7eb")
 * @param textColor - Text color (default: "#6b7280")
 * @returns Data URL for placeholder
 */
export const getDataUrlPlaceholder = (width: number = 400, height: number = 400, bgColor: string = "#e5e7eb", textColor: string = "#6b7280"): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = textColor;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('No Image', width / 2, height / 2);
  }
  
  return canvas.toDataURL();
};
