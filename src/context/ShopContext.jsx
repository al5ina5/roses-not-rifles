import { createContext } from 'react'

const ShopContext = createContext({})

export const ShopProvider = ShopContext.Provider
export const ShopConsumer = ShopContext.Consumer

export default ShopContext
