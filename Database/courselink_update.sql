DELIMITER //
DROP PROCEDURE IF EXISTS COURSELINK_UPDATE;
CREATE PROCEDURE COURSELINK_UPDATE(
        courseID_ INT, 
    	link_ VARCHAR(200), 
    	tag_ VARCHAR(100),
	newCourseID INT,
	newLink VARCHAR(200),
	newTag VARCHAR(100)
    )
    BEGIN
    	IF newLink IS NOT NULL 
    	THEN
    	UPDATE CourseLink SET Link = newLink WHERE Link = link_ AND CourseID = courseID_ AND Tag = tag_ ; 
    	END IF ;
    	
    	IF newTag IS NOT NULL 
    	THEN
    	UPDATE CourseLink SET Tag = newTag WHERE Link = link_ AND CourseID = courseID_ AND Tag = tag_ ;
    	END IF ;
    END //
DELIMITER ;
