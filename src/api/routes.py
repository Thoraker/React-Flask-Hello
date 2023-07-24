"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
import datetime
import jwt
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

if os.getenv("SECRET_KEY") != None:
    db_secret = os.getenv("SECRET_KEY")
else:
    db_secret = 'Secret_1234'


def encode_auth_token(user_id):
    try:
        payload = {
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
            "iat": datetime.datetime.utcnow(),
            "sub": user_id
        }
        return jwt.encode(payload, db_secret, algorithm='HS256')
    except Exception as e:
        return e


def decode_auth_token(token):
    try:
        payload = jwt.decode(token, db_secret, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return jsonify({"valid": False, "message": "Token expired"})
    except jwt.InvalidTokenError:
        return jsonify({"valid": False, "message": "Invalid token"})


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request",
        "token": None
    }

    return jsonify(response_body), 200


@api.route("/register", methods=["GET", "POST"])
def handle_register():

    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()
    if user:
        response_body = {"response": "Email already in use"}
        return jsonify(response_body), 401

    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        email=data["email"],
        password=hashed_password,
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

    user = User.query.filter_by(email=data['email']).first()
    if not user:
        response_body = {"response": "User not found",  "token": None}
        return jsonify(response_body), 404

    if check_password_hash(user.password, data['password']):
        auth_token = encode_auth_token(user.id)
        response_body = {"response": "Logged in correctly",
                         "token": auth_token}
        return jsonify(response_body), 200
    else:
        response_body = {
            "response": "Invalid Email or Password ", "token": None}
        return jsonify(response_body), 401


@api.route("/private", methods=["GET", "POST"])
def handle_private():
    auth_header = request.headers.get("Authorization")
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        return jsonify(message="Token missing"), 401

    response_body = decode_auth_token(auth_token)
    return jsonify(response_body), 200
