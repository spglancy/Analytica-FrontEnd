import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyD7XtCQCg5Dteawu7EbDXQi0VwiGyCYiD0",
  authDomain: "analytica-c055c.firebaseapp.com",
  databaseURL: "https://analytica-c055c.firebaseio.com/",
  projectId: "analytica-c055c",
  storageBucket: "analytica-c055c.appspot.com",
  messagingSenderId: "11540877075",
  appId: "1:11540877075:web:c3d75ec306175ca51394e6",
  measurementId: "G-4F7SY5PKFZ"
}

firebase.initializeApp(config)

export default firebase