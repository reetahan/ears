DELIMITER //
DROP PROCEDURE IF EXISTS COURSE_DELETE;
CREATE PROCEDURE COURSE_DELETE(
       courseId_ INT
    )
    BEGIN
	DECLARE val1 INT DEFAULT NULL ;
        DECLARE done INT DEFAULT FALSE ;
        DECLARE cursor1 CURSOR FOR SELECT EventId FROM Assign WHERE CourseId = courseId_; 
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

        	
	OPEN cursor1;
	the_loop: 
	LOOP
		 FETCH NEXT FROM cursor1 INTO val1;
		 IF done THEN 
    		 	LEAVE the_loop; 
  		 ELSE 
    			CALL EVENT_DELETE(val1);
  		 END IF;
	END LOOP;
	CLOSE cursor1;

	DELETE FROM Course WHERE CourseId=courseId_;
        DELETE FROM Enrollment WHERE CourseId=courseId_;
        DELETE FROM CourseLink WHERE CourseId = courseId_ ;

    END //
DELIMITER ;
