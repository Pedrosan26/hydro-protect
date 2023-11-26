const mysql = require('../database/db')

class MainController {

    async logTime(req , res){
        console.log(req.params.time)
        console.log(req.params.deviceID)
        console.log(req.params.buzzer)
        if(req.params.deviceID != null && req.params.time != null && req.params.buzzer != null) {
            let deviceID = req.params.deviceID
            let time = req.params.time;
            let buzzer = req.params.buzzer;
            var sql = `insert into log_time(log_date, device_id, time, buzzer) values (now(), ${deviceID}, ${time}, ${buzzer});`
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
    
    async getLogsTime(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_time where device_id='${deviceID}'`
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

const timeController = new MainController()
module.exports = timeController;