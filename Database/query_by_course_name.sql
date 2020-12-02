DELIMITER //
DROP PROCEDURE IF EXISTS QUERY_COURSE_BY_NAME;
CREATE PROCEDURE QUERY_COURSE_BY_NAME(
        userID_ INT,
        courseName_ VARCHAR(200)
)
    BEGIN
    	SELECT *
	FROM
            (SELECT * FROM Enrollment WHERE UserId = userID_) as e
            NATURAL JOIN
            (SELECT * FROM Course WHERE CourseName=courseName_) as c ;
    END //
DELIMITER ;
