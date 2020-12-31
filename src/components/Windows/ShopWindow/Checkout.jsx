import Product from '../../Shop/Product'
import Button from '../../Button'
import { useState } from 'react'

export default function CheckoutTab({ close, desktopRef }) {
    const [coupon, setCoupon] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')
    const [address, setAddress] = useState('')
    const [addressTwo, setAddressTwo] = useState('')

    const isFilledOut = name && email && phone && notes && address

    return (
        <div className='h-full'>
            <div className='h-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='hidden sm:block'>
                    <div className='bg-win-gray  border-emboss p-4 space-y-4'>
                        <img
                            className='w-full'
                            src='https://media.giphy.com/media/26FeWZkCLcn4CaMRq/giphy.gif'
                            alt=''
                        />
                    </div>
                </div>

                <div className='space-y-4 overflow-auto'>
                    <div className='bg-win-gray border-emboss p-4 space-y-4'>
                        <p className='font-win-bold'>Your Cart</p>
                        <p>
                            Your cart is filled with the <span className='underline'>coolest</span> goodies.
                        </p>

                        <div>
                            {new Array(4).fill(4).map((num, index) => (
                                <div key={index}>
                                    <div className='flex items-center border-b-2 py-1 border-dotted border-black'>
                                        <p className='font-win-bold'>Cool Hat</p>
                                        <p className='ml-auto'>$18.99</p>
                                        <p className='ml-auto'>
                                            <Button className='text-xs font-win-bold'>X</Button>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='bg-win-gray border-emboss p-4 space-y-4'>
                        <p className='font-win-bold'>Coupon</p>
                        <form action=''>
                            <input
                                className='block w-full p-1 border-emboss-invert'
                                placeholder='Your Name'
                                type='text'
                            />
                        </form>
                    </div>

                    <div className='bg-win-gray border-emboss p-4 space-y-4'>
                        <p className='font-win-bold'>Checkout</p>

                        <p>Enter your details to complete and checkout your order.</p>

                        <form className='space-y-4' action=''>
                            <div>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Name *'
                                    type='text'
                                />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Email *'
                                    type='text'
                                />
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Phone Number *'
                                    type='text'
                                />
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Shipping Address *'
                                    type='text'
                                />
                                <input
                                    value={addressTwo}
                                    onChange={(e) => setAddressTwo(e.target.value)}
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Shipping Address (more)'
                                    type='text'
                                />
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
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
                                    <p className='ml-auto'>$18.99</p>
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
                                <p className='ml-auto'>$18.99</p>
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
                            <Button className='font-win-bold'>Checkout with Stripe (Fiat)</Button>
                            <Button className='font-win-bold'>Checkout with Coinbase (Crypto)</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
