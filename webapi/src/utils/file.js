import fs from 'fs';
import path from 'path';
import moment from 'moment';
import config from './../config';

export function makeFilePathInfo (fileName, folder = "") {
    fileName = fileName || (['file', Date.now(), Math.ceil(Math.random() * 100)].path.join('-'));

    var momentPath = moment().format('YYYYMMDD');

    var fileDir = folder ? `${folder}/${momentPath}/` : `${momentPath}/`;

    var filePath = `${fileDir}${fileName}`;

    var absFolderDir = path.join(config.fileDir, fileDir);
    if (!fs.existsSync(absFolderDir)) {
        fs.mkdirSync(absFolderDir);
    }

    var absFilePath = path.join(absFolderDir, './' + fileName)
    return { absFilePath, filePath };
}

export function getAbsFilePath (filePath) {
    return path.join(config.fileDir, './' + filePath);
}

export async function storeFile (file) {
    var filePathInfo = await makeFilePathInfo(file.name);

    var absFilePath = filePathInfo.absFilePath;

    fs.renameSync(file.path, absFilePath);

    return { filePath: filePathInfo.filePath, absFilePath: absFilePath };
}