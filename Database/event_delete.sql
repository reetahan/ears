DELIMITER //
CREATE PROCEDURE EVENT_DELETE(
       Name_ VARCHAR(100),
       Date_ VARCHAR(100)
    )
    BEGIN
        SET @convertedDate = STR_TO_DATE(Date_ , "%m-%d-%Y %H:%i") ;
        SET @delId = (SELECT EventId FROM Event WHERE EventName=Name_ AND DueDate=@convertedDate);
        DELETE FROM Event WHERE EventName = Name_ AND DueDate = @convertedDate;
        DELETE FROM CreateEvent WHERE EventId = @delId ;
	DELETE FROM Assign WHERE EventId = @delId ;
    END //
DELIMITER ;
