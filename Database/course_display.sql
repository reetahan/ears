DELIMITER //
DROP PROCEDURE IF EXISTS COURSE_DISPLAY;
CREATE PROCEDURE COURSE_DISPLAY(
   	username_ VARCHAR(100)
   	)
    BEGIN
        SELECT * 
    	FROM Course
    	WHERE CourseId IN 
    			(
    			SELECT CourseId
    			FROM Enrollment
    			WHERE UserId = 
    					(
    					SELECT UserId
    					FROM Account
    					WHERE Username = username_
    					)
    			);
    END //
DELIMITER ;