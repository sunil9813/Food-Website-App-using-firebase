import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.confg"

// saving the new items
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, { merge: true })
}

// fetching all data from cloud
export const getAllFoodItems = async () => {
  const items = await getDocs(query(collection(firestore, "foodItems"), orderBy("id", "desc")))
  return items.docs.map((doc) => doc.data())
}
