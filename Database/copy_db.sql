/*
Login to MySQL then simply run "source copy_db.sql ;"
*/ 

CREATE DATABASE earsapp411_EARS_SQL;

USE earsapp411_EARS_SQL;

CREATE TABLE User (
  UserId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  FullName VARCHAR(100) NOT NULL
  );
  
CREATE TABLE Event (
EventId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
EventName VARCHAR(100) NOT NULL,           
DueDate   DATETIME,          
Description VARCHAR(300)
);

CREATE TABLE CreateEvent (
EventId INT UNSIGNED,
UserId INT UNSIGNED,
FOREIGN KEY (EventId) REFERENCES Event(EventId),
FOREIGN KEY (UserId) REFERENCES User(UserId)
);

CREATE TABLE Account (
LatestLoginTime  DATETIME,
Username VARCHAR(256) NOT NULL,
HashedPassword CHAR(128),
CreatedTime DATETIME DEFAULT CURRENT_TIMESTAMP ,
UserId INT UNSIGNED,
FOREIGN KEY (UserId) REFERENCES User(UserId)
);

CREATE TABLE Course (
CourseId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
CourseName VARCHAR(200) NOT NULL,
Professor VARCHAR(100),
MeetingTime DATETIME 
);

CREATE TABLE CourseLink (
CourseId INT UNSIGNED,
Link VARCHAR(256),
Tag VARCHAR(100),
FOREIGN KEY (CourseId) REFERENCES Course(CourseId) 
);

CREATE TABLE Enrollment (
CourseId INT UNSIGNED,
UserId INT UNSIGNED,
FOREIGN KEY (CourseId) REFERENCES Course(CourseId),
FOREIGN KEY (UserId) REFERENCES User(UserId)
);

CREATE TABLE Assign (
AssignId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
EventId INT UNSIGNED,
CourseId INT UNSIGNED,
FOREIGN KEY (EventId) REFERENCES Event(EventId),
FOREIGN KEY (CourseId) REFERENCES Course(CourseId)
);

INSERT INTO User(FullName) VALUES("Amahlia Su");
INSERT INTO User(FullName) VALUES("Reetahan Mukhopadhyay");
INSERT INTO User(FullName) VALUES("Eunsun Lee");
INSERT INTO User(FullName) VALUES("Sayan Bhattacharjee");

INSERT INTO Account(Username,HashedPassword,UserId) VALUES("esu3","fjdkjlEJFKjl",1);
INSERT INTO Account(Username,HashedPassword,UserId) VALUES("rm10","password2",2);
INSERT INTO Account(Username,HashedPassword,UserId) VALUES("eunsunl2","password3",3);
INSERT INTO Account(Username,HashedPassword,UserId) VALUES("sayanb2","password4",4);

INSERT INTO Course(CourseName,Professor,MeetingTime) VALUES("CS411","Abdu Alawini",STR_TO_DATE("2020-10-28 11:00:00",'%Y-%m-%d %H:%i:%s'));
INSERT INTO Course(CourseName,Professor,MeetingTime) VALUES("ATMS447","Atul Jain",STR_TO_DATE("2020-10-29 09:30:00",'%Y-%m-%d %H:%i:%s'));
INSERT INTO Course(CourseName,Professor,MeetingTime) VALUES("CS446","Alexander Schwing",STR_TO_DATE("2020-05-05 12:30:00",'%Y-%m-%d %H:%i:%s'));
INSERT INTO Course(CourseName,Professor,MeetingTime) VALUES("MATH453","Bruce Reznick",STR_TO_DATE("2019-12-11 11:00:00",'%Y-%m-%d %H:%i:%s'));

INSERT INTO Event(EventName, DueDate, Description) VALUES ("Homework 11", STR_TO_DATE("2019-12-09 11:00:00",'%Y-%m-%d %H:%i:%s'), "Final homework for course");
INSERT INTO Event(EventName, DueDate, Description) VALUES ("Research Survey", STR_TO_DATE("2020-05-07 23:59:00",'%Y-%m-%d %H:%i:%s'), "Pick paper on topic of your choice relavent to class to write a summary on");
INSERT INTO Event(EventName, DueDate, Description) VALUES ("Semester Project", STR_TO_DATE("2020-12-03 09:00:00",'%Y-%m-%d %H:%i:%s'), "Full stack web app using multiple databases");
INSERT INTO Event(EventName, DueDate, Description) VALUES ("Take Home Final Exam", STR_TO_DATE("2020-12-12 20:00:00",'%Y-%m-%d %H:%i:%s'), "Final exam, have 24 hours to complete, open note, not open Internet");

INSERT INTO CreateEvent(EventId, UserId) VALUES(1,1);
INSERT INTO CreateEvent(EventId, UserId) VALUES(2,2);
INSERT INTO CreateEvent(EventId, UserId) VALUES(3,3);
INSERT INTO CreateEvent(EventId, UserId) VALUES(4,4);

INSERT INTO Enrollment(CourseId,UserId) VALUES(4,1);
INSERT INTO Enrollment(CourseId,UserId) VALUES(3,2);
INSERT INTO Enrollment(CourseId,UserId) VALUES(1,3);
INSERT INTO Enrollment(CourseId,UserId) VALUES(2,4);

INSERT INTO Assign(EventId,CourseId) VALUES(1,4);
INSERT INTO Assign(EventId,CourseId) VALUES(2,3);
INSERT INTO Assign(EventId,CourseId) VALUES(3,1);
INSERT INTO Assign(EventId,CourseId) VALUES(4,2);

INSERT INTO CourseLink(CourseId,Link,Tag) VALUES(1,"https://wiki.illinois.edu/wiki/spaces/viewspace.action?key=CS411AAFA20","Course Page");
INSERT INTO CourseLink(CourseId,Link,Tag) VALUES(2,"https://learn.illinois.edu/pluginfile.php/6889014/mod_resource/content/1/ScheduleFinal.pdf","Syllabus");
INSERT INTO CourseLink(CourseId,Link,Tag) VALUES(3,"https://piazza.com/class/k5ho71gxen55bu","Piazza");
INSERT INTO CourseLink(CourseId,Link,Tag) VALUES(4,"https://faculty.math.illinois.edu/~reznick/453-12-4-19.pdf","Exam Prep");

