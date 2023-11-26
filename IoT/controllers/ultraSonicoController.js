const mysql = require('../database/db')

class MainController {

    async logUltraSonico(req , res){
        console.log(req.params.led)
        console.log(req.params.dist)
        console.log(req.params.deviceID)
        if(req.params.deviceID != null && req.params.dist != null&& req.params.led != null) {
            let deviceID = req.params.deviceID
            let dist = req.params.dist;
            let led=req.params.led;

            var sql = `insert into log_Ultrasonico(log_date, device_id, dist_cm, Led) values (now(), ${deviceID}, ${dist},${led});`
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
    
    async getLogsUltraSonico(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_Ultrasonico where device_id='${deviceID}'`
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

const ultraSonicoController = new MainController()
module.exports = ultraSonicoController;