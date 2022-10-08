const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./src/config');
const routes = require('./src/routes/route');
const handleErrors = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' , (req , res)=>{
    res.status(404).send({
         code: 1,
         message: "api path not found",
         data: [],
    });
 })
 
 // routes
 app.use('/api/', routes);
 
 // Custom Error Handling
 app.use(handleErrors);
 
 app.listen(config.port, config.host, () => {
     console.log(`REST API listening at http://${config.host}:${config.port}/ `);
 });