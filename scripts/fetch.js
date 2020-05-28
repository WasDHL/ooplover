var request = require('request');

function base64Encode (str) {
    return Buffer.from(str).toString('base64');
}

function base64Decode (str) {
	return Buffer.from(str, 'base64').toString();
}


request({
    url: "http://101.132.177.143:7777/api/message/pullReceive",
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
        "Cookie": 'AQ-Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkRITCIsImlhdCI6MTU4NzQzOTk1MSwiZXhwIjoxNTg3NDc1OTUxfQ.d_9JF0S7SdnoXX0hSYVx7V4vTNANsB-WanBUxyjXa0A; io=ognKSkL1BMLe1WZEAADt'
    },
    body: {"numLimit":5}
}, function(error, response, body) {
    // console.log(body);
    var data = body.data || [];
    console.log(data.map(msg => base64Decode(msg.content)));
})