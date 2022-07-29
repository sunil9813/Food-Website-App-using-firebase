import React, { useEffect, useState } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"
import { motion } from "framer-motion"
import { useStateValue } from "../context/StateProvider"
import { actionType } from "../context/Reducer"
let items = []

export const CartItem = ({ item, flag, setFlag }) => {
  const [{ cartItems }, dispatch] = useStateValue()
  const [qty, setQty] = useState(item.qty)
  //const [items, setItems] = useState([])

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items))
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    })
  }
  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1)
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1
          setFlag(flag + 1)
        }
      })
      cartDispatch()
    } else {
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id)
        setFlag(flag + 1)
        cartDispatch()
      } else {
        setQty(qty - 1)
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1
            setFlag(flag + 1)
          }
        })
        cartDispatch()
      }
    }
  }

  useEffect(() => {
    items = cartItems
  }, [qty, items])

  return (
    <div className='w-full p-1 px-2 flex items-center gap-2 shadow-md mb-5'>
      <img src={item?.imageURL} alt='' className='w-20 h-20 max-w-[60px] rounded-full object-contain' />

      {/* name section */}
      <div className='flex flex-col gap-2'>
        <p className='text-base text-black'>{item?.title}</p>
        <p className='text-sm block text-gray-600 font-semibold'>${parseFloat(item?.price) * qty}</p>
      </div>

      {/* button section */}
      <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty("remove", item?.id)}>
          <BiMinus className='text-black' />
        </motion.div>
        <p className='w-5 h-5 rounded-sm bg-gray-300 text-black flex items-center justify-center'>{item?.qty}</p>
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty("add", item?.id)}>
          <BiPlus className='text-black' />
        </motion.div>
      </div>
    </div>
  )
}
