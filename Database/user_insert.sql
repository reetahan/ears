DROP PROCEDURE IF EXISTS USER_INSERT;
DELIMITER //
CREATE PROCEDURE USER_INSERT(
        fullname_ VARCHAR(256),
        username_  VARCHAR(256),
        password_ CHAR(128)
        )
    BEGIN
	INSERT INTO User(FullName) VALUES(fullname_) ;
	SET @newId = (SELECT UserId FROM User ORDER BY UserId DESC LIMIT 1) ;
	INSERT INTO Account(Username, HashedPassword, UserId) VALUES(username_,password_, @newId) ;
    END //
DELIMITER ;
