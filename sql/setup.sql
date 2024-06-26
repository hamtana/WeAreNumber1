DROP TABLE IF EXISTS group_task;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS group_user;
DROP TABLE IF EXISTS `group`;
DROP TABLE IF EXISTS user;
CREATE TABLE user ( id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,phone_number VARCHAR(255) NOT NULL,address VARCHAR(500),password VARCHAR(255) NOT NULL);
CREATE TABLE `group` (group_id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255) NOT NULL, join_code VARCHAR(255) UNIQUE NOT NULL);
CREATE TABLE task (id INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(255) NOT NULL,description VARCHAR(255) NOT NULL);
CREATE TABLE group_user (user_id INT,group_id INT,PRIMARY KEY (user_id, group_id),FOREIGN KEY (user_id) REFERENCES user(id),FOREIGN KEY (group_id) REFERENCES `group`(group_id));
CREATE TABLE group_task (status VARCHAR(255) NOT NULL,due_date DATE NOT NULL,task_id INT NOT NULL AUTO_INCREMENT,user_id INT NOT NULL,group_id INT NOT NULL,FOREIGN KEY (task_id) REFERENCES task(id),FOREIGN KEY (user_id) REFERENCES user(id),FOREIGN KEY (group_id) REFERENCES `group`(group_id));
-- Inserting users
INSERT INTO user (name, email, phone_number, address, password) VALUES ('John Doe', 'john@example.com', '123456789', '123 Main St, City', 'password123'),('Jane Smith', 'jane@example.com', '987654321', '456 Oak St, Town', 'qwerty456'),('Alice Johnson', 'alice@example.com', '5551234567', '789 Elm St, Village', 'pass123');
-- Inserting groups
INSERT INTO `group` (name,join_code) VALUES ('Group 1','123456'),('Group 2','234567'),('Team Alpha','345678');
-- Inserting tasks
INSERT INTO task (title, description) VALUES ('Task 1', 'Description for Task 1'),('Task 2', 'Description for Task 2'),('Task 3', 'Description for Task 3');
-- Inserting group_user relationships
INSERT INTO group_user (user_id, group_id) VALUES (1, 1), (2, 1), (3, 1), (1, 2), (2, 3); 
-- Inserting group_task assignments
INSERT INTO group_task (status, due_date, task_id, user_id, group_id) VALUES ('Pending', '2024-05-10', 1, 1, 1), ('In Progress', '2024-05-15', 2, 2, 1), ('Completed', '2024-05-20', 3, 3, 1), ('Pending', '2024-05-12', 1, 1, 2), ('Pending', '2024-05-18', 2, 2, 3);