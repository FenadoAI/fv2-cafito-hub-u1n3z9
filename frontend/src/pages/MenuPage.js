import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import MenuItemCard from '../components/MenuItemCard';
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
      console.log('Menu API response:', response.data);
      
      // Log image URLs specifically
      response.data.forEach((item, index) => {
        console.log(`Item ${index + 1}: ${item.name} - Image: ${item.image_url}`);
      });
      
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
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 space-y-2">
              <a href="/test-images" className="text-sm text-blue-600 hover:underline">
                🔧 Debug Images
              </a>
              <div className="text-xs text-gray-500">
                Loaded {menuItems.length} items, {menuItems.filter(item => item.image_url).length} with images
              </div>
            </div>
          )}
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
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              category={categories.find(cat => cat.id === item.category)?.name}
            />
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