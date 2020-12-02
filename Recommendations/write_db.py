
from pymongo import MongoClient
from secret import give_secret

def write_rec(user_id, input_recs, rec):
	uri = give_secret()
	client = MongoClient(uri)
	db = client['EARS_MONGO']
	recs = db.Recommendations
	
	recommendation = {
		'user_id': user_id,
		'input': input_recs,
		'recommendations': rec
	}

	recs.insert_one(recommendation)
