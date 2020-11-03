DELIMITER //
CREATE PROCEDURE UPDATE_DEMO(
    name_ VARCHAR(100),
    date_ VARCHAR(100)
    )
    BEGIN
    	SET @convertedDate = STR_TO_DATE(date_ , "%m-%d-%Y %H:%i") ;
    	UPDATE Event SET DueDate = @convertedDate WHERE EventName = Name_ ;
    END //
DELIMITER ;