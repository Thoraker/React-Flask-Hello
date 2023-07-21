"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/register", methods=["GET", "POST"])
def handle_register():

    data = request.get_json()
    new_user = User(
        email=data["email"],
        password=data["password"],
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()
    response_body = {"response": "Successful registration",
                     "user": new_user.serialize()}

    return jsonify(response_body), 201


@api.route("/login", methods=["GET", "POST"])
def handle_login():
    data = request.get_json()
    if not data["email"] or not data["password"]:
        response_body = {"response": "Impossible to validate", "isLoggedIn": False}
        return jsonify(response_body), 400    
    user = User.query.filter_by(email = data["email"]).first()
    if (user.password == data["password"]):
        response_body = {"response": "Logged in correctly", "isLoggedIn": True}
        return jsonify(response_body), 200
    else:
        response_body = {"response": "Invalid Email or Password ", "isLoggedIn": False}
        return jsonify(response_body), 401

