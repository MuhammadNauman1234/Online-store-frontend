import React from 'react';
import ItemCard from '../../components/common/ItemCard';

interface Item {
  id: number;
  name: string;
  price: string;
  img: string;
}

interface ItemListProps {
  items: Item[];
  onAddToCart?: (item: Item) => void;
  onDeleteItem?: (id: number) => void;
  showDeleteButton?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ items, onAddToCart, onDeleteItem, showDeleteButton = false }) => {
  const handleAddToCart = (item: Item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const handleDelete = (id: number) => {
    if (onDeleteItem) {
      onDeleteItem(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Our Products
      </h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onAddToCart={() => handleAddToCart(item)}
              onDelete={() => handleDelete(item.id)}
              showDeleteButton={showDeleteButton}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
