import React, { useMemo } from 'react';
import Button from '../../components/common/Button';
import { getImageUrl } from '../../utils/imageUtils';

interface CartItem {
  id: number;
  name: string;
  price: string;
  img: string;
  quantity: number;
}

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  // Memoize cart total calculation to avoid recalculation on every render
  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + (Number(item.price) * item.quantity);
    }, 0);
  }, [items]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 text-sm sm:text-base">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Shopping Cart</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-3 sm:p-4">
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden space-y-3">
              {/* Item Image and Details Row */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img 
                    src={getImageUrl(item.img)} 
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold text-base sm:text-lg">
                    ${item.price}
                  </p>
                </div>
              </div>
              
              {/* Quantity Controls and Total Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 p-0 text-sm bg-gray-500 hover:bg-gray-600 disabled:opacity-50"
                  >
                    -
                  </Button>
                  
                  <span className="w-8 text-center font-medium text-gray-700 text-sm">
                    {item.quantity}
                  </span>
                  
                  <Button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 p-0 text-sm bg-gray-500 hover:bg-gray-600"
                  >
                    +
                  </Button>
                </div>
                
                <div className="text-right">
                  <p className="text-base font-bold text-gray-800">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              
              {/* Remove Button Row */}
              <div className="flex justify-end">
                <Button
                  onClick={() => onRemoveItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Remove Item
                </Button>
              </div>
            </div>
            
            {/* Desktop Layout - Horizontal */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Item Image */}
              <div className="flex-shrink-0">
                <img 
                  src={getImageUrl(item.img)} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              
              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-green-600 font-bold text-lg">
                  ${item.price}
                </p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 p-0 text-sm bg-gray-500 hover:bg-gray-600 disabled:opacity-50"
                >
                  -
                </Button>
                
                <span className="w-12 text-center font-medium text-gray-700">
                  {item.quantity}
                </span>
                
                <Button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="w-8 h-8 p-0 text-sm bg-gray-500 hover:bg-gray-600"
                >
                  +
                </Button>
              </div>
              
              {/* Item Total */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
              
              {/* Remove Button */}
              <Button
                onClick={() => onRemoveItem(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Cart Total */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-800">
          <span>Total:</span>
          <span className="text-green-600">${cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
