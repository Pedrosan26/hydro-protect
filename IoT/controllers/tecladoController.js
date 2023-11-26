const mysql = require('../database/db')

class MainController {

    async logTeclado(req , res){
        console.log(req.params.char)
        console.log(req.params.deviceID)
        if(req.params.deviceID != null && req.params.char != null) {
            let deviceID = req.params.deviceID
            let char = req.params.char;
            var sql = `insert into log_teclado(log_date, device_id, caracter) values (now(), ${deviceID}, ${char});`
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
    
    async getLogsTeclado(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_teclado where device_id='${deviceID}'`
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

const tecladoController = new MainController()
module.exports = tecladoController;