import requests
import json

# Debug the exact API response
API_BASE = "http://localhost:8001/api"

def debug_menu_api():
    print("Debugging menu API response...")
    
    try:
        response = requests.get(f"{API_BASE}/menu")
        menu_items = response.json()
        
        print(f"Status Code: {response.status_code}")
        print(f"Total items: {len(menu_items)}")
        
        # Check first item in detail
        if menu_items:
            first_item = menu_items[0]
            print(f"\nFirst item structure:")
            for key, value in first_item.items():
                print(f"  {key}: {type(value).__name__} = {value}")
            
            # Specifically check image_url
            image_url = first_item.get('image_url')
            print(f"\nImage URL check:")
            print(f"  Has image_url key: {'image_url' in first_item}")
            print(f"  image_url value: {repr(image_url)}")
            print(f"  image_url type: {type(image_url)}")
            print(f"  image_url is truthy: {bool(image_url)}")
            
            # Check a few more items
            print(f"\nChecking all items for image_url:")
            for i, item in enumerate(menu_items[:5]):
                print(f"  {i+1}. {item['name']}: {bool(item.get('image_url'))}")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    debug_menu_api()