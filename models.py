import uuid
from typing import Optional
from pydantic import BaseModel, Field
from datetime import date, datetime, time, timedelta

class Post(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    date: datetime.date = Field(...)
    time : datetime.time = Field(...)
    text: str = Field(...)
    courseName: str = Field(...)
    sectionNum : int = Field(...)
    replies : List[id] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "date" : "11-27",
                "time" : "06:44",
                "text": "Is there extra credit in this course?",
                "courseName": "Advanced Algortithm Design",
                "sectionNumber": "003"
            }
        }

class BookUpdate(BaseModel):
    text: Optional[str]
    date: datetime.date
    time : datetime.time

    class Config:
        schema_extra = {
            "example": {
                "text": "Will there be extra credit opportunities in this course?",
                "date" : "11-27",
                "time" : "06:48"
            }
        }
        
class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    email : str = Field(...)
    firstName : str = Field(...)
    lastName : str = Field(...)
    postsIDs: list = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": "066de609-b04a-7823-b46c-32537c7f1f6e",
                "email" : "tbx190035@utdallas.edu",
                "firstName" : "John",
                "lastName" : "Stevens",
                "postIDs" : "{01, 45, 74}"
            }
        }