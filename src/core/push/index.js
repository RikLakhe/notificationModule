const admin = require("firebase-admin");

const serviceAccount = require("./../../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-aa8aa.firebaseio.com",
});

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const sendPushNotification = async (pushOptions) => {
  const {
    registrationToken,
    message,
    title,
    // options = notification_options,
  } = pushOptions;

  const message_notification = {
    notification: {
       title: title,
       body: message
           },
           token: registrationToken
    };

  return admin
    .messaging()
    .send(message_notification)
    .then((response) => {
      console.log("Notification sent successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = sendPushNotification;
