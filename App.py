from flask import Flask, render_template, url_for, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm

from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError, Regexp, EqualTo
from flask_bcrypt import Bcrypt

app = Flask(__name__)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'thisisasecretkey'


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
   id = db.Column(db.Integer, primary_key=True)
   nome = db.Column(db.String(50), nullable=False)
   cognome = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(80), nullable=False, unique=True)
   username = db.Column(db.String(20), nullable=False, unique=True)
   password = db.Column(db.String(80), nullable=False)



class SignupForm(FlaskForm):
      nome = StringField(validators=[InputRequired(), Length(min=3, max=50), Regexp("^[A-Za-z]*$", 0, "Il nome deve contenere solo lettere")], render_kw={"placeholder": "inserisci il nome"})
      cognome = StringField(validators=[InputRequired(), Length(min=3, max=50), Regexp("^[A-Za-z]*$", 0, "Il cognome deve contenere solo lettere")], render_kw={"placeholder": "inserisci il cognome"})
      email = StringField(validators=[InputRequired(), Length(min=4, max=250), Regexp("[^@]+@[^@]+\.[^@]+", 0, "L'email inserito è invalido")], render_kw={"placeholder": "inserisci l'email"})
      username = StringField(validators=[InputRequired(), Length(min=4, max=25, message="Inserisci un username da 4 caratteri"), Regexp("^[A-Za-z][A-Za-z0-9_.]*$", 0, "L'username deve contenere solo lettere, numeri, punti e underscore")], render_kw={"placeholder": "inserisci l'username"})
      password = PasswordField(validators=[InputRequired(), Length(min=4, max=25)], render_kw={"placeholder": "inserisci la password"})
      conf_password = PasswordField(validators=[InputRequired(), Length(min=4, max=25), EqualTo("password", message="Le password non coincidono")], render_kw={"placeholder": "conferma la password"})

      submit = SubmitField("REGISTRATI")

      def validate_email(self, email):
                alrexi_email = User.query.filter_by(email=email.data).first()
                if alrexi_email:
                   raise ValidationError("Email già esistente. Sceglitene un'altra")

      def validate_username(self, username):
          alrexi_username = User.query.filter_by(username=username.data).first()
          if alrexi_username:
             raise ValidationError("Username già esistente. Sceglitene un altro")



class LoginForm(FlaskForm):
      username = StringField(validators=[InputRequired(), Length(min=4, max=25)], render_kw={"placeholder": "inserisci l'username"})
      password = PasswordField(validators=[InputRequired(), Length(min=4, max=25)], render_kw={"placeholder": "inserisci la password"})

      submit = SubmitField("ACCEDI")


@app.route('/')
def home():
   return render_template('Prepage.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
   form = LoginForm()
   msg = ""

   if form.validate_on_submit():
      user = User.query.filter_by(username=form.username.data).first()
      if user:
         if bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('homepage'))
         else:
             msg = "Username o password non validi"
      else:
          msg = "Username o password non validi"

   return render_template('LoginHML.html', form=form, msg=msg)

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
   form = SignupForm()
   msg = ""

   if form.validate_on_submit():
    try:
      hashed_password = bcrypt.generate_password_hash(form.password.data)
      new_user = User(nome=form.nome.data, cognome=form.cognome.data, email=form.email.data, username=form.username.data, password=hashed_password)
      db.session.add(new_user)
      db.session.commit()
      flash(f"Registrazione avvenuta con successo", "success")
      return redirect(url_for('login'))

    except Exception as e:
        flash(e, "danger")

   return render_template('SignupHML.html', form=form, msg=msg)

@app.route('/homepage', methods=['GET', 'POST'])
@login_required
def homepage():
    return render_template('HorrorMovieland.html')

@app.route('/homepage/account', methods=['GET', 'POST'])
@login_required
def account():
    return render_template('Account.html')



if __name__ == '__main__': #Tutto questo serve per runnare l'app dal localhost
    app.run(debug=True)
# Store this code in 'app.py' file