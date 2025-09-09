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

menu_items = [
    # Traditional Coffee
    {
        "name": "Arabic Coffee (Qahwa)",
        "name_ar": "قهوة عربية",
        "description": "Traditional Arabic coffee served with dates, cardamom-spiced",
        "description_ar": "قهوة عربية تقليدية تُقدم مع التمر، معطرة بالهيل",
        "price": 15.0,
        "category": "traditional_coffee",
        "available": True
    },
    {
        "name": "Turkish Coffee",
        "name_ar": "قهوة تركية",
        "description": "Rich, strong coffee brewed in traditional cezve",
        "description_ar": "قهوة غنية وقوية محضرة في الجزوة التقليدية",
        "price": 18.0,
        "category": "traditional_coffee",
        "available": True
    },
    
    # Specialty Coffee
    {
        "name": "Dubai Blend Espresso",
        "name_ar": "إسبريسو خليط دبي",
        "description": "Medium roast with fruit-forward notes, locally roasted",
        "description_ar": "تحميص متوسط مع نكهات فاكهية، محمص محلياً",
        "price": 22.0,
        "category": "specialty_coffee",
        "available": True
    },
    {
        "name": "Saffron Latte",
        "name_ar": "لاتيه الزعفران",
        "description": "Creamy latte infused with premium saffron",
        "description_ar": "لاتيه كريمي معطر بالزعفران الفاخر",
        "price": 28.0,
        "category": "specialty_coffee",
        "available": True
    },
    {
        "name": "Rose Cardamom Cappuccino",
        "name_ar": "كابتشينو الورد والهيل",
        "description": "Aromatic cappuccino with rose water and cardamom",
        "description_ar": "كابتشينو عطري مع ماء الورد والهيل",
        "price": 26.0,
        "category": "specialty_coffee",
        "available": True
    },
    {
        "name": "Gold Dust Mocha",
        "name_ar": "موكا الغبار الذهبي",
        "description": "Luxurious mocha topped with edible gold flakes",
        "description_ar": "موكا فاخرة مزينة برقائق الذهب الصالحة للأكل",
        "price": 35.0,
        "category": "specialty_coffee",
        "available": True
    },
    
    # Cold Beverages
    {
        "name": "Iced Arabic Coffee",
        "name_ar": "قهوة عربية باردة",
        "description": "Refreshing cold Arabic coffee with dates",
        "description_ar": "قهوة عربية باردة منعشة مع التمر",
        "price": 20.0,
        "category": "cold_beverages",
        "available": True
    },
    {
        "name": "Cold Brew with Dates",
        "name_ar": "كولد برو مع التمر",
        "description": "Smooth cold brew sweetened with date syrup",
        "description_ar": "كولد برو ناعم محلى بدبس التمر",
        "price": 24.0,
        "category": "cold_beverages",
        "available": True
    },
    {
        "name": "Mint Lemonade",
        "name_ar": "عصير ليمون بالنعناع",
        "description": "Fresh lemonade with mint leaves",
        "description_ar": "عصير ليمون طازج مع أوراق النعناع",
        "price": 18.0,
        "category": "cold_beverages",
        "available": True
    },
    
    # Pastries
    {
        "name": "Baklava",
        "name_ar": "بقلاوة",
        "description": "Traditional Middle Eastern pastry with honey and nuts",
        "description_ar": "حلوى شرق أوسطية تقليدية بالعسل والمكسرات",
        "price": 15.0,
        "category": "pastries",
        "available": True
    },
    {
        "name": "Ma'amoul",
        "name_ar": "معمول",
        "description": "Date-filled cookies, perfect with coffee",
        "description_ar": "كعك محشو بالتمر، مثالي مع القهوة",
        "price": 12.0,
        "category": "pastries",
        "available": True
    },
    {
        "name": "Kunafa",
        "name_ar": "كنافة",
        "description": "Sweet cheese pastry with orange blossom syrup",
        "description_ar": "معجنات الجبن الحلوة مع شراب زهر البرتقال",
        "price": 20.0,
        "category": "pastries",
        "available": True
    },
    
    # Breakfast
    {
        "name": "Shakshuka",
        "name_ar": "شكشوكة",
        "description": "Eggs poached in spiced tomato sauce with bread",
        "description_ar": "بيض مسلوق في صلصة الطماطم المتبلة مع الخبز",
        "price": 32.0,
        "category": "breakfast",
        "available": True
    },
    {
        "name": "Arabic Breakfast Platter",
        "name_ar": "طبق إفطار عربي",
        "description": "Hummus, labneh, olives, cheese, and Arabic bread",
        "description_ar": "حمص، لبنة، زيتون، جبن، وخبز عربي",
        "price": 38.0,
        "category": "breakfast",
        "available": True
    },
    
    # Snacks
    {
        "name": "Mixed Nuts",
        "name_ar": "مكسرات مشكلة",
        "description": "Premium Middle Eastern nuts and dried fruits",
        "description_ar": "مكسرات وفواكه مجففة شرق أوسطية فاخرة",
        "price": 25.0,
        "category": "snacks",
        "available": True
    },
    {
        "name": "Halloumi Sandwich",
        "name_ar": "ساندويش حلوم",
        "description": "Grilled halloumi with fresh vegetables in Arabic bread",
        "description_ar": "حلوم مشوي مع خضار طازجة في خبز عربي",
        "price": 28.0,
        "category": "snacks",
        "available": True
    }
]

async def seed_menu():
    try:
        # Clear existing menu items
        await db.menu_items.delete_many({})
        print("Cleared existing menu items")
        
        # Insert new menu items
        for item in menu_items:
            # Add required fields
            import uuid
            from datetime import datetime
            item["id"] = str(uuid.uuid4())
            item["created_at"] = datetime.utcnow()
            
            await db.menu_items.insert_one(item)
            print(f"Added: {item['name']}")
        
        print(f"\nSuccessfully seeded {len(menu_items)} menu items!")
        
    except Exception as e:
        print(f"Error seeding menu: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_menu())