var path = require('path');

const configData = {
    port: 9987,
    mysql: {
        host: 'localhost',
        poolSize: 5,
        user: 'root',
        password: 'zhangyan10110820',
        database: 'ooplover',
    },
    secret: 'QwjoiwjefEjuwdhfHhHPPOWEIsdfjwIEnLEIfeoilDILFJEUhkalidjoUHyewihfYGHjYUhkK',
    jwtCookieName: 'AQ-Token',
    uploadDir: path.join(__dirname, '../../uploadTMP'),
    fileDir: path.join(__dirname, '../../file')
};

// console.log(configData);

export default configData;