const express = require('express')
const db = require('./database/db')
const app = express()
const port = 8080
const bodyParser = require("body-parser");
let cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get('/getUsers', async (req, res) => {
    try {
        const result = await db.pool.query('select * from user');
        res.json({ data: result, total: result.length });

    } catch (err) {
        throw err;
    }
});

//PUT
app.put('/userUpdate', async (req, res) => {
    let user = req.body;

    try {
        if (res.body === undefined) {
            res.status(500).json({
                succes: false,
                msg: 'Error'
            });
        } else {

            const result = await db.pool.query("update user set name = ?, phone_number = ? , email = ?, email2 = ?, company_id = ? where id_user = ?", [user.name, user.phone_number, user.email, user.email2, user.company_id, user.id_user]);
            res.send(result);
        }

    } catch (err) {
        throw err;
    }
});

//POST
app.post('/usersPost', async (req, res) => {
    let user = req.body;
    let { company_id } = req.body;
    try {
        const result = await db.pool.query("insert into user (name, phone_number, email, email2, company_id) values (?,?,?,?,?)", [user.name, user.phone_number, user.email, user.email2, Number(company_id)]);
        res.send(result);

    } catch (err) {
        throw err;
    }
});

//DELETE
app.delete('/userDelete/:id', async (req, res) => {
    let id_user = req.params.id;
    try {

        //delete from user where id_user = 2
        const result = await db.pool.query("delete from user where id_user = ?", [id_user]);
        res.send({ msg: 'Eliminado', result });

    } catch (err) {
        throw err;
    }
});

//GetId
app.get('/getUsersById', async (req, res) => {
    let { id_user } = req.body;
    try {
        const result = await db.pool.query(`select * from user where id_user = ${id_user}`);
        res.json(result);

    } catch (err) {
        throw err;
    }
});




// Company GET UPDATE DELETE UPGRADE
// GET
app.get('/getCompany', async (req, res) => {
    try {
        const result = await db.pool.query('select * from company');
        res.json({ data: result, total: result.length });
    } catch (err) {
        throw err;
    }
});

//POST
app.post('/companyPost', async (req, res) => {
    let company = req.body;
    try {
        //INSERT INTO company ( name, direction, phone_number, web_site) VALUES ('ATC s.a', 'San Salvador', 85478569, 'www.com');
        const result = await db.pool.query("insert into company (name, direction, phone_numer, web_site) values (?,?,?,?)", [company.name, company.direction, company.phone_numer, company.web_site]);

        res.send(result);
    } catch (err) {
        throw err;
    }
});

//PUT
app.put('/companyUpdate', async (req, res) => {
    let company = req.body;
    try {
        if (res.body === undefined) {
            res.status(500).json({
                succes: false,
                msg: 'Error'
            });
        } else {
            //UPDATE user SET name = 'Isaac' WHERE id_user=2;
            //const result = await db.pool.query("update user set name = ?, phone_number = ? , email = ?, email2 = ?, company_id = ? where id_user = ?", [user.name, user.phone_number, user.email, user.email2, user.company_id, user.id_user]);
            const result = await db.pool.query("update company set name = ?, direction = ? , phone_numer = ?, web_site = ? where id_company = ?", [company.name, company.direction, company.phone_numer, company.web_site, company.id_company]);
            res.send(result);
        }
    } catch (err) {
        throw err;
    }
});

//DELETE
app.delete('/companyDelete/:id', async (req, res) => {

    let id_company = req.params.id;
    try {
        //delete from user where id_company = 2
        const result = await db.pool.query("delete from company where id_company = ?", [id_company]);
        res.send(result);
    } catch (err) {
        throw err;
    }
});


app.listen(port);