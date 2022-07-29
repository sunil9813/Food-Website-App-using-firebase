import React, { useEffect, useState } from "react"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { RiRefreshFill } from "react-icons/ri"
import { motion } from "framer-motion"
import { useStateValue } from "../context/StateProvider"
import { actionType } from "../context/Reducer"
import EmptyCart from "../img/emptyCart.svg"
import { CartItem } from "./index"

export const CardContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue()
  const [flag, setFlag] = useState(1)
  const [tot, setTot] = useState(0)

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    })
  }
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price
    }, 0)
    setTot(totalPrice)
    console.log(tot)
  }, [tot, flag])

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    })
    localStorage.setItem("cartItems", JSON.stringify([]))
  }
  return (
    <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[100]'>
      <div className='w-full flex items-center justify-between p-4'>
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className='text-textColor text-3xl cursor-pointer' />
        </motion.div>
        <p className='text-textColors text-lg font-semibold'>Cart</p>
        <motion.p whileTap={{ scale: 0.75 }} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100  cursor-pointer text-textColor text-base' onClick={clearCart}>
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className='w-full h-full rounded-t-[2rem] flex flex-col'>
          <div className='w-full h-340 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
            {/* cart items */}
            {cartItems && cartItems.length > 0 && cartItems.map((item) => <CartItem key={item.id} item={item} flag={flag} setFlag={setFlag} />)}
          </div>

          {/* cart total */}
          <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400 text-lg'>Sub Total</p>
              <p className='text-gray-400 text-lg'>${tot} </p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400 text-lg'>Delivery</p>
              <p className='text-gray-400 text-lg'>$ 2.5 </p>
            </div>

            <div className='w-full border-b border-gray-600 my-2'></div>

            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-200 text-xl font-semibold'>Total</p>
              <p className='text-gray-200 text-xl font-semibold'>${tot + 2.5}</p>
            </div>

            {user ? (
              <motion.button whileTap={{ scale: 0.8 }} type='button' className='w-full p-2 rounded-full bg-orange-500 text-lg my-2 hover:shadow-lg'>
                Check Out
              </motion.button>
            ) : (
              <motion.button whileTap={{ scale: 0.8 }} type='button' className='w-full p-2 rounded-full bg-orange-500 text-lg my-2 hover:shadow-lg'>
                Login to check
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
          <img src={EmptyCart} alt='EmptyCart' className='w-300' />
          <p className='text-xl text-textColor font-semibold'>Add Some items to your Cart</p>
        </div>
      )}
    </motion.div>
  )
}
