from fastapi import APIRouter, HTTPException
import pymongo
AutorunRoute = APIRouter()

from connection import data, collection,MONGO_URI

import inspect
import routes.Automate

# Connect to the MongoDB server
client = pymongo.MongoClient(MONGO_URI)
db = client.get_database()

COLLECTION = "Super_Store_Data"
dataTable = db[COLLECTION] 

def Datacount():
    try:
        # Count the number of documents in the collection
        count = dataTable.count_documents({})
        return count
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def send_count():
    try:
        # Count the number of documents in the collection
        count = Datacount()

        collection.delete_many({"data_count": {"$exists": True}})
        # Insert the new document
        collection.insert_one({"data_count": count})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return

def get_count():
        try:
            docs = collection.find()
            for doc in docs:
                if 'data_count' in doc:
                    data_count = doc['data_count']
                    return data_count
            return {"message": "No data found"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


def runAll():
    functions_list = inspect.getmembers(routes.Automate, inspect.isfunction)
    for function_name, function_obj in functions_list:
        print("Running function:", function_name)
        function_obj()  # Call the function dynamically

# Checking wheather the data is added or deleted from the MongoDB
def check_count():
    if Datacount() == get_count():
        return True
    else:
        return runAll()


@AutorunRoute.get("/autorun")
def autorun():
    if Datacount()==get_count():
        return {"message": "Data is not Changed."}
    else:
        runAll()
        send_count()
        return {"message": "Data is updated successfully."}