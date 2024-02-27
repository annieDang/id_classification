import json
import os
from keras.models import load_model

class Model:
    def __init__(self, model_name):
        self.name = model_name
        self.model = self.load_model()

    def predict(self, data):
        return self.model.predict(data)
    
    @staticmethod   
    def loadConfig():
        BASE_DIR = os.path.dirname(__file__)
        MODELS = open(os.path.join(BASE_DIR, "path.json"))
        return MODELS

    def load_model(self):
        BASE_DIR = os.path.dirname(__file__)
        MODELS = Model.loadConfig()
        fileName = json.load(MODELS)[self.name]
        filePath = os.path.join(BASE_DIR, fileName)
            
        return load_model(filePath)
