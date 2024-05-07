from flask import Flask
from model import User, Catalog, db
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        toy1 = Catalog(toy = 'Плюшевый заяц, красный', price = '1490' , image =  '/static/1.jpeg')
        toy2 = Catalog(toy = 'обезьянка', price = '1490' , image = '/static/2.jpg')
        toy3 = Catalog(toy = 'плюшевый заяц, серый', price = '1490', image = '/static/3.jpg')
        db.session.add_all([toy1, toy2, toy3])      
        db.session.commit()
        
        
