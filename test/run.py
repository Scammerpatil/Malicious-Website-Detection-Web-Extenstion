import numpy as np
import features_extract
import sys

# Load the pre-trained model
loaded_model = features_extract.loaded_model


def predict_url_safety(url):
    query = features_extract.FeatureExtraction(url=url)
    input_arr = np.array(query.getFeaturesList()).reshape(1, 30)
    prediction = loaded_model.predict(input_arr)[0]
    if prediction == 1:
        return 1  # Benign
    else:
        return 0  # Malicious


if __name__ == "__main__":
    # Example usage
    test_url = sys.argv[1]
    # test_url = "http://phishtank.org"
    # test_url = "https://www.google.com"
    is_malware = predict_url_safety(test_url)
    result = is_malware
    print(result)
