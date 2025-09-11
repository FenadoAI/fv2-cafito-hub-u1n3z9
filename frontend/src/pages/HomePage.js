import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Star, MapPin, Clock, Phone, Award, Heart, Users, ChefHat, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-amber-900 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-400 rounded-full opacity-10 animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-10 animate-ping delay-500"></div>
        </div>
        
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Badge className="bg-amber-600 text-white px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Premium Coffee Experience
                </Badge>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="block text-white">Welcome to</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 animate-pulse">
                  Cafito
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-4 text-amber-100 leading-relaxed">
                Dubai's Most Authentic Coffee Experience
              </p>
              <p className="text-lg mb-8 text-amber-200 font-arabic leading-relaxed">
                مرحباً بكم في كافيتو - أفضل تجربة قهوة أصيلة في دبي
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/menu">
                  <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Coffee className="mr-2 h-5 w-5" />
                    Explore Our Menu
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 text-lg backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Visit Our Café
                </Button>
              </div>
            </div>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12 lg:mt-0">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">5+ Years</h3>
                  <p className="text-amber-200">Serving Excellence</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">10k+</h3>
                  <p className="text-amber-200">Happy Customers</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Coffee className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">16+</h3>
                  <p className="text-amber-200">Signature Drinks</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">4.9★</h3>
                  <p className="text-amber-200">Customer Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-100 text-amber-800 px-4 py-2 text-sm mb-4">
              <ChefHat className="w-4 h-4 mr-2" />
              Our Excellence
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Cafito?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the finest coffee culture Dubai has to offer, where traditional Arabic hospitality meets modern specialty coffee excellence in every cup.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="group text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-amber-200 bg-white">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Coffee className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Traditional & Specialty</h3>
                <p className="text-gray-600 leading-relaxed">
                  From authentic Arabic Qahwa served with dates to innovative saffron lattes, we honor centuries-old traditions while crafting modern masterpieces.
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-amber-200 bg-white">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Premium Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Locally roasted premium beans with fruit-forward flavors that Dubai coffee connoisseurs adore. Every cup tells a story of excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-amber-200 bg-white">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Dubai Heritage</h3>
                <p className="text-gray-600 leading-relaxed">
                  Celebrating the rich coffee culture of the Middle East in Dubai's vibrant heart, where tradition meets innovation daily.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Experience Highlights */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  The Complete Dubai Coffee Experience
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-lg">Authentic Arabic hospitality</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="text-lg">Handcrafted with passion</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-lg">Award-winning quality</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-2xl font-bold mb-2">Daily Fresh</h4>
                  <p className="text-amber-100 mb-4">Roasted every morning</p>
                  <div className="text-4xl font-bold">6:00 AM</div>
                  <p className="text-amber-200">Opening Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Menu Preview */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-sm mb-4">
              <Coffee className="w-4 h-4 mr-2" />
              Signature Collection
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Signature</span> Offerings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A perfect harmony of traditional Middle Eastern coffee culture and innovative specialty drinks, crafted to perfection in the heart of Dubai.
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
                <Card key={item.id || index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-2 border-transparent hover:border-amber-200">
                  <div className="h-56 relative overflow-hidden">
                    {item.image_url ? (
                      <img 
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.log('Featured image failed to load:', item.image_url);
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                        onLoad={() => console.log('Featured image loaded:', item.name)}
                      />
                    ) : null}
                    <div 
                      className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-4xl font-bold"
                      style={{ display: item.image_url ? 'none' : 'flex' }}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-amber-600 text-white">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-amber-600">
                        AED {item.price}
                      </p>
                      <Link to="/menu">
                        <Button size="sm" className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                          Order Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                <Coffee className="mr-2 h-5 w-5" />
                Explore Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-100 text-amber-800 px-4 py-2 text-sm mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Customer Love
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of coffee lovers who make Cafito their daily destination for authentic Arabian coffee experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "The most authentic Arabic coffee experience in Dubai! Their qahwa with dates brings back memories of my grandmother's kitchen."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold mr-4">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold">Aisha Al-Mansouri</h4>
                    <p className="text-gray-500 text-sm">Dubai Resident</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "Absolutely blown away by their saffron latte! Perfect blend of traditional flavors with modern coffee artistry."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold">James Rodriguez</h4>
                    <p className="text-gray-500 text-sm">Coffee Enthusiast</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "The atmosphere and service are exceptional. It's become my daily morning ritual before work. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Chen</h4>
                    <p className="text-gray-500 text-sm">Business Professional</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Info */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Visit Us Today</h2>
              <p className="text-xl text-amber-100">Experience the finest coffee culture in the heart of Dubai</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Location</h3>
                  <p className="text-amber-100 leading-relaxed">
                    Dubai Marina Walk<br />
                    Dubai, UAE<br />
                    <span className="text-sm">Near JBR Beach</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Hours</h3>
                  <p className="text-amber-100 leading-relaxed">
                    Sunday - Thursday: 6:00 AM - 11:00 PM<br />
                    Friday - Saturday: 2:00 PM - 11:00 PM<br />
                    <span className="text-sm">Breakfast served until 11:00 AM</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Contact</h3>
                  <p className="text-amber-100 leading-relaxed">
                    +971 4 XXX XXXX<br />
                    info@cafito.ae<br />
                    <span className="text-sm">WhatsApp orders available</span>
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;