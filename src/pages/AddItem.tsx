import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../features/items/ItemForm';
import Button from '../components/common/Button';
import { useAppDispatch } from '../store/hooks';
import { createItem } from '../store/itemsSlice';

interface ItemFormData {
  name: string;
  price: string;
  img: string;
}

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleSubmit = useCallback(async (formData: ItemFormData) => {
    setIsLoading(true);
    
    try {
      await dispatch(createItem(formData)).unwrap();
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to add item:', error);
      // Error is handled by Redux state
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const handleAddAnother = () => {
    setIsSuccess(false);
  };

  const handleViewItems = useCallback(() => {
    navigate('/items');
  }, [navigate]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Item Added Successfully!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your new item has been added to the store. Customers can now view and purchase it.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleAddAnother}
                className="w-full"
              >
                Add Another Item
              </Button>
              
              <Button 
                onClick={handleViewItems}
                className="w-full"
              >
                View All Items
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Add New Item
              </h1>
              <p className="text-gray-600 mt-2">
                Add a new product to your store inventory
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/items')}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Back to Items
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-2xl">
          <ItemForm 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>

    </div>
  );
};

export default AddItem;
