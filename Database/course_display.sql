DELIMITER //
DROP PROCEDURE IF EXISTS COURSE_DISPLAY;
CREATE PROCEDURE COURSE_DISPLAY(
   	userId_ INT
   	)
    BEGIN
        SELECT * 
    	FROM Course
    	WHERE CourseId IN 
    			(
    			SELECT CourseId
    			FROM Enrollment
    			WHERE UserId = userId_ 
    			);
    END //
DELIMITER ;
