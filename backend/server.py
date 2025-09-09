from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Enums
class CategoryEnum(str, Enum):
    SPECIALTY_COFFEE = "specialty_coffee"
    TRADITIONAL_COFFEE = "traditional_coffee"
    COLD_BEVERAGES = "cold_beverages"
    PASTRIES = "pastries"
    BREAKFAST = "breakfast"
    SNACKS = "snacks"

class OrderStatusEnum(str, Enum):
    PENDING = "pending"
    PREPARING = "preparing"
    READY = "ready"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

# Define Models
class MenuItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    name_ar: str  # Arabic name
    description: str
    description_ar: str  # Arabic description
    price: float
    category: CategoryEnum
    image_url: Optional[str] = None
    available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MenuItemCreate(BaseModel):
    name: str
    name_ar: str
    description: str
    description_ar: str
    price: float
    category: CategoryEnum
    image_url: Optional[str] = None
    available: bool = True

class OrderItem(BaseModel):
    menu_item_id: str
    quantity: int
    price: float
    name: str

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    customer_phone: Optional[str] = None
    items: List[OrderItem]
    total_amount: float
    status: OrderStatusEnum = OrderStatusEnum.PENDING
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: Optional[str] = None
    items: List[OrderItem]
    notes: Optional[str] = None

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Welcome to Cafito API"}

# Menu endpoints
@api_router.post("/menu", response_model=MenuItem)
async def create_menu_item(item: MenuItemCreate):
    item_dict = item.dict()
    menu_item = MenuItem(**item_dict)
    await db.menu_items.insert_one(menu_item.dict())
    return menu_item

@api_router.get("/menu", response_model=List[MenuItem])
async def get_menu():
    menu_items = await db.menu_items.find({"available": True}).to_list(1000)
    return [MenuItem(**item) for item in menu_items]

@api_router.get("/menu/category/{category}", response_model=List[MenuItem])
async def get_menu_by_category(category: CategoryEnum):
    menu_items = await db.menu_items.find({"category": category, "available": True}).to_list(1000)
    return [MenuItem(**item) for item in menu_items]

@api_router.get("/menu/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: str):
    item = await db.menu_items.find_one({"id": item_id})
    if not item:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Menu item not found")
    return MenuItem(**item)

@api_router.put("/menu/{item_id}", response_model=MenuItem)
async def update_menu_item(item_id: str, item_update: MenuItemCreate):
    from fastapi import HTTPException
    existing_item = await db.menu_items.find_one({"id": item_id})
    if not existing_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    update_dict = item_update.dict()
    await db.menu_items.update_one({"id": item_id}, {"$set": update_dict})
    
    updated_item = await db.menu_items.find_one({"id": item_id})
    return MenuItem(**updated_item)

# Order endpoints
@api_router.post("/orders", response_model=Order)
async def create_order(order: OrderCreate):
    order_dict = order.dict()
    total_amount = sum(item.price * item.quantity for item in order.items)
    order_dict["total_amount"] = total_amount
    
    new_order = Order(**order_dict)
    await db.orders.insert_one(new_order.dict())
    return new_order

@api_router.get("/orders", response_model=List[Order])
async def get_orders():
    orders = await db.orders.find().sort("created_at", -1).to_list(1000)
    return [Order(**order) for order in orders]

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    from fastapi import HTTPException
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)

@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: OrderStatusEnum):
    from fastapi import HTTPException
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    await db.orders.update_one(
        {"id": order_id}, 
        {"$set": {"status": status, "updated_at": datetime.utcnow()}}
    )
    
    updated_order = await db.orders.find_one({"id": order_id})
    return Order(**updated_order)

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
