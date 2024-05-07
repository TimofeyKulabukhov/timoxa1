FROM python:3.12-slim

RUN pip3 install flask-login

RUN pip3 install flask-SQLAlchemy

COPY . /opt/app

WORKDIR /opt/app

CMD [ "python", "./app.py" ]