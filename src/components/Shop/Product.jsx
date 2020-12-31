import Button from '../Button'

export default function Product() {
    return (
        <>
            <div className=' bg-win-gray p-8 border-emboss rounded gap-8 grid grid-cols-1 sm:grid-cols-2'>
                <div>
                    <img src='/img/products/hat.png' alt='' />
                </div>
                <div className='flex flex-col'>
                    <div className='space-y-4'>
                        <p className='text-2xl font-win-bold'>Earth Lover Hat</p>

                        <form action=''>
                            <select className='border-emboss p-1 pr-12' name='' id=''>
                                <option value=''>S</option>
                                <option value=''>M</option>
                                <option value=''>L</option>
                            </select>
                        </form>
                        <p>Price: $18.99</p>
                        <p>Laboris laborum aliquip aliqua amet consectetur proident.</p>
                    </div>

                    <div className='flex mt-auto'>
                        <Button className='ml-auto'>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
