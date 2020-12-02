DROP PROCEDURE IF EXISTS EVENT_DISPLAY ;
DELIMITER //
CREATE PROCEDURE EVENT_DISPLAY(
   	userId_ INT
	 )
    BEGIN
        SELECT * 
	FROM Event e NATURAL JOIN Assign a
	WHERE e.EventId IN 
			(
			SELECT EventId
			FROM CreateEvent
			WHERE UserId = userId_
			); 
    END //
DELIMITER ;

