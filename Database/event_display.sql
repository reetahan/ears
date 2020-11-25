DROP PROCEDURE IF EXISTS EVENT_DISPLAY ;
DELIMITER //
CREATE PROCEDURE EVENT_DISPLAY(
   	userId_ INT
	 )
    BEGIN
        SELECT * 
	FROM Event
	WHERE EventId IN 
			(
			SELECT EventId
			FROM CreateEvent
			WHERE UserId = userId_
			); 
    END //
DELIMITER ;

