import { User, UserTracking } from './../../model';
import config from './../../config';

import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import bcrypt from 'bcryptjs';
import uid from 'uid-safe';

let bcryptHash = Promise.promisify(bcrypt.hash);
let bcryptCompare = Promise.promisify(bcrypt.compare);

export async function hashPassword(password) {
	let saltRounds = 10;
	return await bcryptHash(password, saltRounds);
}

export async function verifyPassword(password, hash) {
	return await bcryptCompare(password, hash);
}

export async function createUserToken(userId) {
    let token = uid.sync(48);

    let user = await query({ id: userId });

    let jwtToken = jwt.sign({ id: user.id, name: user.name }, config.secret, { expiresIn: '10h' });

    // await UserTracking.create({ userId, token });

    return jwtToken;
}

export async function create (body) {
    let { name, password, avator } = body;

    let passwordHash = await hashPassword(password);
    return await User.create({ name, passwordHash, avator });
}

export async function privateQuery (condition) {
    return await User.findOne({ attributes: ['id', 'name', 'avator', 'passwordHash'], where: condition });
}

export async function query (condition) {
    console.log(condition);
    return await User.findOne({ attributes: ['id', 'name', 'avator'], where: condition });
}

export async function users () {
    return await User.findAll();
}

// export async function login (body) {
//     let { name, password } = body;
//     let user = await User.findOne({ where: { name: name } });

//     if (!user) {
//         throw { code: 'E330', message: '非法ID' };
//     } else {
//         let passwordHash = user.passwordHash;
//         return await verifyPassword(password, passwordHash);
//     }
// }