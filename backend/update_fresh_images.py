import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Fresh menu item image mappings with new URLs
fresh_menu_images = {
    "Arabic Coffee (Qahwa)": "https://storage.googleapis.com/fenado-ai-farm-public/generated/8242aee2-a8a7-4c71-b3c4-24ebf331e1d7.webp",
    "Turkish Coffee": "https://storage.googleapis.com/fenado-ai-farm-public/generated/2b7a6e24-2cd6-40f8-8bd7-80ab9873d37b.webp",
    "Dubai Blend Espresso": "https://storage.googleapis.com/fenado-ai-farm-public/generated/fd822c75-ec8c-4cec-bad0-98ae23ee4c74.webp",
    "Saffron Latte": "https://storage.googleapis.com/fenado-ai-farm-public/generated/54cb4221-bb4a-4fb2-ae05-d19a88f13329.webp",
    "Rose Cardamom Cappuccino": "https://storage.googleapis.com/fenado-ai-farm-public/generated/b92874c4-b839-477f-bd9e-db7898c9308e.webp",
    "Gold Dust Mocha": "https://storage.googleapis.com/fenado-ai-farm-public/generated/836db545-2159-4324-a617-1b7af9e1f85c.webp",
    "Iced Arabic Coffee": "https://storage.googleapis.com/fenado-ai-farm-public/generated/303b1770-5994-4d99-87c7-8bbb4a753be1.webp",
    "Cold Brew with Dates": "https://storage.googleapis.com/fenado-ai-farm-public/generated/6b4e4867-16f1-4575-bec0-c6a6bea044c3.webp",
    "Mint Lemonade": "https://storage.googleapis.com/fenado-ai-farm-public/generated/acffb16d-3711-4e4c-8662-81bfb2f983c4.webp",
    "Baklava": "https://storage.googleapis.com/fenado-ai-farm-public/generated/73a6ca33-23df-42a0-b50d-d213cc30702c.webp",
    "Ma'amoul": "https://storage.googleapis.com/fenado-ai-farm-public/generated/19e2b207-80da-4a8f-a496-baf651379718.webp",
    "Kunafa": "https://storage.googleapis.com/fenado-ai-farm-public/generated/c45e8888-89b6-4f35-87d9-05c318c81520.webp",
    "Shakshuka": "https://storage.googleapis.com/fenado-ai-farm-public/generated/73dc619f-4f55-40f2-a912-1bd8c4080433.webp",
    "Arabic Breakfast Platter": "https://storage.googleapis.com/fenado-ai-farm-public/generated/ad11ad3c-8afa-46cc-8e57-ef856dfb175a.webp",
    "Mixed Nuts": "https://storage.googleapis.com/fenado-ai-farm-public/generated/0583da89-fcaf-4c44-99bd-fca522530a13.webp",
    "Halloumi Sandwich": "https://storage.googleapis.com/fenado-ai-farm-public/generated/99b374c4-66c3-4b70-9c84-23aac579c0a4.webp"
}

async def update_fresh_images():
    try:
        print("🎨 Updating menu items with fresh images...")
        updated_count = 0
        
        for name, image_url in fresh_menu_images.items():
            # Update the image URL for this menu item
            result = await db.menu_items.update_one(
                {"name": name},
                {"$set": {"image_url": image_url}}
            )
            
            if result.modified_count > 0:
                print(f"✅ Updated fresh image for: {name}")
                updated_count += 1
            else:
                print(f"❌ Failed to update: {name} (item may not exist)")
        
        print(f"\n🎉 Successfully updated {updated_count} menu items with fresh images!")
        
        # Verify all updates
        menu_items = await db.menu_items.find().to_list(1000)
        items_with_images = [item for item in menu_items if item.get('image_url')]
        print(f"📸 Total items with images: {len(items_with_images)}/{len(menu_items)}")
        
        # Test a few image URLs
        print(f"\n🔍 Sample image URLs:")
        for i, item in enumerate(menu_items[:3]):
            print(f"  {i+1}. {item['name']}: {item.get('image_url', 'NO IMAGE')}")
        
    except Exception as e:
        print(f"❌ Error updating fresh images: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_fresh_images())