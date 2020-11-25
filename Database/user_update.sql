DROP PROCEDURE IF EXISTS USER_UPDATE;
DELIMITER //
DROP PROCEDURE IF EXISTS USER_UPDATE;
CREATE PROCEDURE USER_UPDATE(
        userId_ INT,
        username_ VARCHAR(256),
	fullName_ VARCHAR(256),
	hashedPassword_ CHAR(128)
    )
    BEGIN
    	IF username_ IS NOT NULL 
    	THEN
    	UPDATE Account SET Username = username_ WHERE UserId = userId_;
    	END IF;
    	
    	IF fullName_ IS NOT NULL 
    	THEN
    	UPDATE User SET FullName = fullName_ WHERE UserId = userId_;
    	END IF;
    	
    	IF hashedPassword_ IS NOT NULL 
    	THEN
    	UPDATE Account SET HashedPassword = hashedPassword_ WHERE UserId = userId_;
    	END IF;
    END //
DELIMITER ;

