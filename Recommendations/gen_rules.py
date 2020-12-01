from __future__ import print_function
import sys
import copy
from itertools import combinations
import pickle

def main():
	transactions, max_poss_pat_size, support = parse_transactions("input.txt")
	freq_itemsets, size = gen_freq_itemsets(transactions, max_poss_pat_size, support)
	#order_print(freq_itemsets, size)
	rules = confidence(freq_itemsets)
	save_model(rules, "model.p")
	
def parse_transactions(input_file):
	line_list = []
	with open(input_file, "r") as f:
		for line in f:
			line_list.append(line)

	if(len(line_list) < 2):
	    exit()

	line_parsed = []
	max_poss_pat_size = 0
	support = 1

	for i in range(0,len(line_list)):
	    cur_line = line_list[i]
	    to_add = cur_line.split()
	    if(len(to_add) > max_poss_pat_size):
	        max_poss_pat_size = len(to_add)
	    line_parsed.append(to_add)                

	return line_parsed, max_poss_pat_size, support

def gen_freq_itemsets(line_parsed, max_poss_pat_size, support):
	total_dicts = []
	total_size = 0
	for j in range(1, max_poss_pat_size + 1):
	    cur_size = j
	    cur_dict = dict()
	    
	    if(cur_size == 1):
	        for k in range(len(line_parsed)):
	            cur_line = line_parsed[k]
	            for m in range(len(cur_line)):
	                letter = cur_line[m]
	                if(cur_line[m] not in cur_dict):
	                    cur_dict[letter] = 1
	                else:
	                    cur_dict[letter] = cur_dict[letter] + 1
        
	        real_dict = dict()
	        for item in cur_dict:
	            if(cur_dict[item] >= support):
	                real_dict[item] = cur_dict[item]

	       
	        total_size = total_size + len(real_dict)
	        total_dicts.append(real_dict)

	    
	    else:
	        for k in range(len(line_parsed)):
	            cur_line = line_parsed[k]
	            combo_set_raw = list(combinations(cur_line,cur_size))
	            if(len(combo_set_raw) == 0):
	                continue
	            combo_set = list()
	            for combo in combo_set_raw:
	                new_c = frozenset(combo)
	                combo_set.append(new_c)
	            
	            for seto in combo_set:
	                if seto not in cur_dict:
	                    cur_dict[seto] = 1
	                else:
	                    cur_dict[seto] = cur_dict[seto] + 1
	        
	        real_dict = dict()
	        for item in cur_dict:
	            if(cur_dict[item] >= support):
	                real_dict[item] = cur_dict[item]
	        
	        if(len(real_dict) == 0):
	            break

	        total_size = total_size + len(real_dict)
	        total_dicts.append(real_dict)
	return total_dicts, total_size
	        
def confidence(freq_itemsets):
	confidence = dict()
	rules = dict()
	#cutoff = 0.5

	for size in range(len(freq_itemsets)):
		for itemset in freq_itemsets[size]:
			if(str(type(itemset)) == '<type \'str\'>'):
				continue
			cur_total_combos = []
			for i in range(1,len(itemset)):
				combo_set_raw = list(combinations(itemset,i))
				cur_total_combos += combo_set_raw
			#print("calculated raw combos for current itemset")
			for i in range(len(cur_total_combos)):
				a = cur_total_combos[i]
				b = itemset.difference(a)
				itemset_size = len(itemset) - 1
				subset_size = len(a) - 1
				if(len(a) == 1):
					a = a[0]
					subset_size = 0
				else:
					a = list(a)
					a.sort()
					a = frozenset(a)
				calculated_conf = freq_itemsets[itemset_size][itemset]/freq_itemsets[subset_size][a]

				maximal = True
				to_delete = None
				for entry in confidence:
					if(entry[0] == a):
						if(calculated_conf < confidence[entry]):
							maximal = False
						else:
							to_delete = entry
						break

				if(maximal):
					if(to_delete != None):
						del confidence[to_delete]
					confidence[(a,b)] = calculated_conf
			#print("calculated confidence for all raw combos in current itemset")

	return confidence

def order_print(total_dicts, total_size):
	top_dict = dict()
	m = 0
	
	while(total_size > 0):
	    copy_dict = copy.deepcopy(total_dicts)
	    for level in total_dicts:
	        for key in level:
	            if level[key] == m:
	                listified = ""
	                if(str(type(key)) == '<type \'str\'>'):
	                	listified = tuple([key])
	                else:	
		                listified = list(key)
		                listified.sort()
		                listified = tuple(listified)
	                top_dict[listified] = level[key]

	            if level[key] > m:
	                top_dict.clear()
	                listified = ""
	                if(str(type(key)) == '<type \'str\'>'):
	                	listified = tuple([key])	
	                else:	
		                listified = list(key)
		                listified.sort()
		                listified = tuple(listified)
	                top_dict[listified] = level[key]
	                m = level[key]
	    

	    top_key_list = list(top_dict.keys())

	    total_size = total_size - len(top_key_list)
	    for i in range(len(top_key_list)):
	        top_key_list[i] = list(top_key_list[i])
	    top_key_list.sort()
	    for i in range(len(top_key_list)):
	        top_key_list[i] = tuple(top_key_list[i])
   	
	    for key in top_key_list: 
	        print(str(top_dict[key]) + ': ', end = '')
	        for vale in key:
	            print(vale + ' ', end = '')
	        print('')
	          
	    for i in range(len(top_key_list)):
	        top_key_list[i] = list(top_key_list[i])
	        
	    
	    total_dicts.clear()
	    for level in copy_dict:
	        to_add = dict()
	        for key in level:
	            testo = [key]
	            if(str(type(key)) != '<class \'str\'>'):
	                testo = list(key)
	                testo.sort()
	            if testo not in top_key_list:
	                to_add[key] = level[key]       
	        if(len(to_add) > 0):
	            total_dicts.append(to_add)
	            
	    m = 0

def save_model(conf_itemsets, outfile):
	f = open(outfile, "wb")
	pickle.dump(conf_itemsets, f)
	f.close()

if __name__ == '__main__':
	main()
    





        
            
    
    
    

    
    
    

