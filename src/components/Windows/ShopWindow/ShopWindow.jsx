import Product from '../../Shop/Product'
import Button from '../../Button'
import Window from '../Window'
import ProductsTab from './Products'
import { useState } from 'react'
import CartTab from './Carto'
import CheckoutTab from './Checkout'

const PRODUCTS_TAB = 'products'
const CART_TAB = 'cart'
const CHECKOUT_TAB = 'checkout'

export default function ShopWindow({ close, desktopRef }) {
    const [activeTab, setActiveTab] = useState(PRODUCTS_TAB)

    const isProducts = activeTab == PRODUCTS_TAB
    const isCart = activeTab == CART_TAB
    const isCheckout = activeTab == CHECKOUT_TAB

    return (
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
    )
}
