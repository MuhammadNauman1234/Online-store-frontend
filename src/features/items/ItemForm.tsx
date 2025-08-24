import React, { useState, useCallback } from 'react';
import InputField from '../../components/common/InputField';
import FileUpload from '../../components/common/FileUpload';
import Button from '../../components/common/Button';

interface ItemFormData {
  name: string;
  price: string;
  img: string;
}

interface ItemFormProps {
  onSubmit: (formData: ItemFormData) => void;
  isLoading?: boolean;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    price: '',
    img: ''
  });

  const [errors, setErrors] = useState<Partial<ItemFormData>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ItemFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFormData(prev => ({
      ...prev,
      img: file.name
    }));
    
    // Clear image error
    if (errors.img) {
      setErrors(prev => ({
        ...prev,
        img: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ItemFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!selectedFile) {
      newErrors.img = 'Please select an image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Memoize form submission handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  }, [validateForm, onSubmit, formData]);

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      img: ''
    });
    setErrors({});
    setSelectedFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Add New Item
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Item Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter item name"
          error={errors.name}
          required
        />
        
        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="0.00"
          error={errors.price}
          required
          min={0}
          step={0.01}
        />
        
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedTypes="image/*"
          maxSize={5}
          label="Item Image"
          error={errors.img}
        />
        
        <div className="flex space-x-4 pt-4">
          <Button
            onClick={() => handleSubmit({} as React.FormEvent)}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Adding Item...' : 'Add Item'}
          </Button>
          
          <Button
            onClick={resetForm}
            disabled={isLoading}
            className="flex-1 bg-gray-500 hover:bg-gray-600"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
