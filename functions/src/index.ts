import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Filter = require("bad-words");

admin.initializeApp();
const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc: functions.firestore.QueryDocumentSnapshot) => {
    const filter = new Filter();
    const {text, uid} = doc.data();

    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      await doc.ref.update({text: `I got BAANNED for saying... ${cleaned}`});

      await db.collection("banned").doc(uid).set({});
    }
  });
