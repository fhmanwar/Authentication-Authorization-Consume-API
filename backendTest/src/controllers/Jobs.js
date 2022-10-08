const request = require('request');
const axios = require('axios').default;

const url = 'http://dev3.dansmultipro.co.id/api/recruitment';

const jobsAll = async (req, res, next) => {
    try {
        request({
            url: url+`/positions.json`, //URL to hit
            // qs: {from: 'example', time: +new Date()}, //Query string data
            method: 'GET', // specify the request type
            headers: { // speciyfy the headers
                'Content-Type': 'application/json',
                'Custom-Header': 'Custom Value'
            },
            // body: 'Hello Hello! String body!' //Set the body as a string
        }, function(error, response, body){
            if(error) {
                console.log(error);
                return res.status(200).json({
                    code: -1,
                    msg: error,
                    data: [],
                });
            } else {
                // console.log(response.statusCode, body);
                return res.status(200).json({
                    code: 1,
                    msg: "Succesfully",
                    data: JSON.parse(body),
                });
            }
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

const jobsSearch = async (req, res, next) => {
    try {
        // console.log(req.body);
        var desc = req.body.desc;
        var loc = req.body.loc;
        var fulltime = req.body.full_time;
        var page_number = req.body.page;
        request({
            url: url+`/positions.json`,
            qs: {description: desc, location: loc, page: page_number},
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json',
            },
        }, function(error, response, body){
            // console.log(body);
            // console.log(error);
            // console.log(response);
            if(error) {
                next(e);
                // return res.status(200).json({
                //     code: -1,
                //     msg: error,
                //     data: [],
                // });
            } else {
                // console.log(response.statusCode, body);
                return res.status(200).json({
                    code: 1,
                    msg: "Succesfully",
                    data: JSON.parse(body),
                });
            }
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

const jobsId = async (req, res, next) => {
    try {
        // console.log(req.body);
        var id = req.params.id;
        request({
            url: url+`/positions/${id}`,
            // qs: {description: desc, location: loc, page: page_number},
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json',
            },
        }, function(error, response, body){
            if(error) {
                next(e);
                // return res.status(200).json({
                //     code: -1,
                //     msg: error,
                //     data: [],
                // });
            } else {
                // console.log(response.statusCode, body);
                return res.status(200).json({
                    code: 1,
                    msg: "Succesfully",
                    data: JSON.parse(body),
                });
            }
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = {
    jobsAll,
    jobsSearch,
    jobsId,
}