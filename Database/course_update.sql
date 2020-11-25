DELIMITER //
DROP PROCEDURE IF EXISTS COURSE_UPDATE;
CREATE PROCEDURE COURSE_UPDATE(
        courseId_ INT,
        courseName_ VARCHAR(200),
        professor_ VARCHAR(100),
        meetingTime_ VARCHAR(100)
    )
    BEGIN
    	IF courseName_ IS NOT NULL 
    	THEN
    	UPDATE Course SET CourseName = courseName_ WHERE CourseId = courseId_;
    	END IF;
    	
    	IF professor_ IS NOT NULL 
    	THEN
    	UPDATE Course SET Professor = professor_ WHERE CourseId = courseId_;
    	END IF;
    	
    	IF meetingTime_ IS NOT NULL 
    	THEN
    	SET @convertedDate = STR_TO_DATE(meetingTime_ , "%m-%d-%Y %H:%i") ;
    	UPDATE Course SET MeetingTime = @convertedDate WHERE CourseId = courseId_;
    	END IF;
    END //
DELIMITER ;
