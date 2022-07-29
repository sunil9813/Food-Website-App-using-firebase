import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCCmVahdDZQSAb063GGy3QjzjLz2AtFOK8",
  authDomain: "restaurantapp-cbeb1.firebaseapp.com",
  databaseURL: "https://restaurantapp-cbeb1-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-cbeb1",
  storageBucket: "restaurantapp-cbeb1.appspot.com",
  messagingSenderId: "67574057607",
  appId: "1:67574057607:web:6a58d1f87267623ceb4622",
}
const app = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }
