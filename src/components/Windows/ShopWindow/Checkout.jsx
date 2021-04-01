import Product from "../../Shop/Product";
import Button from "../../Button";
import { useContext, useState } from "react";
import ShopContext from "../../../context/ShopContext";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

export default function CheckoutTab({ close, desktopRef }) {
    const [coupon, setCoupon] = useState("");

    const { state, dispatch } = useContext(ShopContext);

    const isEmpty = state?.line_items?.length <= 0;

    const subtotal = () => {
        var total = 0;

        state?.line_items?.map((item) => {
            total = total + parseFloat(item.data.price);
            return total;
        });

        return total;
    };

    const disabled =
        !state?.first_name ||
        !state?.last_name ||
        !state?.address_1 ||
        state?.address_2 ||
        state?.phone ||
        state?.email ||
        isEmpty;

    const createOrder = (paypalID) => {
        const data = {
            payment_method: "website",
            payment_method_title: "testpayment",
            set_paid: true,
            billing: {
                first_name: state?.first_name,
                last_name: state?.last_name,
                address_1: state?.address_1,
                address_2: state?.address_2,
                city: "-",
                state: "-",
                postcode: "-",
                country: "-",
                email: state?.email,
                phone: state?.phone,
            },
            shipping: {
                first_name: state?.first_name,
                last_name: state?.last_name,
                address_1: state?.address_1,
                address_2: state?.address_2,
                city: "-",
                state: "-",
                postcode: "-",
                country: "-",
            },
            line_items: state?.line_items?.map((item) => {
                return {
                    product_id: item.product_id,
                    variation_id: item.variation_id,
                    quantity: 1,
                };
            }),
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: "10.00",
                },
            ],
            meta_data: [
                {
                    key: "paypal_id",
                    value: paypalID,
                },
            ],
        };

        console.log(data);

        Axios.post(`/api/order`, { order: data })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="h-full">
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    {isEmpty && (
                        <p className="text-xs text-gray-600">
                            Items you add to your cart will appear here!
                        </p>
                    )}
                    {!isEmpty && (
                        <div className="grid-cols-2 gap-4 hidden sm:grid">
                            {state?.line_items?.map((item, index) => (
                                <div className="bg-win-gray  border-emboss p-4 space-y-4">
                                    <img
                                        className="w-full"
                                        src={item.data.image?.src}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-4 overflow-auto">
                    <div className="bg-win-gray border-emboss p-4 space-y-4">
                        <p className="font-win-bold">Your Cart</p>

                        <p className="text-xs">
                            {isEmpty ? (
                                "No items in your cart."
                            ) : (
                                <>
                                    Your cart is filled with the{" "}
                                    <span className="underline">coolest</span>{" "}
                                    goodies.
                                </>
                            )}
                        </p>

                        {!isEmpty && (
                            <div>
                                {state?.line_items?.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex items-center border-b-2 py-1 border-dotted border-black">
                                            <div>
                                                <p className="font-win-bold">
                                                    {item.name}
                                                </p>
                                                <div className="text-xs">
                                                    {item.data.attributes.map(
                                                        (attribute, index) => (
                                                            <span>
                                                                {attribute.name}
                                                                :{" "}
                                                                {
                                                                    attribute.option
                                                                }
                                                            </span>
                                                        )
                                                    )}
                                                    {item.variation_id}
                                                </div>
                                            </div>
                                            <p className="ml-auto">
                                                {item.data.price}
                                            </p>
                                            <p className="ml-auto">
                                                <Button
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "cart.remove",
                                                            payload: item.id,
                                                        })
                                                    }
                                                    className="text-xs font-win-bold"
                                                >
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

                    <div className="bg-win-gray border-emboss p-4 space-y-4">
                        <p className="font-win-bold">Checkout</p>

                        <p>
                            Enter your details to complete and checkout your
                            order.
                        </p>

                        <form className="space-y-4" action="">
                            <div>
                                <input
                                    name="first_name"
                                    value={state?.name}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                    className="block w-full p-1 border-emboss-invert"
                                    placeholder="First Name *"
                                    type="text"
                                />
                                <input
                                    name="last_name"
                                    value={state?.name}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                    className="block w-full p-1 border-emboss-invert"
                                    placeholder="Last Name *"
                                    type="text"
                                />
                                <input
                                    name="email"
                                    value={state?.email}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                    className="block w-full p-1 border-emboss-invert"
                                    placeholder="Your Email *"
                                    type="text"
                                />
                                <input
                                    name="phone"
                                    value={state?.phone}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                    className="block w-full p-1 border-emboss-invert"
                                    placeholder="Your Phone Number *"
                                    type="text"
                                />
                                <input
                                    name="address_1"
                                    value={state?.address}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                    className="block w-full p-1 border-emboss-invert"
                                    placeholder="Shipping Address *"
                                    type="text"
                                />
                                <input
                                    name="address_2"
                                    value={state?.addressTwo}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                    className="block w-full p-1 border-emboss-invert"
                                    placeholder="Shipping Address (more)"
                                    type="text"
                                />
                                <textarea
                                    name="notes"
                                    value={state?.notes}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            payload: {
                                                key: e.target.name,
                                                value: e.target.value,
                                            },
                                        })
                                    }
                                    className="block w-full p-1 border-emboss-invert"
                                    placeholder="Order Notes"
                                    type="text"
                                />
                            </div>
                        </form>
                    </div>

                    <div className={`bg-win-gray border-emboss p-4 space-y-4`}>
                        <p className="font-win-bold">Total</p>
                        <div className="space-y-2">
                            <div className="text-xs">
                                <div className="flex items-center border-b-2 py-1 border-dotted border-black">
                                    <p className="">Subtotal</p>
                                    <p className="ml-auto">{subtotal()}</p>
                                </div>
                                <div className="flex items-center border-b-2 py-1 border-dotted border-black">
                                    <p className="">Shipping</p>
                                    <p className="ml-auto">FREE</p>
                                </div>
                                <div className="flex items-center border-b-2 py-1 border-dotted border-black">
                                    <p className="">Fees</p>
                                    <p className="ml-auto">FREE</p>
                                </div>
                            </div>
                            <div className="font-win-bold flex items-center border-b-2 py-1 border-dotted border-black">
                                <p className="">Total</p>
                                <p className="ml-auto">{subtotal()}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-win-gray border-emboss p-4 space-y-4`}>
                        <p className="text-xs">
                            * Checkout with Stripe to checkout with your credit
                            or debit card, or checkout with Coinbase to checkout
                            with your favorite crypto.
                        </p>

                        {/* <Button
                            className="font-win-bold"
                            onClick={() => createOrder("ASDJKAS")}
                        >
                            Sample Order
                        </Button> */}
                        <div
                            className={
                                disabled ? "pointer-events-none opacity-25" : ""
                            }
                        >
                            <PayPalButton
                                amount={subtotal()}
                                onSuccess={async (details, data) => {
                                    createOrder(details.orderID);
                                }}
                                catchError={(e) => alert("An error occurred.")}
                                options={{
                                    clientId:
                                        "AVi6nK4oMY5K78xyH4puUR4R7U5yTT0bbHdjB_b-Y2QreIc60NR4rbfElG8ED3CfIu_kSivCzVN52Jv2",
                                }}
                            />
                        </div>
                        {/* <Button className="font-win-bold">
                                Checkout with Coinbase (Crypto)
                            </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
