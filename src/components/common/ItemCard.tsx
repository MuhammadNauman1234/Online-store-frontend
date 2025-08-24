import React, { memo } from 'react';
import { getImageUrlWithFallback } from '../../utils/imageUtils';

interface ItemCardProps {
  item: {
    id: number;
    name: string;
    price: string;
    img: string;
  };
  onAddToCart?: () => void;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAddToCart, onDelete, showDeleteButton = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={getImageUrlWithFallback(item.img)} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg';
          }}
        />
        {showDeleteButton && onDelete && (
          <button
            onClick={onDelete}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
            title="Delete item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {item.name}
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            ${item.price}
          </span>
          
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-xs sm:text-sm font-medium w-full sm:w-auto"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Memoize ItemCard to prevent unnecessary re-renders when props haven't changed
// Custom comparison function for optimal performance
const areEqual = (prevProps: ItemCardProps, nextProps: ItemCardProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.name === nextProps.item.name &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.item.img === nextProps.item.img &&
    prevProps.showDeleteButton === nextProps.showDeleteButton &&
    prevProps.onAddToCart === nextProps.onAddToCart &&
    prevProps.onDelete === nextProps.onDelete
  );
};

export default memo(ItemCard, areEqual);
