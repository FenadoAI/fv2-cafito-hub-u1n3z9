import React, { useState, useEffect } from 'react';

const ImageTestPage = () => {
  const [imageStatus, setImageStatus] = useState({});
  
  const testImages = [
    {
      name: 'Arabic Coffee (Fresh)',
      url: 'https://storage.googleapis.com/fenado-ai-farm-public/generated/8242aee2-a8a7-4c71-b3c4-24ebf331e1d7.webp'
    },
    {
      name: 'Saffron Latte (Fresh)',
      url: 'https://storage.googleapis.com/fenado-ai-farm-public/generated/54cb4221-bb4a-4fb2-ae05-d19a88f13329.webp'
    },
    {
      name: 'Baklava (Fresh)',
      url: 'https://storage.googleapis.com/fenado-ai-farm-public/generated/73a6ca33-23df-42a0-b50d-d213cc30702c.webp'
    }
  ];

  const handleImageLoad = (imageName) => {
    console.log(`✅ ${imageName} loaded successfully`);
    setImageStatus(prev => ({ ...prev, [imageName]: 'loaded' }));
  };

  const handleImageError = (imageName, url) => {
    console.error(`❌ ${imageName} failed to load:`, url);
    setImageStatus(prev => ({ ...prev, [imageName]: 'error' }));
  };

  useEffect(() => {
    console.log('ImageTestPage mounted');
    
    // Test fetch API access
    testImages.forEach(async (image) => {
      try {
        const response = await fetch(image.url, { method: 'HEAD' });
        console.log(`Fetch test for ${image.name}: ${response.status} ${response.statusText}`);
      } catch (error) {
        console.error(`Fetch test error for ${image.name}:`, error);
      }
    });
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {testImages.map((image) => (
          <div key={image.name} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{image.name}</h3>
            
            <div className="w-full h-48 bg-gray-200 mb-4 relative overflow-hidden rounded">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(image.name)}
                onError={() => handleImageError(image.name, image.url)}
              />
            </div>
            
            <div className="text-sm">
              <strong>Status:</strong> {imageStatus[image.name] || 'loading...'}
            </div>
            
            <div className="text-xs text-gray-600 mt-2 break-all">
              <strong>URL:</strong> {image.url}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <pre className="text-xs overflow-x-auto">
          {JSON.stringify(imageStatus, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ImageTestPage;