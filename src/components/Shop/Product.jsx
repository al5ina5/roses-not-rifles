import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../Button";
import arraysEqual from "array-equal";
import ShopContext from "../../context/ShopContext";
import shortid from "shortid";

export default function Product({ id, name, price, img, attributes }) {
    const { data: variations, error } = useSWR(`/api/products/variants/${id}`);

    const [selectedVariation, setSelectedVariation] = useState(null);

    const { state, dispatch } = useContext(ShopContext);

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
                                    onClick={(e) =>
                                        setSelectedVariation(variation)
                                    }
                                >
                                    {variation.attributes.map(
                                        (attribute, index) => (
                                            <span
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

                        <p>Price: {price}</p>
                        <p>
                            Laboris laborum aliquip aliqua amet consectetur
                            proident.
                        </p>
                    </div>

                    <div
                        className={`${
                            selectedVariation
                                ? "opacity-100"
                                : "opacity-25 cursor-not-allowed"
                        } flex mt-auto`}
                    >
                        <Button
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
