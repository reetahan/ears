DELIMITER //
CREATE OR REPLACE PROCEDURE GET_ACCOUNT(user_name VARCHAR(256), potentialHashedPassword CHAR(128)) 
BEGIN 
SELECT * FROM (SELECT * FROM Account WHERE Username=user_name AND HashedPassword=potentialHashedPassword LIMIT 1) as acctRow NATURAL JOIN User;
END;
//
DELIMITER ;
