DELIMITER //
CREATE PROCEDURE CREATE_DEMO(
	name_ VARCHAR(100),
	userId_  INT, 
	date_ VARCHAR(100), 
	description_ VARCHAR(300)
	) 
    BEGIN
    	SET @convertedDate = STR_TO_DATE(date_ , "%m-%d-%Y %H:%i") ;
        INSERT INTO Event(EventName,DueDate,Description) VALUES(name_,@convertedDate,description_);
        SET @newId = (SELECT EventId FROM Event WHERE EventName=name_ AND DueDate=@convertedDate AND Description=description_);
        INSERT INTO CreateEvent(EventId, UserId) VALUES(@newId, userId_); 
    END //
DELIMITER ;