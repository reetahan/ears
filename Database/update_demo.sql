DELIMITER //
CREATE PROCEDURE UPDATE_DEMO(
    IN Name_ VARCHAR(100),
    IN Date_ DATETIME,
    )
    BEGIN
    	UPDATE Event SET DueDate = Date_ WHERE EventName = Name_ ;
    END;
DELIMITER ;