from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId
import pymongo
from datetime import datetime
from typing import Optional

Database = APIRouter()

class Item(BaseModel):
    order_id: str
    ship_date: str
    ship_mode: str
    customer_name: str
    segment: str
    state: str
    country: str
    market: str
    region: str
    product_id: str
    category: str
    sub_category: str
    product_name: str
    sales: float
    quantity: int
    discount: float
    profit: float
    shipping_cost: float
    order_priority: str
    day: int
    month: int
    year: int

MONGO_URI = "mongodb+srv://shanukafer98:Mongodb123.@cluster0.gtbdj6v.mongodb.net/SSD"
client = pymongo.MongoClient(MONGO_URI)
db = client.get_database()

COLLECTION_NAME6 = "Super_Store_Data"
collection6 = db[COLLECTION_NAME6]



@Database.get('/items/', response_model=List[Item])
async def read_items(start: Optional[str] = None, end: Optional[str] = None):
    if start and end:
        start_date = datetime.strptime(start, "%Y-%m-%d")
        end_date = datetime.strptime(end, "%Y-%m-%d")
        items = list(collection6.find().sort("_id", -1).limit(500))  # Increase limit for testing
        filtered_items = []
        for item in items:
            try:
                record_date = datetime(item['year'], item['month'], item['day'])
            except ValueError:
                print(f"Could not parse date: {item['year']}-{item['month']}-{item['day']}")
                continue
            if start_date <= record_date <= end_date:
                item['_id'] = str(item['_id'])
                filtered_items.append(item)
        return filtered_items
    else:
        items = list(collection6.find().sort("_id", -1).limit(20))
        for item in items:
            item['_id'] = str(item['_id'])
        return items
    
    


@Database.get('/items/{order_id}', response_model=Item)
async def read_item_by_order_id(order_id: str):
    item = collection6.find_one({'order_id': order_id})
    if item:
        item['_id'] = str(item['_id'])
        return item
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@Database.post('/items/', response_model=Item)
async def create_item(item: Item):
    item_dict = item.dict()
    result = collection6.insert_one(item_dict)
    item_dict['_id'] = str(result.inserted_id)
    return item_dict

@Database.put('/items/{item_id}', response_model=Item)
async def update_item(item_id: str, item: Item):
    item_dict = item.dict()
    result = collection6.replace_one({'_id': ObjectId(item_id)}, item_dict)
    if result.modified_count:
        return item_dict
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@Database.delete('/items/{item_id}')
async def delete_item(item_id: str):
    result = collection6.delete_one({'_id': ObjectId(item_id)})
    if result.deleted_count:
        return {"status": "success"}
    else:
        raise HTTPException(status_code=404, detail="Item not found")