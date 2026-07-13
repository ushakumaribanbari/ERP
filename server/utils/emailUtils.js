const SibApiV3Sdk = require('sib-api-v3-sdk');

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications['api-key'].apiKey =
    process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ email, subject, html }) => {

    try {

        await apiInstance.sendTransacEmail({

            sender: {
                name: "NexusERP",
                email: process.env.BREVO_SENDER_EMAIL
            },

            to: [
                {
                    email
                }
            ],

            subject,

            htmlContent: html

        });

        console.log("✅ Email Sent");

    }

    catch (err) {

        console.error(err.response?.body || err.message);

        throw new Error("Email delivery failed.");

    }

};

module.exports = sendEmail;