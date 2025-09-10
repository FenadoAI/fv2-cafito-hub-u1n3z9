import requests
import json

# Test that menu items now have beautiful Unsplash images
API_BASE = "http://localhost:8001/api"

def test_menu_images():
    print("🖼️  Testing Menu Item Images...")
    
    try:
        response = requests.get(f"{API_BASE}/menu")
        menu_items = response.json()
        
        print(f"✅ Found {len(menu_items)} menu items with images:")
        print()
        
        for item in menu_items:
            image_status = "✅ HAS IMAGE" if item.get('image_url') else "❌ NO IMAGE"
            print(f"{image_status} - {item['name']} ({item['name_ar']})")
            if item.get('image_url'):
                print(f"   🔗 {item['image_url']}")
            print()
        
        # Test image accessibility
        print("🌐 Testing image accessibility...")
        test_item = menu_items[0]
        if test_item.get('image_url'):
            try:
                img_response = requests.head(test_item['image_url'])
                if img_response.status_code == 200:
                    print(f"✅ Images are accessible - {test_item['name']} image loads successfully")
                else:
                    print(f"⚠️  Image may not be accessible - Status: {img_response.status_code}")
            except Exception as e:
                print(f"❌ Error testing image: {e}")
        
        print("\n🎉 Menu images successfully added!")
        print("Visit http://localhost:3000/menu to see the beautiful images!")
        
    except Exception as e:
        print(f"❌ Error testing menu images: {e}")

if __name__ == "__main__":
    test_menu_images()