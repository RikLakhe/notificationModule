const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { mailhost, mailuser, mailpass } = require('../../config/vars');

const sendMail = async (mailOptions) => {
  let fallbackTransport;
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: mailOptions.service,
      auth: {
        user: mailOptions.username,
        pass: mailOptions.password,
      },
    }),
  );

  if (mailhost && mailuser && mailpass) {
    fallbackTransport = nodemailer.createTransport(
      smtpTransport({
        service: mailhost,
        auth: {
          user: mailuser,
          pass: mailpass,
        },
      }),
    );
  }

  return transporter
    .verify()
    .then(() => Promise.resolve(
      transporter.sendMail({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.text,
      }),
    ))
    .catch((transporterError) => {
      if (fallbackTransport) {
        return fallbackTransport
          .verify()
          .then(() => Promise.resolve(
            fallbackTransport.sendMail({
              from: mailOptions.from,
              to: mailOptions.to,
              subject: mailOptions.subject,
              text: mailOptions.text,
              html: mailOptions.text,
            }),
          ))
          .catch((fallbackTransportError) => Promise.reject(fallbackTransportError));
      }
      return Promise.reject(transporterError);
    });
};

module.exports = sendMail;
