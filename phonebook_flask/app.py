from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_cors import CORS
from dataclasses import dataclass

app = Flask(__name__)
CORS(app)

# Add Database
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///users.db'
# Secret Key
app.config['SECRET_KEY'] = "secret"

db = SQLAlchemy(app)
ma = Marshmallow(app)
app.app_context().push()

@dataclass
class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key = True)
    # primary key is always unique
    name = db.Column(db.String(100), nullable = False)
    phoneNumber = db.Column(db.String(100), nullable = False)
    # phoneNumber = db.Column(db.Integer, nullable = False)

    def __repr__(self):
        return f"User ('{self.id}','{self.name}', '{self.phoneNumber}')"
    
    def __init__(self,name, phoneNumber):
        self.name = name
        self.phoneNumber = phoneNumber

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        # fields = ('id', 'name', 'phoneNumber')
        model = Users

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route("/")
def hello_world():
    return "<p> Hello </p>"

@app.route("/listContacts", methods = ['GET'])
def listContacts():
    all_users = Users.query.all()
    output = users_schema.dump(all_users)
    return jsonify(output)


@app.route("/useradd", methods=["POST"])
def useradd():
    name = request.json["name"]
    phoneNumber = request.json["phoneNumber"]

    users = Users(name, phoneNumber)
    db.session.add(users)
    db.session.commit()

    return jsonify(users)

@app.route('/userdetails/<id>',methods =['GET'])
def userdetails(id):
    user = Users.query.get(id)
    output = user_schema.dump(user)

    return jsonify(output)
 
@app.route('/userupdate/<id>',methods = ['PUT'])
def userupdate(id):
    user = Users.query.get(id) 
    name = request.json['name']
    phoneNumber = request.json['phoneNumber']
 
    user.name = name
    user.phoneNumber = phoneNumber
    
    db.session.commit()
    return jsonify(user)

@app.route('/userdelete/<id>',methods=['DELETE'])
def userdelete(id):
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)

if __name__ == '__main__':
    app.debug = True
    app.run()