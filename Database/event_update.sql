DROP PROCEDURE IF EXISTS EVENT_UPDATE ;
DELIMITER //
CREATE PROCEDURE EVENT_UPDATE(
    name_ VARCHAR(100),
    date_ VARCHAR(100),
    description_ VARCHAR(500),
    id_  INT
    )
    BEGIN
	IF name_ IS NOT NULL 
	THEN
	UPDATE Event SET EventName = name_ WHERE EventID = id_ ;
	END IF;

	IF date_ IS NOT NULL 
	THEN
    	SET @convertedDate = STR_TO_DATE(date_ , "%m-%d-%Y %H:%i") ;
    	UPDATE Event SET DueDate = @convertedDate WHERE EventId = id_ ;
	END IF ;

	IF description_ IS NOT NULL 
        THEN
        UPDATE Event SET Description = description_ WHERE EventId = id_ ;
        END IF ;
    END //
DELIMITER ;
