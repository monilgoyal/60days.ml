#!/usr/bin/env python
# encoding: utf-8
from flask import Flask,request,render_template,jsonify,redirect
from flask_pymongo import PyMongo
import json
from dotenv import load_dotenv
import os
app=Flask("myapp")
load_dotenv('cred.env')
mongodb_client = PyMongo(app, uri=f"mongodb+srv://{os.getenv('USER_NAME')}:{os.getenv('PASSWD')}@cluster0.hztol.mongodb.net/course?retryWrites=true&w=majority")
db = mongodb_client.db
@app.route("/",methods = ['POST','GET'])
def ajax():
    if request.method=="POST" and request.is_json:
        data = request.get_json()
        x=[]
        y=[]
        z=[]
        for i in db[str(data['course'])].find().sort([("day", 1)]):
            x.append(i['day'])
            y.append(i['date'])
            z.append(i['url'])

        return jsonify(x,y,z)
    else:
        collections=db.list_collection_names()
        return render_template('index.html',db=db,coll=collections)
@app.errorhandler(404)
def page_not_found(e):
    return ('<h1>Page Not Found</h1>'), 404
if __name__ == "__main__":
    app.run(host=os.getenv('HOST'),port=os.getenv('PORT'))