DELIMITER //
CREATE PROCEDURE CREATE_DEMO(
	name_ VARCHAR(100),
	userId_  INT, 
	date_ DATETIME, 
	description_ VARCHAR(300)
	) 
    BEGIN
        INSERT INTO Event(EventName,DueDate,Description) VALUES(name_,date_,description_);
        SET @newId = (SELECT EventId FROM Event WHERE EventName=name_ AND DueDate=date_ AND Description=description_);
        INSERT INTO CreateEvent(EventId, UserId) VALUES(@newId, userId_); 
    END //
DELIMITER ;