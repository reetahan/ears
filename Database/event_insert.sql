DROP PROCEDURE IF EXISTS EVENT_INSERT ;
DELIMITER //
CREATE PROCEDURE EVENT_INSERT(
	name_ VARCHAR(100),
	userId_  INT, 
	date_ VARCHAR(100), 
	description_ VARCHAR(300),
	courseId_ VARCHAR(200)
	) 
    BEGIN
    	SET @convertedDate = STR_TO_DATE(date_ , "%Y-%m-%d %H:%i") ;
        INSERT INTO Event(EventName,DueDate,Description) VALUES(name_ , @convertedDate, description_) ;
        SET @newId = (SELECT EventId FROM Event ORDER BY EventId DESC LIMIT 1) ; 
        INSERT INTO CreateEvent(EventId, UserId) VALUES(@newId, userId_) ;
	INSERT INTO Assign(EventId,CourseId) VALUES(@newId, courseId_) ;
    END //
DELIMITER ;
