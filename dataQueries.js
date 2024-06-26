const mysql = require('mysql2');

try {
    var connection = require("./database.js");
} catch (error) { console.log(error); }
const fs = require('fs');
const path = require('path');
var readline = require('readline');
const con = require('./database.js');

// ==============================================
/** All the insert functions to insert a field to the table 
 * 
 */
// ==============================================


// CREATE TABLE user (id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL);
function insertUser(name, phone_number, email, address, password) {

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user (name, phone_number, email, address, password) VALUES (?, ?, ?, ?, ?)", [name, phone_number, email, address, password], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("1 record inserted");
                resolve(result);
            }
        });
    });
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user WHERE id = ?", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    });
}



function updateTaskStatus(status, task_id, user_id) {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE group_task SET status = ? WHERE task_id = ? AND user_id = ?", [status, task_id, user_id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    });

};



//Query to get User by Email - SELECT * FROM user WHERE email = ?
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user WHERE email = ?", [email], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                console.log(result);
                if (result.length > 0) {
                    resolve(result);
                } else {
                    // No user found with the provided email and password
                    //   Success
                    resolve(null);
                }
            }
        });
    });
}

// Function that performs a GET request to the database to get a group by its id
function getGroupById(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `group` WHERE group_id = ?", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    });
}
// Functions to check if email and password in the database
function checkEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                console.log(result);
                if (result.length > 0) {
                    resolve(result);
                } else {
                    // No user found with the provided email and password
                    resolve(null);
                }
            }
        });
    });
}






//Function that retrieves the group tasks by group id
//Retrieves all tasks that are associated with a group
//Retrieve details name of the user from the user table
function getGroupTasksByGroupId(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_task JOIN task ON group_task.task_id = task.id JOIN user ON group_task.user_id = user.id WHERE group_id = ?", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//Retrieve Group Tasks Due Today 
// Uses Group ID to retrieve relevant tasks.
function getGroupTasksToday(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_task JOIN task ON group_task.task_id = task.id JOIN user ON group_task.user_id = user.id WHERE group_id = ? AND due_date = CURDATE()", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//Get Group Tasks Due Tomorrow
//Uses Group ID to retrieve relevant tasks.
function getGroupTasksTomorrow(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_task JOIN task ON group_task.task_id = task.id JOIN user ON group_task.user_id = user.id WHERE group_id = ? AND DATE_ADD(CURDATE(), INTERVAL 1 DAY) ", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//Get Tasks due over the next 7 days 
//Uses Group ID to retrieve relevant tasks.
function getGroupTasksDueWeek(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_task JOIN task ON group_task.task_id = task.id JOIN user ON group_task.user_id = user.id WHERE group_id = ? AND due_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//Function to mark tasks as complete.
//Uses task ID to retrieve and update the status of the task.
function markTaskComplete(taskId) {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE group_task SET status = 'Complete' WHERE task_id = ?", [taskId], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}



// QUERY TO GET GROUPS
function getGroups() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `group`", function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    });
}



function joinGroupUsingKey(id, group_id) {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO group_user (user_id, group_id) VALUES (?, ?)", [id, group_id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log("1 record inserted");
                resolve(result);
            }
        }
        );
    });
}

function getGroupByJoinCode(join_code) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `group` WHERE join_code = ?", [join_code], function (err, result) {

            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    });
}



// QUERY TO GET GROUPS User is in
function getGroupsByUser(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_user as gs join `group`\
         as g using(group_id) where gs.user_id = ? ", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    });
}

function getGroupTasksByUserId(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_task JOIN task ON group_task.task_id = task.id JOIN user ON group_task.user_id = user.id WHERE user_id = ?", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }

        });
    });





}


function getUsersinGroup(group_id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_user JOIN user ON group_user.user_id = user.id WHERE group_id = ?", [group_id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    }
    );
}


function insertGroup(name, join_code) {

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO `group` (name,join_code) VALUES (?,?)", [name, join_code], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("1 record inserted");
                resolve(result);
            }
        });
    });

}

function joinGroupByCode(user_id, join_code) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT group_id FROM `group` WHERE join_code = ?", [join_code], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                try {
                    if (result.length > 0) {
                        joinGroupUsingKey(user_id, result[0].group_id).then((result) => {
                            resolve(result);
                        }).catch((err) => {
                            reject(err);
                        });
                        console.log("Query successful");

                    }
                } catch {
                    console.log("No group found with the provided join code");
                    reject(err);
                }
            }

        });
    });
}
function insertGroupTask(group_id, task_name, description, due_date, user_id, status){
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO task (title, description) VALUES (?, ?)", [task_name, description], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("1 record inserted");
                connection.query("SELECT id FROM task WHERE title = ? AND description = ?", [task_name, description], function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log("1 record inserted");
                        connection.query("INSERT INTO group_task (status, task_id, user_id, group_id, due_date) VALUES (?, ?, ?, ?, ?)", [status, result[0].id, user_id, group_id, due_date], function (err, result) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                console.log("1 record inserted");
                                resolve(result);
                            }
                        });
                    }
                });
            }
        });
    });

    
}


