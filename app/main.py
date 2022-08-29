from fastapi import Depends, FastAPI, Request, status, HTTPException, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import Response

from sqlalchemy.orm import Session
from sqlalchemy import func

import app.models as models, app.schemas as schemas
from app.database import SessionLocal, engine, get_db
from .config import settings

models.Base.metadata.create_all(bind=engine)

app=FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

@app.get("/")
def customers(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/customer", status_code=status.HTTP_201_CREATED)
def create_customer(customer: schemas.CreateCustomer, db: Session = Depends(get_db)):
    new_customer=models.Customers(**customer.dict())
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    print(customer.last_name)
    return {"customer_first":customer.first_name, "customer_last":customer.last_name}


@app.get("/find_customer/{name}")
def find_customer(name: str, db: Session = Depends(get_db)):
    inquiry=db.query(models.Customers).filter(models.Customers.last_name==name).first()
    if not inquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    print(inquiry.first_name +" "+ inquiry.last_name)
    return {"first_name": inquiry.first_name, "last_name": inquiry.last_name, "phone": inquiry.phone, "email": inquiry.email}
