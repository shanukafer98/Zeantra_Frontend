from fastapi import APIRouter, HTTPException

ChatbotRoute = APIRouter()
from connection import data,MONGO_URI

@ChatbotRoute.post('/openfile')
def append_file(data: str):
    try:
        with open('Chat.txt', 'a') as file:
            file.write(data)
            file.write('\n')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@ChatbotRoute.post('/valueCounts_shipMode')
def valueCounts_shipMode():
    try:
        data1 = data['ship_mode'].value_counts().to_string()
        data2 = data['segment'].value_counts().to_string()
        data3 = data['country'].value_counts().to_string()
        data4 = data['state'].value_counts().to_string()
        data5 = data['market'].value_counts().to_string()
        data6 = data['region'].value_counts().to_string()
        data7 = data['category'].value_counts().to_string()
        data8 = data['sub_category'].value_counts().to_string()
        data9 = data['order_priority'].value_counts().to_string()


        append_file('Value Counts of the data')
        append_file(data1)
        append_file(data2)
        append_file(data3)
        append_file(data4)
        append_file(data5)
        append_file(data6)
        append_file(data7)
        append_file(data8)
        append_file(data9)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {'message': 'Data inserted into Chatbot successfully.'}  
