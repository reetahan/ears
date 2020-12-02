DELIMITER //
DROP PROCEDURE IF EXISTS QUERY_EVENT_BY_DATE;
CREATE PROCEDURE QUERY_EVENT_BY_DATE(
        userID_ INT,
        date_ VARCHAR(200)
)
    BEGIN
	SET @convertedDate = STR_TO_DATE(date_ , "%Y-%m-%d %H:%i") ;
    	SELECT *
	FROM
            (SELECT * FROM CreateEvent WHERE UserId = userID_) as c
            NATURAL JOIN
            (SELECT * FROM Event WHERE DueDate= @convertedDate) as ev ;
    END //
DELIMITER ;
