import Product from '../../Shop/Product'
import Button from '../../Button'

export default function CartTab({ close, desktopRef }) {
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
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Name'
                                    type='text'
                                />
                                <input
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Email'
                                    type='text'
                                />
                                <input
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Your Phone Number'
                                    type='text'
                                />
                                <textarea
                                    className='block w-full p-1 border-emboss-invert'
                                    placeholder='Order notes (optional)'
                                    type='text'
                                />
                            </div>

                            <p className='text-xs opacity-50'>
                                * Checkout with Stripe to checkout with your credit or debit card, or checkout with
                                Coinbase to checkout with your favorite crypto.
                            </p>

                            <div className='buttons'>
                                <Button className='font-win-bold'>Checkout with Stripe (Fiat)</Button>
                                <Button className='font-win-bold'>Checkout with Coinbase (Crypto)</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
