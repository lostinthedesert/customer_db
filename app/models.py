from sqlalchemy import Boolean, CheckConstraint, Column, ForeignKey, Integer, String
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

from app.database import Base

class Customers(Base):
    __tablename__="customers"
    id= Column(Integer, primary_key=True)
    first_name= Column(String, nullable=False)
    last_name= Column(String, nullable=False)
    phone= Column(String, nullable=False)
    email=Column(String, nullable=False)