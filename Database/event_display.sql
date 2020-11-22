DELIMITER //
CREATE PROCEDURE EVENT_DISPLAY(
   	username_ VARCHAR(100)
	 )
    BEGIN
        SELECT * 
	FROM Event
	WHERE EventId IN 
			(
			SELECT EventId
			FROM CreateEvent
			WHERE UserId = 
					(
					SELECT UserId
					FROM Account
					WHERE Username = username_
					)
			);
    END //
DELIMITER ;

