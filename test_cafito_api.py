import requests
import json

# Test the Cafito API
API_BASE = "http://localhost:8001/api"

def test_api():
    print("Testing Cafito Coffee Shop API...")
    
    # Test root endpoint
    try:
        response = requests.get(f"{API_BASE}/")
        print(f"✅ Root endpoint: {response.json()}")
    except Exception as e:
        print(f"❌ Root endpoint failed: {e}")
    
    # Test menu endpoint
    try:
        response = requests.get(f"{API_BASE}/menu")
        menu_items = response.json()
        print(f"✅ Menu endpoint: Found {len(menu_items)} items")
        
        # Show first few items
        for item in menu_items[:3]:
            print(f"   - {item['name']} ({item['name_ar']}) - AED {item['price']}")
    except Exception as e:
        print(f"❌ Menu endpoint failed: {e}")
    
    # Test menu by category
    try:
        response = requests.get(f"{API_BASE}/menu/category/specialty_coffee")
        specialty_items = response.json()
        print(f"✅ Specialty coffee category: Found {len(specialty_items)} items")
    except Exception as e:
        print(f"❌ Category endpoint failed: {e}")
    
    # Test creating an order
    try:
        order_data = {
            "customer_name": "Ahmed Hassan",
            "customer_phone": "+971501234567",
            "items": [
                {
                    "menu_item_id": menu_items[0]['id'] if menu_items else "test",
                    "quantity": 2,
                    "price": 15.0,
                    "name": "Arabic Coffee"
                },
                {
                    "menu_item_id": menu_items[1]['id'] if len(menu_items) > 1 else "test2",
                    "quantity": 1,
                    "price": 28.0,
                    "name": "Saffron Latte"
                }
            ],
            "notes": "Extra hot please"
        }
        
        response = requests.post(f"{API_BASE}/orders", json=order_data)
        if response.status_code == 200:
            order = response.json()
            print(f"✅ Order created successfully!")
            print(f"   Order ID: {order['id']}")
            print(f"   Customer: {order['customer_name']}")
            print(f"   Total: AED {order['total_amount']}")
            print(f"   Status: {order['status']}")
        else:
            print(f"❌ Order creation failed: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Order creation failed: {e}")
    
    print("\n🎉 API testing completed!")

if __name__ == "__main__":
    test_api()