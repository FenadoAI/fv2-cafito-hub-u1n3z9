import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${API_BASE}/api`;

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  const categories = [
    { id: 'all', name: 'All Items', name_ar: 'جميع العناصر' },
    { id: 'specialty_coffee', name: 'Specialty Coffee', name_ar: 'قهوة مختصة' },
    { id: 'traditional_coffee', name: 'Traditional Coffee', name_ar: 'قهوة تقليدية' },
    { id: 'cold_beverages', name: 'Cold Beverages', name_ar: 'مشروبات باردة' },
    { id: 'pastries', name: 'Pastries', name_ar: 'معجنات' },
    { id: 'breakfast', name: 'Breakfast', name_ar: 'إفطار' },
    { id: 'snacks', name: 'Snacks', name_ar: 'وجبات خفيفة' }
  ];

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, menuItems]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API}/menu`);
      setMenuItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading our delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Discover the finest coffee and Middle Eastern delicacies
          </p>
          <p className="text-lg text-gray-500 font-arabic">
            اكتشف أفضل القهوة والأطباق الشرق أوسطية
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'hover:bg-amber-50 border-amber-200'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-amber-100">
              <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300 relative">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', item.image_url);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log('Image loaded successfully:', item.name)}
                  />
                ) : null}
                {!item.image_url && (
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                    {item.name.charAt(0)}
                  </div>
                )}
                <Badge 
                  className="absolute top-2 right-2 bg-amber-600 text-white"
                >
                  {categories.find(cat => cat.id === item.category)?.name}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-arabic mb-2">
                      {item.name_ar}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-600">
                      AED {item.price}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-2 text-sm">
                  {item.description}
                </p>
                <p className="text-gray-500 mb-4 text-sm font-arabic">
                  {item.description_ar}
                </p>
                
                <Button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;