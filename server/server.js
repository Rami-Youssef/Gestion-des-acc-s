const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const jwt =require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods:["POST","GET"],
        credentials: true
    }
))
app.use(express.json())

const port = 5000

const db= mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database: "lesieur"
})

app.listen(port, ()=>{
    console.log('i m working')
})











//end point for demande
app.post('/Add', (req, res) => {
    const sql = "INSERT INTO `demandes` (`demande`, `société`, `prénom`, `nom`, `fonction`, `type`, `email`, `direction`, `site`, `application`, `D_R`, `managerId`) VALUES ?";
    let values = [
        [
            req.body.Demande,
            req.body.Société,
            req.body.Prenom,
            req.body.Nom,
            req.body.Bénificiare,
            req.body.Profil,
            req.body.Adresse,
            req.body.Direction,
            req.body.Site,
            req.body.Application,
            JSON.stringify(req.body.D_R), // Assuming D_R is a JSON array
            req.body.id
        ]
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ message: "prob is: " + err });
        return res.json({ Status: 'nice' });
    });
});

app.get('/ListDemande', (req, res) => {
    const sql = 'SELECT * FROM demandes WHERE niveau = 0';
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ message: "Problem is: " + err });
        }
        return res.json(result);
    });
});

app.post('/login',(req,res)=>{
    const sql = "SELECT id ,Email ,Password ,Poste FROM users WHERE Email=? AND Password=?";
    db.query(sql,[req.body.Email, req.body.Password],(err,result)=>{
        if(err){
            return res.json({ Status: "the error is " });
        } else if(result.length > 0){
            const Poste = result[0].Poste;
            const Email = result[0].Email;
            const Password = result[0].Password;
            const id= result[0].id;
            const token = jwt.sign({id: id, Poste: Poste, Email : Email}, "TokenKey", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success",Poste: Poste,Email: Email,Password: Password   });
        } else {
            return res.json({ Status: "incorrect" });
        }
    });
});

app.get('/verify',(req,res)=>{
    const token = req.cookies.token ;
    if(!token){
        return res.json({State: "Please log in"})
    }else{
        jwt.verify(token,"TokenKey", (err,decoded)=>{
            if(err){
                res.json({Message: "fake athentification"})
            }else{
                req.token= decoded;
                return res.json({Status: "Success", token: req.token})
            }
        })
    }
})

app.get('/List', (req, res) => {
    const mysqlQuery = "SELECT * FROM demandes";
    const sqlQuery = "SELECT * FROM demandes WHERE managerId != ? and niveau between 3 and 4";

    // Get the id from query parameters
    const id = req.query.id;

    // Perform the first SQL query
    db.query(mysqlQuery, [id], (err1, mysqlResult) => {
        if (err1) {
            return res.json({ Status: "Error in MySQL query: " + err1 });
        } else {
            // Perform the second SQL query
            db.query(sqlQuery,[id], (err2, sqlResult) => {
                if (err2) {
                    return res.json({ Status: "Error in SQL query: " + err2 });
                } else {
                    const MyList = mysqlResult;
                    const OtherList = sqlResult;
                    return res.json({ Status: "Success", MyList: MyList, OtherList: OtherList});
                }
            });
        }
    });
});


app.get('/logout', (req, res) => {
    // Clear the token cookie by setting it to an empty string and expiring it
    res.clearCookie("TokenKey")

    // Respond with a success message
    return res.json({ message: "Logged out successfully" });
});

app.post('/next', (req, res) => {
    const { id, niveau } = req.body;
    const sql = "UPDATE Demandes SET niveau = ? WHERE id = ?";
    
    db.query(sql, [niveau, id], (err, sqlResult) => {
        if (err) {
            return res.status(500).json({ error: "Error in SQL query", message: err.message });
        } else {
            return res.json({ Status: "Success"+ id + niveau });
        }
    });
});

app.post('/nexttwo', (req, res) => {
    const Group = req.body.Group;
    const  UPN  = req.body.UPN;
    const id  = req.body.id;
    const niveau = req.body.niveau;

    const sql = "UPDATE demandes SET  UPN = ? , MailGroup = ? , niveau = ? WHERE id = ?";
    
    db.query(sql, [UPN, Group,niveau, id], (err, sqlResult) => {
        if (err) {
            return res.status(500).json({ error: "Error in SQL query", message: err.message });
        } else {
            return res.json({ Status: "Success"+id+UPN+Group+niveau });
        }
    });
});


app.post('/one/:id', (req, res) => {
    const id = req.params.id; // Access id from query string
    const sqlQuery = "SELECT * FROM demandes WHERE id=?";
    db.query(sqlQuery, [id], (err2, result) => {
      if (err2) {
        return res.json({ Status: "Error in SQL query: " + err2 });
      } else {
        const demande = result;
        return res.json({ Status: "Success", demande: demande });
      }
    });
  });
  