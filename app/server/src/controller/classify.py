from ml_model.model import Model
import cv2
import cv2
import numpy as np
import os
import skimage
import json

from controller.rectify.detect import rectify

CLASS_NAME = [
    {"id":"alb_id", "name": "ID Card of Albania"},
    {"id":"aze_passport", "name": "Passport of Azerbaijan"},
    {"id":"esp_id", "name": "ID Card of Spain"},
    {"id":"est_id", "name": "ID Card of Estonia"},
    {"id":"fin_id", "name": "ID Card of Finland"},
    {"id":"grc_passport", "name":"Passport of Greece"},
    {"id":"lva_passport", "name":"Passport of Latvia"},
    {"id":"rus_internalpassport", "name":"Internal passport of Russia"},
    {"id":"srb_passport", "name": "Passport of Serbia"},
    {"id":"svk_id", "name": "ID Card of Slovakia"}
 ]
       
def classify_file(file):
   
    filename = file.filename
    # read image file string data
    filestr = file.read()
    
    
    #convert string data to numpy array
    npimg = np.fromstring(filestr, np.uint8)
    # convert numpy array to image
    imgDecoded = cv2.imdecode(npimg, cv2.COLOR_BGR2RGB)
    
    
    # read image file
    img = skimage.io.imread(file)
    
    #list of potential rois
    rois = rectify(img)
    
    best = None
    
    for (detected_roi, array_coord) in rois:
        
        model = Model("BaselineCNN")
        
        outcome = model.predict(detected_roi[None, ...])
        
        print("outcome", outcome)
        
        # best outcome is the first box
        if best == None: best = (outcome, array_coord)
        # replace best with better
        if np.max(best[0]) < np.max(outcome): best = (outcome, array_coord)
    
    if best == None: return "Unidentified"
    
    return json.dumps(
        {
            "predict": "{class_name} | {percent:.2f}%".format(
                class_name = CLASS_NAME[np.argmax(outcome)].get("name"), percent = np.max(outcome) * 100), 
            "roi": array_coord
        }
    )
    
   