import Product from '../../Shop/Product'
import useSWR from 'swr'

export default function ProductsTab({ close, desktopRef }) {
    const { data: products, error } = useSWR(
        `https://api.sebastianalsina.com/i/wp-json/wc/v3/products?consumer_key=ck_c3873703ef255eb3d803a6a61113c592ce752c0f&consumer_secret=cs_be6dd9734d54e9885fe006840f4a96266a38634e`
    )

    if (!products) return 'Loading...'
    if (error) return 'An error occurred... :('
    return (
        <div className='space-y-4'>
            {products.map((product, index) => (
                <Product
                    key={index}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    img={product.images?.[0].src}
                    attributes={product.attributes}
                />
            ))}
        </div>
    )
}
