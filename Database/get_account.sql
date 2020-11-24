DELIMITER //
CREATE OR REPLACE PROCEDURE GET_ACCOUNT(user_name VARCHAR(256)) 
BEGIN 
UPDATE Account SET LatestLoginTime=CURRENT_TIME WHERE Username=user_name;
SELECT * FROM (SELECT * 
               FROM Account 
               WHERE Username=user_name 
               LIMIT 1)
               as acctRow NATURAL JOIN User;
END;
//
DELIMITER ;
