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
  const { registrationToken, message, title } = pushOptions;

  const message_notification = {
    data: {
      title: title,
      body: message,
    },
    notification: {
      title: title,
      body: message,
    },
  };

  return admin
    .messaging()
    .sendToDevice(
      registrationToken,
      message_notification,
      notification_options
    );
};

module.exports = sendPushNotification;
