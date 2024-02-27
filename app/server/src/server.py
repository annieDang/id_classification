from flask import Flask
from flask.logging import default_handler
import logging, json, os, sys, json_logging
from werkzeug.exceptions import HTTPException

## Logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)


# endpoints of this api
from routers.api import *


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps(
        {
            "error" "code": e.code,
            "name": e.name,
            "description": e.description,
        }
    )
    response.content_type = "application/json"
    return response
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6789)
