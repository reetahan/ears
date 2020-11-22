DELIMITER //
DROP PROCEDURE IF EXISTS COURSELINK_UPDATE;
CREATE PROCEDURE COURSELINK_UPDATE(
        courseID_ INT, 
    	link_ VARCHAR(200), 
    	tag_ VARCHAR(100)
    )
    BEGIN
    	IF link_ IS NOT NULL 
    	THEN
    	UPDATE CourseLink SET Link = link_ WHERE Link = link_;
    	ENDIF;
    	
    	IF tag_ IS NOT NULL 
    	THEN
    	UPDATE CourseLink SET Tag = tag_ WHERE Link = link_;
    	ENDIF;
    END //
DELIMITER ;