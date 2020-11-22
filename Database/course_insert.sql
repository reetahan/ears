DELIMITER //
DROP PROCEDURE IF EXISTS COURSE_INSERT;
CREATE PROCEDURE COURSE_INSERT(
	courseName_ VARCHAR(200), 
	professor_ VARCHAR(100),
    meetingTime_ VARCHAR(20),
    username VARCHAR(256)
	) 
    BEGIN
    	SET @convertedDate = STR_TO_DATE(meetingTime_ , "%m-%d-%Y %H:%i") ;
        INSERT INTO Course(CourseName, Professor, MeetingTime) VALUES(courseName_,professor_,@convertedDate);
        SET @newId = (SELECT CourseId FROM Course WHERE CourseName=courseName_ AND Professor=professor_ AND MeetingTime =@convertedDate);
        INSERT INTO Enrollment(CourseId, UserId) VALUES(@newId, userId_); 
    END //
DELIMITER ;