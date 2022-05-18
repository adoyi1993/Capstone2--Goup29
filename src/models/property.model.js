const db = require ('../config/db.config');

class Property{
    constructor(property_id, user_id, status, price, state, city, address, type, image_url, created_on){
            this.property_id = property_id;
            this.user_id = user_id;
            this.status = status;
            this.price = price;
            this.state = state;
            this.city = city;
            this.address = address;
            this.type = type;
            this.image_url = image_url;
            this.created_on = created_on; 
    }
    static create (newProperty, result){
        db.query("INSERT INTO Property VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [newProperty.property_id, newProperty.user_id, newProperty.status, newProperty.price, newProperty.state, newProperty.city, newProperty.address, newProperty.type, newProperty.image_url, newProperty.created_on], (err, res)=>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Created User: ", {...newProperty});
            result(null, {property_id: res.insertId, ...newProperty});
        });
    }


    

    static findByID (property_id, result){
        db.query("SELECT FROM Property WHERE property_id=?", [property_id], (err, res)=>{
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



    static findByType (type, result){
      db.query("SELECT FROM Property WHERE type=?", [type], (err, res)=>{
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }

          if (res.length){
              console.log("found Property: ", res[0]);
              result(null, res[0]);
              return;
          }

          // not found
          result({kind: "not found"}, null);
      });
  }


    


        static getAll(result) {
            db.query('SELECT * FROM Property', (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
        
              console.log("Properties: ", res);
              result(null, res);
            });
          }
        
          
          static updateById(property_id, user, result) {
            db.query("UPDATE Property SET property_id = ?, user_id = ?, status = ?, price=?, state=?, city=?, address=?, type=?, image_url=?, created_on =? " ,
              [user.property_id, user.user_id, user.status, user.price, user.state, newProperty.city, user.address, user.type, user.image_url, user.created_on],
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
          
          static delete(property_id, result) {
            db.query("DELETE FROM Property WHERE property_id = ?", property_id, (err, res) => {
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
        
              console.log("deleted user with property_id: ", property_id);
              result(null, res);
            });
          }
        
        }

module.exports = Property;