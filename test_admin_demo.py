import requests
import json
import time

# Test the Cafito API by creating some demo orders for the admin dashboard
API_BASE = "http://localhost:8001/api"

def create_demo_orders():
    print("Creating demo orders for admin dashboard...")
    
    # Get menu items first
    try:
        response = requests.get(f"{API_BASE}/menu")
        menu_items = response.json()
        print(f"Found {len(menu_items)} menu items")
    except Exception as e:
        print(f"Failed to get menu items: {e}")
        return
    
    # Create demo orders
    demo_orders = [
        {
            "customer_name": "Ahmed Al-Rashid",
            "customer_phone": "+971501234567",
            "items": [
                {
                    "menu_item_id": menu_items[0]['id'],
                    "quantity": 2,
                    "price": menu_items[0]['price'],
                    "name": menu_items[0]['name']
                },
                {
                    "menu_item_id": menu_items[3]['id'],  # Saffron Latte
                    "quantity": 1,
                    "price": menu_items[3]['price'],
                    "name": menu_items[3]['name']
                }
            ],
            "notes": "Extra hot, less sugar please"
        },
        {
            "customer_name": "Fatima Hassan",
            "customer_phone": "+971509876543",
            "items": [
                {
                    "menu_item_id": menu_items[1]['id'],  # Turkish Coffee
                    "quantity": 1,
                    "price": menu_items[1]['price'],
                    "name": menu_items[1]['name']
                },
                {
                    "menu_item_id": menu_items[9]['id'],  # Baklava
                    "quantity": 3,
                    "price": menu_items[9]['price'],
                    "name": menu_items[9]['name']
                }
            ]
        },
        {
            "customer_name": "Omar Al-Zahra",
            "customer_phone": "+971505555555",
            "items": [
                {
                    "menu_item_id": menu_items[4]['id'],  # Rose Cardamom Cappuccino
                    "quantity": 1,
                    "price": menu_items[4]['price'],
                    "name": menu_items[4]['name']
                }
            ],
            "notes": "To go please"
        },
        {
            "customer_name": "Layla Malik",
            "items": [
                {
                    "menu_item_id": menu_items[5]['id'],  # Gold Dust Mocha
                    "quantity": 1,
                    "price": menu_items[5]['price'],
                    "name": menu_items[5]['name']
                },
                {
                    "menu_item_id": menu_items[10]['id'],  # Ma'amoul
                    "quantity": 2,
                    "price": menu_items[10]['price'],
                    "name": menu_items[10]['name']
                }
            ]
        }
    ]
    
    created_orders = []
    for i, order_data in enumerate(demo_orders):
        try:
            response = requests.post(f"{API_BASE}/orders", json=order_data)
            if response.status_code == 200:
                order = response.json()
                created_orders.append(order)
                print(f"✅ Created order {i+1}: {order['customer_name']} - AED {order['total_amount']}")
                
                # Simulate some orders being processed
                if i == 1:  # Set second order to preparing
                    requests.patch(f"{API_BASE}/orders/{order['id']}/status?status=preparing")
                    print(f"   → Set to 'preparing'")
                elif i == 2:  # Set third order to ready
                    requests.patch(f"{API_BASE}/orders/{order['id']}/status?status=ready")
                    print(f"   → Set to 'ready'")
                
                time.sleep(0.5)  # Small delay to make timestamps different
            else:
                print(f"❌ Failed to create order {i+1}: {response.status_code}")
        except Exception as e:
            print(f"❌ Error creating order {i+1}: {e}")
    
    print(f"\n🎉 Created {len(created_orders)} demo orders!")
    print("You can now visit http://localhost:3000/admin to see the admin dashboard")
    
    return created_orders

if __name__ == "__main__":
    create_demo_orders()