import Product from '../../Shop/Product'

export default function ProductsTab({ close, desktopRef }) {
    return (
        <div className='space-y-4'>
            {new Array(5).fill(5).map(() => (
                <>
                    <Product />
                </>
            ))}
        </div>
    )
}
