DELIMITER //
DROP PROCEDURE IF EXISTS DELETE_COURSE;
CREATE PROCEDURE DELETE_COURSE(
       courseId_ INT,
       courseName_ VARCHAR(200)
    )
    BEGIN
        SET @delId = (SELECT CourseId FROM Course WHERE CourseName=courseName_);
        DELETE FROM Course WHERE CourseName=courseName_ AND CourseId=courseId_;
        DELETE FROM Enrollment WHERE CourseId=@delId;
    END //
DELIMITER ;