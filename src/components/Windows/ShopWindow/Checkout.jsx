import Product from '../../Shop/Product'
import Button from '../../Button'
import { useContext, useState } from 'react'
import ShopContext from '../../../context/ShopContext'
import Axios from 'axios'

export default function CheckoutTab({ close, desktopRef }) {
    const [coupon, setCoupon] = useState('')

    const { state, dispatch } = useContext(ShopContext)
    const isFilledOut = true

    const isEmpty = state?.line_items?.length <= 0

    const subtotal = () => {
        var total = 0

        state?.line_items?.map((item) => {
            total = total + parseFloat(item.data.price)
            return total
        })

        return total
    }

    const createOrder = () => {
        const data = {
            payment_method: '',
            payment_method_title: '',
            set_paid: false,
            billing: {
                first_name: state?.first_name,
                last_name: state?.last_name,
                address_1: state?.address_1,
                address_2: state?.address_2,
                city: 'San Francisco',
                state: 'CA',
                postcode: '94103',
                country: 'US',
                email: state?.email,
                phone: state?.phone
            },
            shipping: {
                first_name: state?.first_name,
                last_name: state?.last_name,
                address_1: state?.address_1,
                address_2: state?.address_2,
                city: 'San Francisco',
                state: 'CA',
                postcode: '94103',
                country: 'US'
            },
            line_items: state?.line_items?.map((item) => {
                return {
                    id: 0,
                    product_id: item.product_id,
                    variation_id: item.variation_id,
                    quantity: 1
                }
            }),
            shipping_lines: [
                {
                    method_id: 'flat_rate',
                    method_title: 'Flat Rate',
                    total: '10.00'
                }
            ]
        }

        console.log(data)

        Axios.post(
            'https://api.sebastianalsina.com/i/wp-json/wc/v3/orders/?consumer_key=ck_c3873703ef255eb3d803a6a61113c592ce752c0f&consumer_secret=cs_be6dd9734d54e9885fe006840f4a96266a38634e',
            data
        )
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='h-full'>
            <div className='h-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                    {!isEmpty && (
                        <div className='grid-cols-2 gap-4 hidden sm:grid'>
                            {state?.line_items?.map((item, index) => (
                                <div className='bg-win-gray  border-emboss p-4 space-y-4'>
                                    <img className='w-full' src={item.data.image?.src} alt='' />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='space-y-4 overflow-auto'>
                    <div className='bg-win-gray border-emboss p-4 space-y-4'>
                        <p className='font-win-bold'>Your Cart</p>

                        <p className='text-xs'>
                            {isEmpty ? (
                                'No items in your cart.'
                            ) : (
                                <>
                                    Your cart is filled with the <span className='underline'>coolest</span> goodies.
                                </>
                            )}
                        </p>

                        {!isEmpty && (
                            <div>
                                {state?.line_items?.map((item, index) => (
                                    <div key={index}>
                                        <div className='flex items-center border-b-2 py-1 border-dotted border-black'>
                                            <div>
                                                <p className='font-win-bold'>{item.name}</p>
                                                <div className='text-xs'>
                                                    {item.data.attributes.map((attribute, index) => (
                                                        <span>
                                                            {attribute.name}: {attribute.option}
                                                        </span>
                                                    ))}
                                                    {item.variation_id}
                                                </div>
                                            </div>
                                            <p className='ml-auto'>{item.data.price}</p>
                                            <p className='ml-auto'>
                                                <Button
                                                    onClick={() =>
                                                        dispatch({
                                                            type: 'cart.remove',
                                                            payload: item.id
                                                        })
                                                    }
                                                    className='text-xs font-win-bold'>
                                                    X
                                                </Button>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* <div className='bg-win-gray border-emboss p-4 space-y-4'>
                        <p className='font-win-bold'>Coupon</p>
                        <form action=''>
                            <input
                                className='block w-full p-1 border-emboss-invert'
                                placeholder='Your Name'
                                type='text'
                            />
                        </form>
                    </div> */}

                    <div className='bg-win-gray border-emboss p-4 space-y-4'>
                        <p className='font-win-bold'>Checkout</p>

                        <p>Enter your details to complete and checkout your order.</p>

                        <form className='space-y-4' action=''>
                            <div>
                                <input
                                    name='first_name'
                                    value={state?.name}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'set',
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='First Name *'
                                    type='text'
                                />
                                <input
                                    name='last_name'
                                    value={state?.name}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'set',
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Last Name *'
                                    type='text'
                                />
                                <input
                                    name='email'
                                    value={state?.email}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'set',
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Email *'
                                    type='text'
                                />
                                <input
                                    name='phone'
                                    value={state?.phone}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'set',
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Phone Number *'
                                    type='text'
                                />
                                <input
                                    name='address_1'
                                    value={state?.address}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'set',
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Shipping Address *'
                                    type='text'
                                />
                                <input
                                    name='address_2'
                                    value={state?.addressTwo}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'set',
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Shipping Address (more)'
                                    type='text'
                                />
                                <textarea
                                    name='notes'
                                    value={state?.notes}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'set',
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Order Notes'
                                    type='text'
                                />
                            </div>
                        </form>
                    </div>

                    <div className={`bg-win-gray border-emboss p-4 space-y-4`}>
                        <p className='font-win-bold'>Total</p>
                        <div className='space-y-2'>
                            <div className='text-xs'>
                                <div className='flex items-center border-b-2 py-1 border-dotted border-black'>
                                    <p className=''>Subtotal</p>
                                    <p className='ml-auto'>{subtotal()}</p>
                                </div>
                                <div className='flex items-center border-b-2 py-1 border-dotted border-black'>
                                    <p className=''>Shipping</p>
                                    <p className='ml-auto'>FREE</p>
                                </div>
                                <div className='flex items-center border-b-2 py-1 border-dotted border-black'>
                                    <p className=''>Fees</p>
                                    <p className='ml-auto'>FREE</p>
                                </div>
                            </div>
                            <div className='font-win-bold flex items-center border-b-2 py-1 border-dotted border-black'>
                                <p className=''>Total</p>
                                <p className='ml-auto'>{subtotal()}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${
                            isFilledOut ? 'opacity-100' : 'cursor-not-allowed opacity-50'
                        } bg-win-gray border-emboss p-4 space-y-4`}>
                        <p className='text-xs opacity-50'>
                            * Checkout with Stripe to checkout with your credit or debit card, or checkout with Coinbase
                            to checkout with your favorite crypto.
                        </p>

                        <div className={`${isFilledOut ? '' : 'pointer-events-none'}`}>
                            <Button
                                onClick={() => {
                                    createOrder()
                                }}
                                className='font-win-bold'>
                                Checkout with Stripe (Fiat)
                            </Button>
                            <Button className='font-win-bold'>Checkout with Coinbase (Crypto)</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
