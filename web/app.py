from flask import Flask, render_template, jsonify, render_template_string, send_file, url_for, redirect, session, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

HOST = '0.0.0.0'
PORT = '5001'


@app.route("/report")
def report():
    return render_template("reportURL.html")


################ USER #################

@app.route("/")
def home():
    return render_template('user/checkURL.html')


@app.route("/predict", methods=["GET", "POST"])
def predict():
    data = {"success": False}

    if request.method == "POST":
        incoming = request.get_json()
        url = incoming["url"]

        if url == '':
            return jsonify({'message': 'Maybe your input not correct'})

        data["predictions"] = []

        r = {"result": "The URL may be malicious one", "phishingPercentage": 66.6,
             "url": url, "detail": {}}
        data["predictions"].append(r)

        # Show that the request was a success.
        data["success"] = True
        data["time_elapsed"] = datetime.datetime.now()
        return jsonify(data)
    else:
        return jsonify({'message': 'Send me something'})


@app.route("/feedback", methods=["GET", "POST"])
def report_url():
    data = {"success": False}

    if request.method == "POST":
        incoming = request.get_json()

        return jsonify(incoming)
    else:
        return jsonify({'message': 'Send me something'})



if __name__ == '__main__':
    app.run(HOST, PORT, debug=True)
