import React, { useEffect, useState } from "react"
import { HomeContainer } from "./HomeContainer"
import { motion } from "framer-motion"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { RowContainer, MenuContainer, CardContainer } from "./index"
import { useStateValue } from "../context/StateProvider"

export const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue()

  const [scrollValue, setScrollValue] = useState(0)

  useEffect(() => {}, [scrollValue, cartShow])

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />

      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl font-semibold relative capitalize text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-500 transition-all ease-in-out'>Our fresh & healthy food</p>

          <div className='hidden md:flex gap-3 items-center '>
            <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer ease-in-out flex items-center justify-center' onClick={() => setScrollValue(-200)}>
              <MdChevronLeft className='text-lg text-white' />
            </motion.div>
            <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer ease-in-out flex items-center justify-center' onClick={() => setScrollValue(200)}>
              <MdChevronRight className='text-lg text-white' />
            </motion.div>
          </div>
        </div>
        <RowContainer scrollValue={setScrollValue} flag={true} data={foodItems?.filter((n) => n.category === "fruits")} />
      </section>

      <MenuContainer />

      {/* yadi card add garrko or card xa bhane show garnu paryo */}
      {cartShow && <CardContainer />}
    </div>
  )
}
