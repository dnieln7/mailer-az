require('dotenv').config();
const nodemailer = require("nodemailer");
const Pool = require('pg').Pool

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function to send an email');

    const email = req.body.email;
    const content = req.body.message;
    const date = req.body.date;

    let res = {
        status: 400,
        body: {
            success: false,
            message: "Email attribute is missing",
        }
    }

    if (email && content && date) {
        const auth = {
            user: process.env.OUTLOOk_EMAIL,
            pass: process.env.OUTLOOK_PASSWORD
        }

        const dbAuth = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            ssl: true
        }

        const message = {
            from: auth.user,
            to: email,
            subject: 'Azure Functions Mailer',
            text: content,
        };

        await sendEmail(message, auth).then(result => {
            insertToPostgres(email, content, date, dbAuth);

            res.status = 200;
            res.body = {
                success: true,
                message: result,
            };
        }).catch(reason => {
            console.error("There was an error: " + reason)

            res.status = 500;
            res.body = {
                success: false,
                message: reason,
            };
        });
    }

    context.res = res;
}

const sendEmail = (message, auth) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            secureConnection: false,
            port: 587,
            tls: {
                ciphers: 'SSLv3'
            },
            auth: auth
        });

        transporter.sendMail(message, (error) => {
            if (error) {
                reject("There was an error: " + error)
            } else {
                resolve("Email Sent Successfully")
            }
        });
    });
};

function insertToPostgres(email, message, date, dbAuth) {
    const pool = new Pool(dbAuth);

    pool.query('INSERT INTO tb_emails (email, message, date) VALUES ($1, $2, $3)', [email, message, date],
        (error, results) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Success Inserting to Database")
            }
        }
    );
}
