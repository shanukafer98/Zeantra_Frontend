from fastapi import FastAPI, APIRouter, HTTPException
import pandas as pd
import pymongo

AutomateRoute = APIRouter()

data= pd.read_csv('fullData.csv')

MONGO_URI = "mongodb+srv://shanukafer98:Mongodb123.@cluster0.gtbdj6v.mongodb.net/SSD"
MONGO_URI2 = "mongodb+srv://shanukafer98:Mongodb123.@cluster0.gtbdj6v.mongodb.net"
client = pymongo.MongoClient(MONGO_URI)
db = client.get_database()

COLLECTION_NAME1 = "Charts"
collection = db[COLLECTION_NAME1]

COLLECTION_NAME2 = "Users"
collection2 = db[COLLECTION_NAME2]

COLLECTION_NAME3 = "Forecast"
collection3 = db[COLLECTION_NAME3]

COLLECTION_NAME4 = "Top20s"
collection4 = db[COLLECTION_NAME4]

COLLECTION_NAME5 = "Negative"
collection5 = db[COLLECTION_NAME5]
