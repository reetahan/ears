DELIMITER //
CREATE PROCEDURE GET_EVENT_BY_DATE(
	 date_ VARCHAR(100)
	)
    BEGIN
    	SET @convertedDate = STR_TO_DATE(date_ , "%m-%d-%Y") ;
        SELECT * FROM Event WHERE DATE(DueDate) = @convertedDate;
    END //
DELIMITER ;