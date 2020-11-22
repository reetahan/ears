DELIMITER //
CREATE PROCEDURE EVENT_INSERT(
	name_ VARCHAR(100),
	username_  VARCHAR(100), 
	date_ VARCHAR(100), 
	description_ VARCHAR(300),
	coursename_ VARCHAR(200)
	) 
    BEGIN
    	SET @convertedDate = STR_TO_DATE(date_ , "%m-%d-%Y %H:%i") ;
	SET @userId = (SELECT UserId FROM Account WHERE Username = username_) ;
	SET @courseId = (SELECT CourseId FROM Course WHERE CourseName = coursename_) ;
        INSERT INTO Event(EventName,DueDate,Description) VALUES(name_ , @convertedDate, description_) ;
        SET @newId = (SELECT EventId FROM Event WHERE EventName=name_ AND DueDate=@convertedDate AND Description=description_) ;
        INSERT INTO CreateEvent(EventId, UserId) VALUES(@newId, @userId) ;
	INSERT INTO Assign(EventId,CourseId) VALUES(@newId, @courseId) ;
    END //
DELIMITER ;
