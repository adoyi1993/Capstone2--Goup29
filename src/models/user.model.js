const db = require ('../config/db.config');

class User{
    constructor(user_id, email, first_name, last_name, password, phone, address, is_admin){
        this.user_id = user_id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.is_admin = is_admin;
    }
    static create (newUser, result){
        db.query("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [newUser.user_id, newUser.email, newUser.first_name, newUser.last_name, newUser.password, newUser.phone, newUser.address, newUser.is_admin], (err, res)=>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Created User: ", {...newUser});
            result(null, {user_id: res.insertId, ...newUser});
        });
    }


    static findByID (user_id, result){
        db.query("SELECT FROM Users WHERE user_id=?", [user_id], (err, res)=>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length){
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found
            result({kind: "not found"}, null);
        });
    }


    


        static getAll(result) {
            db.query('SELECT * FROM Users', (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
        
              console.log("Users: ", res);
              result(null, res);
            });
          }
        
          
          static updateById(user_id, user, result) {
            db.query(
              "UPDATE Users SET user_id = ?, email = ?, first_name = ?, lastt_name = ?, password = ?, phone = ?, address = ?, is_admin = ? WHERE user_id = ?",
              [user.user_id, user.email, user.first_name, user.last_name, user.password, user.phone, user.address, user.is_admin],
              (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
                }
        
                if (res.affectedRows == 0) {
                  // not found
                  result({ kind: "not_found" }, null);
                  return;
                }
        
                console.log("updated user: ", { ...user });
                result(null, { ...user });
              }
            );
          }
          
          static delete(user_id, result) {
            db.query("DELETE FROM Users WHERE user_id = ?", user_id, (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
        
              if (res.affectedRows == 0) {
                // not found
                result({ kind: "not_found" }, null);
                return;
              }
        
              console.log("deleted user with user_id: ", user_id);
              result(null, res);
            });
          }
        
        }

module.exports = User;