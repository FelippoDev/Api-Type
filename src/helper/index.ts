import crypto from 'crypto'

const SECRET_KEY:string = process.env.SECRET_KEY || "B@s!c_$&(R&T327057mv7vmc9c,94cm94c12,9320x4u31" 

export const random = () => crypto.randomBytes(128).toString('base64')
export const authenticate = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET_KEY).digest('hex')
}