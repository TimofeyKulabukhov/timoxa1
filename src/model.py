from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)


class Catalog(db.Model):
    id = db.Column (db.Integer, primary_key = True)
    toy= db.Column (db.String(64), nullable = False)
    price = db.Column (db.Numeric(precision=4, scale=2), nullable = False)
    image = db.Column (db.String(256), nullable = False)
    
class Korzina(db.Model):
    id = db.Column (db.Integer, primary_key = True)
    toy = db.Column (db.String(64), nullable = False)
    price = db.Column (db.Numeric(precision=4, scale=2), nullable = True)
    image = db.Column (db.String(256), nullable = False)
    
    def __repr__(self):
        return f'<User {self.username}>'
    