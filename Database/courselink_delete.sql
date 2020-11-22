DELIMITER //
DROP PROCEDURE IF EXISTS DELETE_COURSELINK;
CREATE PROCEDURE DELETE_COURSELINK(
       courseID_ INT, 
    	link_ VARCHAR(200), 
    	tag_ VARCHAR(100)
    )
    BEGIN
        SET @delId = (SELECT Link FROM CourseLink WHERE Link=link_);
        DELETE FROM CourseLink WHERE Link=link_ AND Tag=tag_;
    END //
DELIMITER ;