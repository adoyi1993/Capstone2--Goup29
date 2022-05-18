const db = require ('../config/db.config');

class Reports{
    constructor(report_id, property_id, created_on, reason, description){
            this.report_id = report_id;
            this.property_id = property_id;
            this.created_on = created_on;
            this.reason = reason;
            this.description = description;
    }
    static create (newReport, result){
        db.query("INSERT INTO Reports VALUES (?, ?, ?, ?, ?)", [newReport.report_id, newReport.property_id, newReport.created_on, newReport.reason, newReport.description], (err, res)=>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Created Report: ", {...newReport});
            result(null, {report_id: res.insertId, ...newReport});
        });
    }


    static findByID (report_id, result){
        db.query("SELECT FROM Reports WHERE report_id=?", [report_id], (err, res)=>{
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
            db.query('SELECT * FROM Reports', (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
        
              console.log("Reports: ", res);
              result(null, res);
            });
          }
        
          
          static updateById(report_id, user, result) {
            db.query("UPDATE Reports SET report_id = ?, property_id = ?, created_on= ?, reason =?, description=? ",
              [user.report_id, user.property_id, user.created_on, user.reason, user.description],
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
        
                console.log("updated Report: ", { ...user });
                result(null, { ...user });
              }
            );
          }
          
          static delete(report_id, result) {
            db.query("DELETE FROM Reports WHERE report_id = ?", report_id, (err, res) => {
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
        
              console.log("deleted user with report_id: ", report_id);
              result(null, res);
            });
          }
        
        }

module.exports = Reports;