DELIMITER //
DROP PROCEDURE IF EXISTS COURSELINK_DISPLAY;
CREATE PROCEDURE COURSELINK_DISPLAY(
   	username_ VARCHAR(100)
	 )
    BEGIN
        SELECT * 
	FROM CourseLink
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