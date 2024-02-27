
# Import packages
import os
import cv2
import numpy as np
import tensorflow as tf
import sys

from PIL import Image

# Import utilites
from controller.rectify.utils import label_map_util, visualization_utils as vis_util


# Path to frozen detection graph .pb file, which contains the model that is used
# for object detection.
BASE_DIR = os.path.dirname(__file__)
PATH_TO_CKPT = os.path.join(BASE_DIR,'../../ml_model/files/frozen_inference_graph.pb')
# Path to label map file
PATH_TO_LABELS = os.path.join(BASE_DIR,'labelmap.pbtxt')

# Number of classes the object detector can identify
NUM_CLASSES = 1

MARGIN = 50

# Load the label map.
# Label maps map indices to category names, so that when our convolution
# network predicts `5`, we know that this corresponds to `king`.
# Here we use internal utility functions, but anything that returns a
# dictionary mapping integers to appropriate string labels would be fine
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)
    
def load():
    # Load the Tensorflow model into memory.
    detection_graph = tf.Graph()
    with detection_graph.as_default():
        od_graph_def = tf.compat.v1.GraphDef()
        with tf.io.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
            serialized_graph = fid.read()
            od_graph_def.ParseFromString(serialized_graph)
            tf.import_graph_def(od_graph_def, name='')

        sess = tf.compat.v1.Session(graph=detection_graph)

    # Define input and output tensors (i.e. data) for the object detection classifier

    # Input tensor is the image
    image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')

    # Output tensors are the detection boxes, scores, and classes
    # Each box represents a part of the image where a particular object was detected
    detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0')

    # Each score represents level of confidence for each of the objects.
    # The score is shown on the result image, together with the class label.
    detection_scores = detection_graph.get_tensor_by_name('detection_scores:0')
    detection_classes = detection_graph.get_tensor_by_name('detection_classes:0')

    # Number of objects detected
    num_detections = detection_graph.get_tensor_by_name('num_detections:0')
    
    return lambda image_expanded: sess.run(
        [detection_boxes, detection_scores, detection_classes, num_detections],
        feed_dict={image_tensor: image_expanded})

def rectify(image):
    
    detection_func = load()
    # Load image using OpenCV and
    # expand image dimensions to have shape: [1, None, None, 3]
    # i.e. a single-column array, where each item in the column has the pixel RGB value
    image_expanded = np.expand_dims(image, axis=0)

    # Perform the actual detection by running the model with the image as input
    (boxes, scores, classes, num) = detection_func(image_expanded)
    

    # Draw the results of the detection (aka 'visulaize the results')
    image, array_coords = vis_util.visualize_boxes_and_labels_on_image_array(
        image,
        np.squeeze(boxes),
        np.squeeze(classes).astype(np.int32),
        np.squeeze(scores),
        category_index,
        use_normalized_coordinates=True,
        line_thickness=3,
        min_score_thresh=0.60)

    # get resized images and their boxes
    results = []
    
    for (ymin, xmin, ymax, xmax) in array_coords:

        shape = np.shape(image)

        im_width, im_height = shape[1], shape[0]


        (left, right, top, bottom) = (int(xmin * im_width) + MARGIN,  int(xmax * im_width) - MARGIN, int(ymin * im_height) + MARGIN, int(ymax * im_height) - MARGIN)

        cropped_image = image[top:bottom, left:right]
        
        resized_image = cv2.resize(cropped_image, (225, 225), interpolation=cv2.INTER_LANCZOS4)
        
        results.append((resized_image, (left, right, top, bottom)))
    
    return results
    




