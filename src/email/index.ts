import * as  nodemailer from 'nodemailer';
import configs from '../configs';
export default nodemailer.createTransport(configs.mail.config);
