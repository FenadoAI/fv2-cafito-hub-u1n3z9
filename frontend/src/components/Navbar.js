import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, ShoppingCart, Menu, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Navbar = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-lg">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                Cafito
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Premium Coffee Experience</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className={`${isActive('/') ? 'bg-amber-600 hover:bg-amber-700' : 'hover:bg-amber-50'}`}
              >
                Home
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                variant={isActive('/menu') ? 'default' : 'ghost'}
                className={`${isActive('/menu') ? 'bg-amber-600 hover:bg-amber-700' : 'hover:bg-amber-50'}`}
              >
                <Menu className="h-4 w-4 mr-2" />
                Menu
              </Button>
            </Link>
            <Link to="/order">
              <Button 
                variant={isActive('/order') ? 'default' : 'ghost'}
                className={`${isActive('/order') ? 'bg-amber-600 hover:bg-amber-700' : 'hover:bg-amber-50'} relative`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/admin">
              <Button 
                variant={isActive('/admin') ? 'default' : 'ghost'}
                className={`${isActive('/admin') ? 'bg-amber-600 hover:bg-amber-700' : 'hover:bg-amber-50'}`}
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="bg-amber-50 py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-amber-800 font-arabic">
            كافيتو - تجربة قهوة مميزة في دبي
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;