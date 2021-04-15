import Product from "../../Shop/Product";
import useSWR from "swr";

export default function ProductsTab({ close, desktopRef }) {
    const { data: products, error } = useSWR(`/api/products`);

    if (error) return "An error occurred... :(";
    if (!products) return "Loading...";
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
                <Product
                    key={product.id}
                    product={product}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    img={product?.images?.[0]?.src}
                    attributes={product.attributes}
                />
            ))}
        </div>
    );
}
