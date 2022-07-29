import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData"

const userInfo = fetchUser()
const cartInfo = fetchCart()
//const total = fetchTotal()

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
  //total: [],
}
