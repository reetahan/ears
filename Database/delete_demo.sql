DELIMITER //
CREATE PROCEDURE DELETE_DEMO(
    IN Name_ VARCHAR(100),
    IN Date_ DATETIME,
    )
    BEGIN
        SET @delId = (SELECT EventId FROM Event WHERE EventName=Name_ AND DueDate=Date_);
        DELETE FROM Event WHERE EventName=Name_ AND DueDate=Date_;
        DELETE FROM CreateEvent WHERE EventId=@delId;
    END;
DELIMITER ;