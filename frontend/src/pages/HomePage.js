import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Star, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${API_BASE}/api`;

const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  const fetchFeaturedItems = async () => {
    try {
      const response = await axios.get(`${API}/menu`);
      const allItems = response.data;
      
      // Select featured items by category for variety
      const featured = [
        allItems.find(item => item.name === "Arabic Coffee (Qahwa)"),
        allItems.find(item => item.name === "Saffron Latte"),
        allItems.find(item => item.name === "Rose Cardamom Cappuccino"),
        allItems.find(item => item.name === "Gold Dust Mocha")
      ].filter(Boolean); // Remove any undefined items
      
      setFeaturedItems(featured);
    } catch (error) {
      console.error('Error fetching featured items:', error);
      // Fallback to static data if API fails
      setFeaturedItems([
        {
          name: "Arabic Coffee (Qahwa)",
          description: "Traditional cardamom-spiced coffee",
          price: 15,
          image_url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Saffron Latte",
          description: "Luxurious latte with premium saffron",
          price: 28,
          image_url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Rose Cardamom Cappuccino",
          description: "Aromatic with rose water and cardamom",
          price: 26,
          image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Gold Dust Mocha",
          description: "Luxurious mocha with edible gold",
          price: 35,
          image_url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-amber-300">Cafito</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-amber-100">
              Premium Coffee Experience in the Heart of Dubai
            </p>
            <p className="text-lg md:text-xl mb-8 text-amber-200 font-arabic">
              مرحباً بكم في كافيتو - أفضل تجربة قهوة في دبي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg">
                  <Coffee className="mr-2 h-5 w-5" />
                  Explore Menu
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 text-lg"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Visit Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cafito?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the finest coffee culture Dubai has to offer, blending traditional Arabic hospitality with modern specialty coffee excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Traditional & Specialty</h3>
                <p className="text-gray-600">
                  From authentic Arabic Qahwa to innovative specialty drinks, we honor tradition while embracing innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                <p className="text-gray-600">
                  Locally roasted beans with fruit-forward flavors that Dubai coffee enthusiasts love.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dubai Heritage</h3>
                <p className="text-gray-600">
                  Celebrating the rich coffee culture of the Middle East in the vibrant heart of Dubai.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Signature Offerings
            </h2>
            <p className="text-xl text-gray-600">
              A perfect blend of traditional Middle Eastern coffee culture and modern specialty drinks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }, (_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-amber-200 rounded w-16 animate-pulse"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 relative bg-gradient-to-br from-amber-200 to-orange-300">
                    {item.image_url ? (
                      <img 
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Featured image failed to load:', item.image_url);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => console.log('Featured image loaded:', item.name)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="text-amber-600 font-bold">AED {item.price}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <MapPin className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p>Dubai Marina Walk<br />Dubai, UAE</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Clock className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hours</h3>
                <p>Daily: 6:00 AM - 11:00 PM<br />Friday: 2:00 PM - 11:00 PM</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Phone className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Contact</h3>
                <p>+971 4 XXX XXXX<br />info@cafito.ae</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;