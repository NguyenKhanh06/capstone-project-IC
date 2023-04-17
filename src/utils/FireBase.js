import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBzzMrusEf99NJzihK0LjYd5RAGMD75MDI",
  authDomain: "capstoneic.firebaseapp.com",
  projectId: "capstoneic",
  storageBucket: "capstoneic.appspot.com",
  messagingSenderId: "270582436509",
  appId: "1:270582436509:web:3ee395eb0098ef9ba47a74",
  measurementId: "G-HEEQ3XWDNC"
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BJK48eQ8rOBKK2_nX_1qNjwwF-bVV-mnx24sEtEhcxXnil91TwxgWG8K_VxH5xnwVf9NgGJHpyi0omG3th_L_xI",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();
