import sys
import copy
from itertools import combinations

line_list = []
for line in sys.stdin:
    line_list.append(line)

if(len(line_list) < 2):
    exit()

line_parsed = []
max_poss_pat_size = 0
support = int(line_list[0])
for i in range(1,len(line_list)):
    cur_line = line_list[i]
    to_add = cur_line.split()
    if(len(to_add) > max_poss_pat_size):
        max_poss_pat_size = len(to_add)
    line_parsed.append(to_add)
    
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
        

top_dict = dict()
copy_dict = copy.deepcopy(total_dicts)
done_dict = dict()
support_stratified = list()
m = 0

while(total_size > 0):
    for level in total_dicts:
        for key in level:
            if level[key] == m:
                listified = list(key)
                listified.sort()
                listified = tuple(listified)
                top_dict[listified] = level[key]
            if level[key] > m:
                top_dict.clear()
                listified = list(key)
                listified.sort()
                listified = tuple(listified)
                top_dict[listified] = level[key]
                m = level[key]
    
    to_add_to_strat = copy.deepcopy(top_dict)
    support_stratified.append(to_add_to_strat)
    
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
        
        done_dict[key] = top_dict[key]
        
    for i in range(len(top_key_list)):
        top_key_list[i] = list(top_key_list[i])
        
    total_dicts.clear()
    for level in copy_dict:
        to_add = dict()
        for key in level:
            testo = list(key)
            if testo not in top_key_list:
                to_add[key] = level[key]
        if(len(to_add) > 0):
            total_dicts.append(to_add)
            
    m = 0

print('')

save_closed_pats = dict()
for level in support_stratified:
    to_print = list()
    teh_keys = list(level.keys())
    for i in range(len(teh_keys)):
        teh_keys[i] = set(teh_keys[i])
    
    for j in range(len(teh_keys)):
        cur_key = teh_keys[j]
        subzi_check = False
        for k in range(len(teh_keys)):
            if(j != k):
                if(cur_key.issubset(teh_keys[k])):
                    subzi_check = True
                    break
        if(not subzi_check):
            to_print.append(cur_key)
    for t in range(len(to_print)):
        to_print[t] = list(to_print[t])
        (to_print[t]).sort()
    to_print.sort()
    for m in range(len(to_print)):
        to_print[m] = tuple(to_print[m])
    for key in to_print:
        save_closed_pats[key] = level[key]
        print(str(level[key]) + ': ', end = '')
        for vale in key:
            print(str(vale) + ' ', end = '')
        print('')
                    
print('')

keibo = list(save_closed_pats.keys())
for r in range(len(keibo)):
    keibo[r] = set(keibo[r])
    
final = list()
for q in range(len(keibo)):
    cur_set = keibo[q]
    subsidized = False
    for m in range(len(keibo)):
        if(m != q):
            if(cur_set.issubset(keibo[m])):
                subsidized = True
                break
    if(not subsidized):
        final.append(cur_set)
for y in range(len(final)):
    final[y] = list(final[y])
    (final[y]).sort()
final.sort()
for t in range(len(final)):
    final[t] = tuple(final[t])
for key in final:
        print(str(save_closed_pats[key]) + ': ', end = '')
        for vale in key:
            print(str(vale) + ' ', end = '')
        print('')
                
        
    





        
            
    
    
    

    
    
    
