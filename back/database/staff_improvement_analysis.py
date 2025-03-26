from database import CLIENT

def init():
    db = CLIENT["lite_web"]
    collection = db["staff_improvement_analysis"]
    
