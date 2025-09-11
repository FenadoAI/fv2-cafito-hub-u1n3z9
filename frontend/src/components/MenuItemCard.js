import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const MenuItemCard = ({ item, onAddToCart, category }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-amber-100">
      {/* Image Section */}
      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-amber-200 to-orange-300">
        {item.image_url && !imageError && (
          <img
            src={item.image_url}
            alt={item.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: 'block' }}
          />
        )}
        
        {/* Fallback content */}
        {(!item.image_url || imageError || !imageLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-6xl font-bold">
              {item.name.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {item.image_url && !imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-300">
            <div className="text-white text-sm">Loading...</div>
          </div>
        )}
        
        {/* Category badge */}
        <Badge className="absolute top-2 right-2 bg-amber-600 text-white z-10">
          {category}
        </Badge>
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            {imageError ? '❌' : imageLoaded ? '✅' : '⏳'}
          </div>
        )}
      </div>

      {/* Content Section */}
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
          onClick={() => onAddToCart(item)}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        
        {/* Debug image URL in development */}
        {process.env.NODE_ENV === 'development' && item.image_url && (
          <div className="mt-2 text-xs text-gray-400 break-all">
            🔗 {item.image_url.substring(0, 50)}...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;