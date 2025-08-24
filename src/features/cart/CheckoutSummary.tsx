import React, { useState, useMemo, useCallback } from 'react';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { getImageUrl } from '../../utils/imageUtils';

interface CartItem {
  id: number;
  name: string;
  price: string;
  img: string;
  quantity: number;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface CheckoutSummaryProps {
  items: CartItem[];
  onCheckout: (shippingDetails: ShippingDetails) => void;
  isLoading?: boolean;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ 
  items, 
  onCheckout, 
  isLoading = false 
}) => {
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  // Memoize all calculations to avoid recalculation on every render
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + (Number(item.price) * item.quantity);
    }, 0);
  }, [items]);

  const shipping = 10.00; // Fixed shipping cost

  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ShippingDetails]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingDetails> = {};

    if (!shippingDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!shippingDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingDetails.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!shippingDetails.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!shippingDetails.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!shippingDetails.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    if (!shippingDetails.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Memoize checkout handler to prevent unnecessary re-renders
  const handleCheckout = useCallback(() => {
    if (validateForm()) {
      onCheckout(shippingDetails);
    }
  }, [validateForm, onCheckout, shippingDetails]);

  if (items.length === 0) {
  return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">No items to checkout</h2>
        <p className="text-gray-500 text-sm sm:text-base">Add some items to your cart first!</p>
    </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        Checkout
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Order Summary */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Order Summary</h2>
          
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <img 
                    src={getImageUrl(item.img)} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Details Form */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Shipping Details</h2>
          
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                value={shippingDetails.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                error={errors.firstName}
                required
              />
              
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                value={shippingDetails.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                error={errors.lastName}
                required
              />
            </div>
            
            <InputField
              label="Email"
              name="email"
              type="email"
              value={shippingDetails.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              error={errors.email}
              required
            />
            
            <InputField
              label="Address"
              name="address"
              type="text"
              value={shippingDetails.address}
              onChange={handleInputChange}
              placeholder="Enter street address"
              error={errors.address}
              required
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="City"
                name="city"
                type="text"
                value={shippingDetails.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                error={errors.city}
                required
              />
              
              <InputField
                label="ZIP Code"
                name="zipCode"
                type="text"
                value={shippingDetails.zipCode}
                onChange={handleInputChange}
                placeholder="Enter ZIP code"
                error={errors.zipCode}
                required
              />
            </div>
            
            <InputField
              label="Country"
              name="country"
              type="text"
              value={shippingDetails.country}
              onChange={handleInputChange}
              placeholder="Enter country"
              error={errors.country}
              required
            />
          </div>
          
          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full py-3 text-base sm:text-lg"
          >
            {isLoading ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
