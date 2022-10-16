from flask import Flask
import flask
from jinja2 import Undefined
import requests
import flask_cors

app = Flask(__name__)
flask_cors.CORS(app)


@app.route("/listGuitars/", methods=["GET", "POST"])
@flask_cors.cross_origin()
def listGuitars():
    return requests.get(
        "https://services.guitarguitar.co.uk/WebService/api/hackathon/guitars"
    ).json()


@app.route("/listCoolGuitars/", methods=["GET", "POST"])
@flask_cors.cross_origin()
def listCoolGuitars():
    return requests.get(
        "https://services.guitarguitar.co.uk/WebService/api/hackathon/guitarswithsongs"
    ).json()


@app.route("/spotify/", methods=["GET", "POST"])
@flask_cors.cross_origin()
def spotify():
    return requests.post(
        "https://accounts.spotify.com/api/token",
        {
            "grant_type": "client_credentials",
            "client_id": "59bba2356596401cbd8bf46071610dc7",
            "client_secret": "a556972fe6454b999a51a9b198828d93",
        },
    ).json()


if __name__ == "__main__":
    # print(requests.get('https://services.guitarguitar.co.uk/WebService/api/hackathon/guitars').json())
    app.run(host="0.0.0.0", port=105)

    # function gettoken(){
    #   var client_id = '59bba2356596401cbd8bf46071610dc7';
    #   var client_secret = 'a556972fe6454b999a51a9b198828d93';

    #   let utf8Encode = new TextEncoder();
    #   utf8Encode.encode(client_id+':'+client_secret);
    #   let b = utf8Encode.toString('base64')

    # const authOptions = {
    #   url: 'https://accounts.spotify.com/api/token',
    #   method: 'POST',
    #   headers: {
    #     'Authorization': 'Basic ' + b
    #   },
    #   form: {
    #     grant_type: 'client_credentials'
    #   },
    #   json: true
    # };
