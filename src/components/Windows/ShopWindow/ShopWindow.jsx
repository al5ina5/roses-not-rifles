import Product from '../../Shop/Product'
import Button from '../../Button'
import Window from '../Window'
import ProductsTab from './Products'
import { useReducer, useState } from 'react'
import CheckoutTab from './Checkout'
import { ShopProvider } from '../../../context/ShopContext'

const PRODUCTS_TAB = 'products'
const CART_TAB = 'cart'
const CHECKOUT_TAB = 'checkout'

function reducer(initalState, action) {
    const state = { ...initalState }
    switch (action.type) {
        case 'cart.add':
            console.log('Adding item to cart...')
            state.line_items.push(action.payload)
            return state
        case 'cart.remove':
            console.log('Removing item from cart...')
            const removedItem = state.line_items.filter((item) => item.id != action.payload)
            console.log(removedItem)
            state.line_items = removedItem
            return state
        case 'set':
            console.log(action.payload)
            state[action.payload.key] = action.payload.value
            return state
        default:
            return state
    }
}

export default function ShopWindow({ close, desktopRef }) {
    const [activeTab, setActiveTab] = useState(PRODUCTS_TAB)

    const isProducts = activeTab == PRODUCTS_TAB
    const isCart = activeTab == CART_TAB
    const isCheckout = activeTab == CHECKOUT_TAB

    const [state, dispatch] = useReducer(reducer, { line_items: [] })

    return (
        <ShopProvider value={{ state, dispatch }}>
            <Window
                title='The Shop'
                offset={100}
                close={close}
                desktopRef={desktopRef}
                taskbar={
                    <div className='text-xs p-2 space-x-2'>
                        <a className={isProducts ? 'underline' : ''} onClick={() => setActiveTab(PRODUCTS_TAB)}>
                            Products
                        </a>
                        {/* <a className={isCart ? 'underline' : ''} onClick={() => setActiveTab(CART_TAB)}>
                        Cart
                    </a> */}
                        <a className={isCheckout ? 'underline' : ''} onClick={() => setActiveTab(CHECKOUT_TAB)}>
                            Checkout
                        </a>
                    </div>
                }>
                {isProducts && <ProductsTab />}
                {isCart && <CartTab />}
                {isCheckout && <CheckoutTab />}
            </Window>
        </ShopProvider>
    )
}
