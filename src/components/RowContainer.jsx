import React, { useEffect, useRef, useState } from "react"
import { MdShoppingBasket } from "react-icons/md"
import { motion } from "framer-motion"
import NotFound from "../img/NotFound.svg"
import { useStateValue } from "../context/StateProvider"
import { actionType } from "../context/Reducer"

export const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef()

  /*---------------addToCart----------- */
  const [items, setItems] = useState([])
  const [{ cartItems }, dispatch] = useStateValue()

  const addToCart = () => {
    //console.log(item)
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    })
    localStorage.setItem("cartItems", JSON.stringify(items))
  }

  useEffect(() => {
    addToCart()
  }, [items])
  /*---------------addToCart----------- */

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue
  }, [scrollValue])

  //console.log(data)
  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 flex gap-3 items-center scroll-smooth
      ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item?.id} className='w-300 h-[225px] min-w-[300px] md:w-340 md:min-w-[340px] my-12 bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg transition-all duration-500 ease-in-out cursor-pointer flex flex-col justify-between'>
            <div className='w-full flex items-center justify-between'>
              <motion.div whileTap={{ scale: 1.2 }} className='w-40 h-40 -mt-8 drop-shadow-2xl'>
                <img src={item?.imageURL} alt='' className='w-full h-full object-contain' />
              </motion.div>
              <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md drop-shadow-2xl' onClick={() => setItems([...cartItems, item])}>
                <MdShoppingBasket className='text-white' />
              </motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
              <p className='text-textColor font-semibold text-base md:text-lg capitalize'>{item?.title}</p>
              <p className='mt-1 text-sm text-gray-500'>{item?.calories} Calories</p>
              <div className='flex items-center gap-8'>
                <p className='text-lg text-headingColor font-semibold'>
                  <span className='text-sm text-red-500'>$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='w-full flex flex-col items-center justify-center'>
          <img src={NotFound} alt='NotFound' className='h-340' />
          <p className='text-xl text-headingColor font-semibold my-2'>Items Not Available </p>
        </div>
      )}
    </div>
  )
}
