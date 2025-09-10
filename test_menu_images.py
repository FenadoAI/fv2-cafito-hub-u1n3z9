import requests
import json

# Test the menu with images
API_BASE = "http://localhost:8001/api"

def test_menu_images():
    print("Testing Cafito menu with images...")
    
    try:
        response = requests.get(f"{API_BASE}/menu")
        menu_items = response.json()
        
        print(f"✅ Found {len(menu_items)} menu items")
        print("\n📸 Menu items with images:")
        
        items_with_images = 0
        for item in menu_items:
            if item.get('image_url'):
                items_with_images += 1
                print(f"   ✅ {item['name']} - {item['category']}")
                print(f"      Image: {item['image_url'][:80]}...")
            else:
                print(f"   ❌ {item['name']} - NO IMAGE")
        
        print(f"\n📊 Summary: {items_with_images}/{len(menu_items)} items have images")
        
        if items_with_images == len(menu_items):
            print("🎉 All menu items now have beautiful images!")
        else:
            print("⚠️  Some items are missing images")
            
    except Exception as e:
        print(f"❌ Error testing menu images: {e}")

if __name__ == "__main__":
    test_menu_images()