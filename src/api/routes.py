"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


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
    response_body = {"response": "Registro exitoso",
                     "user": new_user.serialize()}

    return jsonify(response_body), 201


@api.route("/login", methods=["GET", "POST"])
def handle_login():
    data = request.get_json()
    response_body = {}
    if not data["email"] or not data["password"]:
        response_body = {"response": "No es posible validar sus datos", "isLoguedIn": False}
        return jsonify(response_body), 400    
    user = User.query.filter_by(email = data["email"]).first()
    if (user.password == data["password"]):
        response_body = {"response": "Logueo exitoso", "isLogedIn": True}
        return jsonify(response_body), 200
    else:
        response_body = {"response": "Correo o contraseña inválidos", "isLoguedIn": False}
        return jsonify(response_body), 401

