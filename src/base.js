import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAWCjUUm5Sjd2xgIeqEZWCa_7JFPq3msSU",
  authDomain: "catch-of-the-day-matsj.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-matsj.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;
