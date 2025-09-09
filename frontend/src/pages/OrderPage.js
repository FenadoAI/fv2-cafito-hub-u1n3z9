import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Phone, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${API_BASE}/api`;

const OrderPage = () => {
  const { cart, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem({ id });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async () => {
    if (!customerInfo.name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone || null,
        notes: customerInfo.notes || null,
        items: cart.items.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        }))
      };

      const response = await axios.post(`${API}/orders`, orderData);
      setOrderId(response.data.id);
      setOrderSuccess(true);
      clearCart();
      setCustomerInfo({ name: '', phone: '', notes: '' });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Order Confirmed!</h2>
              <p className="text-lg text-green-700 mb-2">Thank you for your order!</p>
              <p className="text-sm text-green-600 mb-6">Order ID: {orderId}</p>
              <p className="text-gray-600 mb-6">
                Your order has been received and is being prepared. 
                We'll have it ready for you soon!
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => setOrderSuccess(false)}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Place Another Order
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Order</h1>
          <p className="text-lg text-gray-600">Review your items and complete your order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Cart Items ({cart.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
                    <Button 
                      onClick={() => window.location.href = '/menu'}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      Browse Menu
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-amber-600 font-bold">AED {item.price}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Customer Info */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+971 XX XXX XXXX"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Special Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>AED {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">AED {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting || cart.items.length === 0}
                  className="w-full mt-6 bg-amber-600 hover:bg-amber-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;