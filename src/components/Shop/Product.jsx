import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../Button";
import arraysEqual from "array-equal";
import ShopContext from "../../context/ShopContext";
import shortid from "shortid";
import { usePopups } from "../PopsProvider";

export default function Product({ id, name, price, img, product, attributes }) {
    const { data: variations, error } = useSWR(`/api/products/variants/${id}`);

    const [selectedVariation, setSelectedVariation] = useState(null);

    const { createAlert } = usePopups();

    const { state, dispatch } = useContext(ShopContext);

    const outOfStock = selectedVariation?.stock_quantity <= 0;
    const disabled = !selectedVariation || outOfStock;

    return (
        <>
            <div className=" bg-win-gray p-8 border-emboss rounded gap-8 grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <img src={img} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="space-y-4">
                        <p className="text-2xl font-win-bold">{name}</p>

                        <div>
                            {variations?.map((variation, index) => (
                                <Button
                                    key={index}
                                    onClick={(e) =>
                                        setSelectedVariation(variation)
                                    }
                                >
                                    {variation.attributes.map(
                                        (attribute, index) => (
                                            <span
                                                key={index}
                                                className={
                                                    selectedVariation?.id ==
                                                    variation.id
                                                        ? "font-win-bold"
                                                        : ""
                                                }
                                            >
                                                {attribute.option}
                                            </span>
                                        )
                                    )}
                                </Button>
                            ))}
                        </div>

                        <p className="text-lg font-win-bold">${price}</p>

                        <p
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        ></p>

                        {selectedVariation && (
                            <>
                                <p className="text-xs font-win-bold">
                                    Stock: {selectedVariation?.stock_quantity}{" "}
                                    {outOfStock && (
                                        <span className="font-win">
                                            Out of stock
                                        </span>
                                    )}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="flex mt-auto">
                        <Button
                            disabled={disabled}
                            onClick={() => {
                                dispatch({
                                    type: "cart.add",
                                    payload: {
                                        id: shortid.generate(),
                                        product_id: parseInt(id),
                                        variation_id: parseInt(
                                            selectedVariation.id
                                        ),
                                        quantity: 1,
                                        name: name,
                                        data: selectedVariation,
                                    },
                                });
                                createAlert(
                                    "Product added to cart",
                                    `${name} was added to your cart.`
                                );
                            }}
                            className="ml-auto"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
