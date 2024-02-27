"""
Includes all url endpoints 
"""
from flask import request

import json
import sys
from controller.classify import classify_file

sys.path.append("../src")

from server import app
import json_logging
json_logging.init_flask(enable_json=True)
json_logging.init_request_instrument(app)
from flask_cors import CORS, cross_origin

@app.route("/healthCheck", methods=["GET"])
def health_check():
    return {"ok": 1}, 200


@app.route("/api/classify", methods=["POST"])
@cross_origin(supports_credentials=True)
def classify_id():
    app.logger.info(" Uploading an image...")
    
    return classify_file(request.files.getlist("file")[0])

