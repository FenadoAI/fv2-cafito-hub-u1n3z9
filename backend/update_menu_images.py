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

# Menu item image mappings
menu_images = {
    "Arabic Coffee (Qahwa)": "https://storage.googleapis.com/fenado-ai-farm-public/generated/4986d74b-45bb-46c4-acbe-f69d87b30fbe.webp",
    "Turkish Coffee": "https://storage.googleapis.com/fenado-ai-farm-public/generated/ab5ab9a0-eced-4a2b-8056-27c55863456c.webp",
    "Dubai Blend Espresso": "https://storage.googleapis.com/fenado-ai-farm-public/generated/c60c95a4-07c0-4218-b074-b7c87fad40fa.webp",
    "Saffron Latte": "https://storage.googleapis.com/fenado-ai-farm-public/generated/32712707-1160-423d-8f97-f7b23790d65d.webp",
    "Rose Cardamom Cappuccino": "https://storage.googleapis.com/fenado-ai-farm-public/generated/3d3cb86c-46f2-448e-b922-8e7a7491fc02.webp",
    "Gold Dust Mocha": "https://storage.googleapis.com/fenado-ai-farm-public/generated/63e682fd-e3e7-4f19-954b-c132813bd6be.webp",
    "Iced Arabic Coffee": "https://storage.googleapis.com/fenado-ai-farm-public/generated/e428cd19-e57f-4108-b903-5f5df96af450.webp",
    "Cold Brew with Dates": "https://storage.googleapis.com/fenado-ai-farm-public/generated/ac4b7ffb-3a5d-4572-a369-90bbe3060a79.webp",
    "Mint Lemonade": "https://storage.googleapis.com/fenado-ai-farm-public/generated/0834fa74-0f51-4421-b059-00306ae0558d.webp",
    "Baklava": "https://storage.googleapis.com/fenado-ai-farm-public/generated/d58d7962-5669-48cc-9504-4bdb4988af6b.webp",
    "Ma'amoul": "https://storage.googleapis.com/fenado-ai-farm-public/generated/881ed52a-0beb-4ee5-ac97-1d27c110670f.webp",
    "Kunafa": "https://storage.googleapis.com/fenado-ai-farm-public/generated/00bb2fa1-5509-411e-a602-46a3c4a19bdc.webp",
    "Shakshuka": "https://storage.googleapis.com/fenado-ai-farm-public/generated/85150ee9-3798-4ebd-af2a-113589a865c3.webp",
    "Arabic Breakfast Platter": "https://storage.googleapis.com/fenado-ai-farm-public/generated/9cf0907a-2731-479a-ab88-49c0fce9106a.webp",
    "Mixed Nuts": "https://storage.googleapis.com/fenado-ai-farm-public/generated/9e6fa7ba-dd8b-4e2c-9001-b451025f2524.webp",
    "Halloumi Sandwich": "https://storage.googleapis.com/fenado-ai-farm-public/generated/fcdfd173-965a-439e-9737-3abd592e9a7b.webp"
}

async def update_menu_images():
    try:
        updated_count = 0
        
        for name, image_url in menu_images.items():
            result = await db.menu_items.update_one(
                {"name": name},
                {"$set": {"image_url": image_url}}
            )
            
            if result.modified_count > 0:
                print(f"✅ Updated image for: {name}")
                updated_count += 1
            else:
                print(f"❌ Failed to update: {name}")
        
        print(f"\n🎉 Successfully updated {updated_count} menu items with images!")
        
        # Verify the updates
        menu_items = await db.menu_items.find().to_list(1000)
        items_with_images = [item for item in menu_items if item.get('image_url')]
        print(f"📸 Total items with images: {len(items_with_images)}/{len(menu_items)}")
        
    except Exception as e:
        print(f"Error updating menu images: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_menu_images())