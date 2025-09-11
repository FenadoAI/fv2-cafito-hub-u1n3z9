import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

async def test_jpg_images():
    ROOT_DIR = Path('backend')
    load_dotenv(ROOT_DIR / '.env')
    
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Test JPG images for first two items
    jpg_updates = {
        "Arabic Coffee (Qahwa)": "https://storage.googleapis.com/fenado-ai-farm-public/generated/e8af7dc2-9d14-4ddf-acf1-2853d1dffe6d.jpg",
        "Turkish Coffee": "https://storage.googleapis.com/fenado-ai-farm-public/generated/354c55ef-5cd6-495a-b457-fc864feaf474.jpg"
    }
    
    try:
        print("🧪 Testing JPG format images...")
        
        for name, jpg_url in jpg_updates.items():
            result = await db.menu_items.update_one(
                {"name": name},
                {"$set": {"image_url": jpg_url}}
            )
            
            if result.modified_count > 0:
                print(f"✅ Updated {name} with JPG image")
            else:
                print(f"❌ Failed to update {name}")
        
        # Verify the updates
        updated_items = await db.menu_items.find({"name": {"$in": list(jpg_updates.keys())}}).to_list(10)
        
        print(f"\n📊 Verification:")
        for item in updated_items:
            print(f"  {item['name']}: {item['image_url']}")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_jpg_images())