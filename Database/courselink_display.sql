DELIMITER //
DROP PROCEDURE IF EXISTS COURSELINK_DISPLAY;
CREATE PROCEDURE COURSELINK_DISPLAY(
   	userId_ INT
	 )
    BEGIN
        SELECT * 
	FROM CourseLink
	WHERE CourseId IN 
			(
			SELECT CourseId
			FROM Enrollment
			WHERE UserId = userId_
			);
    END //
DELIMITER ;
