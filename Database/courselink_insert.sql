DELIMITER //
DROP PROCEDURE IF EXISTS COURSELINK_INSERT;
CREATE PROCEDURE COURSELINK_INSERT(
	courseID_ INT, 
	link_ VARCHAR(200), 
	tag_ VARCHAR(100)
    BEGIN
    	INSERT INTO CourseLink(CourseId, Link, Tag) VALUES(courseID_,link_,tag_);
    END //
DELIMITER ;