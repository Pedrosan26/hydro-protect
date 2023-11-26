const mysql = require('../database/db.js')

class MainController {

    async logPh(req , res){
        console.log(req.params.ph)
        console.log(req.params.deviceID)
        console.log(req.params.pastilla); 
        if(req.params.deviceID != null && req.params.ph != null && req.params.pastilla != null) {
            let deviceID = req.params.deviceID
            let ph = req.params.ph;
            let pastilla = req.params.pastilla;    
            var sql = `insert into log_ph (log_date, device_id, ph,pastilla) values (now(), ${deviceID}, ${ph},${pastilla});`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
          res.send('Por favor llena todos los datos!')
        }
    }
    
    async getLogsPh(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_ph where device_id='${deviceID}'`
            mysql.query(sql, (error, data, fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        data
                    })
                }
            })
        }
    }
}

const phController = new MainController()
module.exports = phController;