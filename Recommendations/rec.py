import pickle
import sys
import random
from write_db import write_rec
from itertools import combinations

def main():
	user_id, input_recs = parse_input()
	rec = primary_rec(input_recs, "model.p")
	if(rec == None):
		rec = secondary_rec(input_recs, "model.p")
		if(rec == None):
			rec = tertiary_rec(input_recs, "model.p")
	write_rec(user_id, list(input_recs), rec)

def primary_rec(input_recs, model):
	f = open(model, "rb")
	rules = pickle.load(f)
	f.close()

	rec = None
	for entry in rules:
		if(entry[0] == input_recs):
			rec = list(entry[1])
			break
	return rec

def secondary_rec(input_recs, model):
	if(str(type(input_recs)) == '<class \'str\'>'):
		return tertiary_rec(input_recs, model)

	f = open(model, "rb")
	rules = pickle.load(f)
	f.close()

	rec = None
	for i in range(len(input_recs) - 1,0,-1):
		combo_set_raw = list(combinations(input_recs,i))
		maximal_confidence = -1
		maximal_possiblity = None
		for possibility in combo_set_raw:
			cur_poss = possibility
			if(i != 1):
				cur_poss = list(possibility)
				cur_poss.sort()
				cur_poss = frozenset(possibility)
			else:
				cur_poss = possibility[0]
			for entry in rules:
				if(entry[0] == cur_poss):
					if(rules[entry] > maximal_confidence):
						maximal_confidence = rules[entry]
						maximal_possiblity = entry[1]
		if(maximal_possiblity != None):
			rec = list(maximal_possiblity)
			break

	return rec

def tertiary_rec(input, model):
	f = open(model, "rb")
	rules = pickle.load(f)
	f.close()

	rec = None
	choice = random.randint(0, len(rules)-1)
	count = 0
	for entry in rules:
		if(count == choice):
			rec = list(entry[1])
			break
		count = count + 1
	return rec

def parse_input():
	if(len(sys.argv) < 3):
		print("Error in input!")
		exit()
	user_id = sys.argv[1]
	rec_input = []
	for i in range(2, len(sys.argv)):
		rec_input.append(sys.argv[i])
	if(len(rec_input) == 1):
		rec_input = rec_input[0]
	else:
		rec_input.sort()
		rec_input = frozenset(rec_input)
	return user_id, rec_input

if __name__ == '__main__':
	main()
