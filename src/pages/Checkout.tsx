import React, { useState } from 'react';
import CheckoutSummary from '../features/cart/CheckoutSummary';
import Button from '../components/common/Button';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearCart } from '../store/cartSlice';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = async (shippingDetails: ShippingDetails) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Send order to backend
      console.log('Order placed:', {
        items: cartItems,
        shipping: shippingDetails,
        total: calculateTotal()
      });
      
      // Clear cart after successful order
      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (error) {
      console.error('Checkout failed:', error);
      // TODO: Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (Number(item.price) * item.quantity);
    }, 0);
    const shipping = 10.00;
    return subtotal + shipping;
  };

  if (orderPlaced) {
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
              Order Placed Successfully!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Order Total:</span> ${calculateTotal().toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Items:</span> {cartItems.length}
              </p>
            </div>
            
            <div className="mt-8 space-y-3">
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Continue Shopping
              </Button>
              
              <Button 
                onClick={() => setOrderPlaced(false)}
                className="w-full bg-gray-500 hover:bg-gray-600"
              >
                Place Another Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h1>
            
            <p className="text-gray-600 mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            
            <Button 
              onClick={() => window.location.href = '/items'}
              className="w-full"
            >
              Browse Products
            </Button>
          </div>
        </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your order and provide shipping information
          </p>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="py-8">
        <CheckoutSummary 
          items={cartItems}
          onCheckout={handleCheckout}
          isLoading={isLoading}
        />
      </div>

      {/* Additional Info */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">Your payment information is protected with bank-level security</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Free shipping on orders over $100. Delivery within 3-5 business days</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Customer Support</h3>
              <p className="text-sm text-gray-600">24/7 customer support available for any questions or concerns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
