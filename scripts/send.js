var request = require('request');

request({
    url: "http://101.132.177.143:7777/api/message/send",
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
        "Cookie": 'AQ-Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkRITCIsImlhdCI6MTU4NzM5MDY0OSwiZXhwIjoxNTg3NDI2NjQ5fQ.kmif5xM8wDOdk8sm5JHbQ0RQ-EnaxbmHaLRmkWR7Vuw; io=Vhpr1RtZpHv3cLs1AABF'
    },
    body: {"content":""}
}, function(error, response, body) {
    // console.log(body);
    // var data = body.data || [];
    // console.log(data.map(msg => base64Decode(msg.content)));
})