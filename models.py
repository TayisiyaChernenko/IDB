import uuid
from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List

class Post(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    date: datetime.date = Field(...)
    time : datetime.time = Field(...)
    text: str = Field(...)
    courseName: str = Field(...)
    sectionNum : int = Field(...)
    replies : List[str] = Field(default_factory=list)

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

# This allows partial update, where the post content can be changed (and the date/time it's been most recently touched) 
# without changing the post id or what class/section it belongs under
class PostUpdate(BaseModel):
    text: str = Field(...)
    date: datetime.date = Field(...)
    time : datetime.time = Field(...)
    class Config:
        schema_extra = {
            "example": {
                "text ": "Is there extra credit opportunities in March in this course?",
                "date": "11-27",
                "time": "06:49"
            }
        } 

class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    email : str = Field(...)
    firstName : str = Field(...)
    lastName : str = Field(...)
    postIDs: list = Field(default_factory=list)

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

class UserUpdate(BaseModel):
    postIDs: list = Field(default_factory=list)
    class Config:
        schema_extra = {
            "example": {
                "postIDs" : "{01, 45}" #In this case we removed a post ID, meaning user had deleted a post they made 
            }
        } 