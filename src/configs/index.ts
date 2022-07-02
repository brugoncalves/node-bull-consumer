export default {
    redis: {
        host: process.env.REDIS_HOST!,
        password: process.env.REDIS_PASSWORD!,
        port: Number(process.env.REDIS_PORT!),
    },
    mail: {
        config: {
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_HOST),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        },
        default: {
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
        },
    },
    mysql: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        logging: false,
    }
};
