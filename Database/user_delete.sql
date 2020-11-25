DROP PROCEDURE IF EXISTS USER_DELETE ;
DELIMITER //
CREATE PROCEDURE USER_DELETE(
       userID_ INT
    )
    BEGIN
	DECLARE val1 INT DEFAULT NULL ;
        DECLARE done INT DEFAULT FALSE ;
        DECLARE cursor1 CURSOR FOR SELECT CourseId FROM Enrollment WHERE UserId = userID_;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cursor1;
        the_loop:
        LOOP
                 FETCH NEXT FROM cursor1 INTO val1;
                 IF done THEN
                        LEAVE the_loop;
                 ELSE
                        CALL COURSE_DELETE(val1);
                 END IF;
        END LOOP;
        CLOSE cursor1;

	DELETE FROM User WHERE UserID = userID_ ;
        DELETE FROM Account WHERE UserID = userID_ ;

    END //
DELIMITER ;

