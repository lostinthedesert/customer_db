from datetime import datetime
import email
from typing import Optional
from pydantic import BaseModel, EmailStr

class CreateCustomer(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr

class SearchCustomer(BaseModel):
    last_name: str

class CustomerResult(CreateCustomer):
    pass