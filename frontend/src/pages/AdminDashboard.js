import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Eye, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${API_BASE}/api`;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    preparing: 'bg-blue-100 text-blue-800 border-blue-200',
    ready: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-gray-100 text-gray-800 border-gray-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    pending: <Clock className="h-4 w-4" />,
    preparing: <RefreshCw className="h-4 w-4" />,
    ready: <CheckCircle className="h-4 w-4" />,
    completed: <CheckCircle className="h-4 w-4" />,
    cancelled: <XCircle className="h-4 w-4" />
  };

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${API}/orders/${orderId}/status?status=${newStatus}`);
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
          : order
      ));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length,
      completed: orders.filter(o => o.status === 'completed').length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0)
    };
    return stats;
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cafito Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage orders and monitor business performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.preparing}</div>
              <div className="text-sm text-gray-600">Preparing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.ready}</div>
              <div className="text-sm text-gray-600">Ready</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">AED {stats.totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button 
                  onClick={fetchOrders}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-lg text-gray-500">No orders yet</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div 
                        key={order.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedOrder?.id === order.id ? 'bg-amber-50 border-amber-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[order.status]}>
                              {statusIcons[order.status]}
                              <span className="ml-1">{order.status.toUpperCase()}</span>
                            </Badge>
                            <span className="text-sm text-gray-500">#{order.id.slice(-8)}</span>
                          </div>
                          <span className="font-bold text-amber-600">AED {order.total_amount.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{order.customer_name}</p>
                            <p className="text-sm text-gray-600">{order.items.length} items</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                            <Button size="sm" variant="outline" className="mt-1">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedOrder ? (
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Order #{selectedOrder.id.slice(-8)}</h3>
                        <Badge className={statusColors[selectedOrder.status]}>
                          {statusIcons[selectedOrder.status]}
                          <span className="ml-1">{selectedOrder.status.toUpperCase()}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Created: {formatDate(selectedOrder.created_at)}</p>
                      {selectedOrder.updated_at !== selectedOrder.created_at && (
                        <p className="text-sm text-gray-600">Updated: {formatDate(selectedOrder.updated_at)}</p>
                      )}
                    </div>

                    <div className="pb-4 border-b">
                      <h4 className="font-semibold mb-2">Customer Information</h4>
                      <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
                      {selectedOrder.customer_phone && (
                        <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                      )}
                      {selectedOrder.notes && (
                        <p className="mt-2"><strong>Notes:</strong> {selectedOrder.notes}</p>
                      )}
                    </div>

                    <div className="pb-4 border-b">
                      <h4 className="font-semibold mb-2">Items</h4>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>AED {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t font-semibold flex justify-between">
                        <span>Total:</span>
                        <span className="text-amber-600">AED {selectedOrder.total_amount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Update Status</h4>
                      <Select 
                        value={selectedOrder.status} 
                        onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Select an order to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;