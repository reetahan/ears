DROP PROCEDURE IF EXISTS EVENT_DELETE ;
DELIMITER //
CREATE PROCEDURE EVENT_DELETE(
       eventId_ INT
    )
    BEGIN
        DELETE FROM Event WHERE EventId = eventId_ ;
        DELETE FROM CreateEvent WHERE EventId = eventId_ ;
	DELETE FROM Assign WHERE EventId = eventId_ ;
    END //
DELIMITER ;
