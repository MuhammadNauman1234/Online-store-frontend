import React from 'react';

interface ItemCardProps {
  item: {
    id: number;
    name: string;
    price: string;
    img: string;
  };
  onAddToCart?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.img} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {item.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${item.price}
          </span>
          
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