//CREATE TABLE task (id INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(255) NOT NULL,description VARCHAR(255) NOT NULL);
function insertTask(title, description) {
    connection.connect(function (err) {
        var sql = "INSERT INTO task (title, description) VALUES ('" + title + "', '" + description + "');";
        connection.query(sql, function (err, result) {
            console.log("1 record inserted");
            if (err) {
                console.log(err);
                return 0;
            }
            return 1;
        });
    });
}

function updateTaskStatus(status, task_id, user_id) {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE group_task SET status = ? WHERE task_id = ? AND user_id = ?", [status, task_id, user_id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Query successful");
                resolve(result);
            }
        });
    });


}








//CREATE TABLE group_user (user_id INT,group_id INT,PRIMARY KEY (user_id, group_id),FOREIGN KEY (user_id) REFERENCES user(id),FOREIGN KEY (group_id) REFERENCES `group`(group_id));
// function insertGroupUser(id, group_id) {
//     connection.connect(function (err) {
//         var sql = "INSERT INTO group_user (user_id, group_id) VALUES ('" + id + "', '" + group_id + "');";
//         connection.query(sql, function (err, result) {
//             console.log("1 record inserted");
//             if (err) {
//                 console.log(err);
//                 return 0;
//             }
//             return 1;
//         });
//     });
// }
function insertGroupUser(id, group_id) {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO group_user (user_id, group_id) VALUES (?, ?)", [id, group_id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("1 record inserted");
                resolve(result);
            }
        });
    });
}

function checkIfUserIsMember(userId, groupCode) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_user JOIN `group` ON group_user.group_id = `group`.group_id WHERE user_id = ? AND join_code = ?", [userId, groupCode], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result);
                } else {
                    // No user found with the provided email and password
                    resolve(null);
                }
            }
        });
    });
}

//CREATE TABLE group_task (status VARCHAR(255) NOT NULL,task_id INT,user_id INT,FOREIGN KEY (task_id) REFERENCES task(id),FOREIGN KEY (user_id) REFERENCES user(id));


// ==============================================



// ==============================================
/** The functions for returing table data and specific data in .json format.
 * 
 */
// ==============================================


function returnTable(table) {
    // const db = connection.promise();
    // try {
    //     const [rows, fields] = await db.query("SELECT * FROM " + table);
    //     console.log(rows);
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    //     return [];
    // }

    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM " + table, function (err, result, fields) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


/* Carinn's one, not working, unsure why as it looks right
function returnTable(table) {
    connection.connect(function(err) {
        connection.query("SELECT * FROM " + table, function (err, result, fields) {
        if (err) {
            console.log(err);
            return JSON.stringify({});;
        }
        return result;
        });
        
    });
}
// */
// ==============================================
function getUncompleteTasksByUserId(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM group_task JOIN task ON group_task.task_id = task.id JOIN user ON group_task.user_id = user.id WHERE user_id = ? AND status != 'Complete'", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        }
        );
    });


}

/*Complete task history */ 
function getCompleteTasksByGroupId(id) {
    return new Promise ((resolve,reject) =>{
        connection.query("SELECT * FROM group_task JOIN task ON group_task.task_id = task.id JOIN user ON group_task.user_id = user.id WHERE group_id = ? AND status = 'Complete'", [id], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        }
        );
    });

}


module.exports = {
    getUser,
    getUsersinGroup,
    getGroupByJoinCode,
    insertUser,
    insertGroup,
    insertTask,
    insertGroupUser,insertGroupTask,
    returnTable,
    getGroups,
    getUserByEmail,
    getGroupById,
    getGroupTasksByGroupId,
    getGroupTasksToday,
    getGroupTasksTomorrow,
    getGroupTasksDueWeek,
    getGroupsByUser,
    checkEmailAndPassword,
    updateTaskStatus,
    getGroupTasksByUserId,
    joinGroupUsingKey,
    markTaskComplete,
    joinGroupByCode,
    checkIfUserIsMember,
    getCompleteTasksByGroupId,
    getUncompleteTasksByUserId,
};
