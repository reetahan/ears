DELIMITER //
CREATE FUNCTION get_Event_Table()
RETURNS TABLE

AS
RETURN (
    SELECT * 
    FROM Event
    )
END
DELIMITER ;