const mysql = require('../database/db')

class MainController {

    async logFlujo(req , res){
        console.log(req.params.flujo)
        console.log(req.params.deviceID)
        console.log(req.params.valvula)
        if(req.params.deviceID != null && req.params.flujo != null && req.params.valvula != null) {
            let deviceID = req.params.deviceID
            let flujo = req.params.flujo;
            let valvula = req.params.valvula;
            var sql = `INSERT INTO log_Flujo(log_date, device_id ,flujo, valvula) VALUES(now(), ${deviceID}, ${flujo}, ${valvula});`
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
    
    async getLogsFlujo(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_Flujo where device_id='${deviceID}'`
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

const flowController = new MainController()
module.exports = flowController;