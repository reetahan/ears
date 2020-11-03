CREATE FUNCTION get_Event
(
  @Date DATETIME
)
RETURNS TABLE

AS
RETURN (
    SELECT * 
    FROM Event
    WHERE DueDate = @Date
    )
END