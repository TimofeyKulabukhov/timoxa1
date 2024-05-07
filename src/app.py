from flask import Flask, render_template , request , redirect , url_for, flash
from flask_login import LoginManager, login_user, logout_user, current_user
from werkzeug.security import check_password_hash, generate_password_hash
import os
from model import Catalog, User, db, Korzina

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/add', methods=['POST'])
def add():
    title = request.form['code']
    note = Catalog.query.filter_by(id = title).first()
    korz = Korzina(toy = note.toy, price = note.price , image = note.image)
    db.session.add(korz)
    db.session.commit()
    return redirect(url_for('korzina'))

@app.route('/remove', methods=['POST'])
def remove():
    title = request.form['code']
    Korzina.query.filter_by(id = title).delete()
    db.session.commit()
    return redirect(url_for('korzina'))




@app.route('/store')
def stores():
    catalog_list = Catalog.query.all()
    return render_template('catalog.html', catalogs = catalog_list)

@app.route ('/main')
def main():
    return render_template('index.html')

@app.route ('/korzina')
def korzina():
    catalog_list = Korzina.query.all()
    return render_template('korzina.html', catalogs = catalog_list )
@app.route ('/review')
def rev():
    return render_template('Reviews.html')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))
    else:
        return render_template('index.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('profile'))
        else:
            flash('Invalid username or password')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        user = User.query.filter_by(username=username).first()
        if user:
            flash('Username already taken')
        else:
            hashed_password = generate_password_hash    (password)
            new_user = User(username=username, password=hashed_password, email=email)
            db.session.add(new_user)
            db.session.commit() 
            flash('Account created successfully')
            return redirect(url_for('login'))
    return render_template('register.html')
@app.route('/profile')
def profile():
    if current_user.is_authenticated:
        return render_template('profile.html', user=current_user)
    else:
        return redirect(url_for('login'))
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('main'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.secret_key = os.urandom(24)
    app.run(debug=True)
    
if __name__ =='__main__':
    app.run(host="0.0.0.0")
    