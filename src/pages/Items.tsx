import React, { useState, useEffect } from 'react';
import ItemList from '../features/items/ItemList';
import Button from '../components/common/Button';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';

interface Item {
  id: number;
  name: string;
  price: string;
  img: string;
}

const Items: React.FC = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data with 8 items - replace with actual API call
  useEffect(() => {
    const mockItems: Item[] = [
      {
        id: 1,
        name: "King Size Bed",
        price: "300",
        img: "./img/bed.jpg"
      },
      {
        id: 2,
        name: "Modern cookies",
        price: "450",
        img: "./img/cookies.jpg"
      },
      {
        id: 3,
        name: "rack",
        price: "280",
        img: "./img/rack.jpg"
      },
      {
        id: 4,
        name: "slippers",
        price: "150",
        img: "./img/slippers.jpg"
      },
      {
        id: 5,
        name: "sticks",
        price: "120",
        img: "./img/sticks.jpg"
      },
      {
        id: 6,
        name: "Coffee Table",
        price: "200",
        img: "./img/coffee-table.jpg"
      },
      {
        id: 7,
        name: "Floor Lamp",
        price: "80",
        img: "./img/lamp.jpg"
      },
      {
        id: 8,
        name: "Wall Mirror",
        price: "95",
        img: "./img/mirror.jpg"
      }
    ];

    setItems(mockItems);
    setFilteredItems(mockItems);
    setIsLoading(false);
  }, []);

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.includes(searchTerm)
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  const handleAddToCart = (item: Item) => {
    dispatch(addToCart(item));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            All Products
          </h1>
          <p className="text-gray-600 mb-6">
            Discover our collection of quality items
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search items by name or price..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            
            {searchTerm && (
              <Button
                onClick={clearSearch}
                className="bg-gray-500 hover:bg-gray-600 px-6"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {filteredItems.length} of {items.length} items
          </p>
          
          {searchTerm && (
            <p className="text-sm text-gray-500">
              Showing results for "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? `No items match "${searchTerm}". Try adjusting your search.` : 'No items available at the moment.'}
            </p>
            {searchTerm && (
              <Button onClick={clearSearch}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <ItemList 
            items={filteredItems} 
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Items;
