import axios from "axios";
import { Children, useEffect, useMemo, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import Button from "../Button";
import Pusher from "pusher-js";
import { Virtuoso } from "react-virtuoso";
import dayjs from "dayjs";
import shortid from "shortid";
import Cookies from "js-cookie";

export default function ShoutBox() {
    const [identity, setIdentity] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const appendInterval = useRef(null);
    const virtuosoRef = useRef(null);
    const [atBottom, setAtBottom] = useState(false);
    const showButtonTimeoutRef = useRef(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        return () => {
            clearInterval(appendInterval.current);
            clearTimeout(showButtonTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        clearTimeout(showButtonTimeoutRef.current);
        if (!atBottom) {
            showButtonTimeoutRef.current = setTimeout(
                () => setShowButton(true),
                500
            );
        } else {
            setShowButton(false);
        }
    }, [atBottom, setShowButton]);

    const createIdentity = (name) => {
        const identity = {
            id: shortid.generate(),
            name,
        };

        setIdentity(identity);
        Cookies.set("shoutbox_identity", JSON.stringify(identity));
    };

    const loadIdentity = () => {
        const identityCookie = Cookies.get("shoutbox_identity");

        try {
            const parsed = JSON.parse(identityCookie);
            setIdentity(parsed);
            return parsed;
        } catch (e) {
            return null;
        }
    };
    useEffect(() => loadIdentity(), []);

    useEffect(() => setMessage((message) => message.slice(0, 240)), [message]);

    const messagesRef = useRef();

    const { data: messages, mutate, error } = useSWR("/api/shoutbox/messages");

    const scrollToBottom = () => {
        virtuosoRef.current.scrollToIndex({
            index: messages.length - 1,
            behavior: "smooth",
        });
    };

    const sendMessage = async (content, author) => {
        const newMessage = {
            content,
            author: identity,
            date: Date.now(),
        };

        setLoading(true);
        await axios
            .post("/api/shoutbox/send", newMessage)
            .then(async (res) => {
                await mutate((data) => [...data, newMessage]);
                scrollToBottom();
                setMessage("");
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    };

    useEffect(() => {
        var pusher = new Pusher("b6f336423875ed9dee89", {
            cluster: "us2",
        });

        var channel = pusher.subscribe("shoutbox");
        channel.bind("new-message", async (message) => {
            await mutate((data) => [...data, message]);
            if (!showButton) scrollToBottom();
        });

        return () => channel.unsubscribe();
    }, [showButton]);

    if (error) return <p>An error occurred. :(</p>;
    if (!messages) return <p>Loading...</p>;
    return (
        <div className="relative bg-win-gray p-6 border-emboss space-y-4">
            {!identity && (
                <div className="absolute inset-0 bg-win-gray z-30 flex items-center justify-center p-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createIdentity(nameInput);
                        }}
                        className="space-y-2"
                    >
                        <p>Enter a nickname to chat:</p>
                        <input
                            maxLength={30}
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="block w-full p-1 border-emboss-invert"
                            placeholder="Enter a message"
                            type="text"
                        />
                        <Button disabled={!nameInput}>Let's go!</Button>
                    </form>
                </div>
            )}

            <div>
                <p className="text-xs">
                    {identity.name} {identity.id}
                </p>
            </div>

            <Virtuoso
                style={{ height: "400px" }}
                ref={virtuosoRef}
                data={messages}
                itemContent={(index, message) => {
                    const isMe = message?.author?.id == identity.id;
                    return (
                        <div
                            className={`flex flex-col mb-4 ${
                                isMe && "items-end text-gray-600"
                            }`}
                        >
                            <div className="flex flex-row items-center space-x-2">
                                <p className="text-xs">{message.author.name}</p>
                                <p className="text-xxs">
                                    {dayjs(message.date).format("h:mm:ss A")}
                                </p>
                            </div>
                            <p>{message.content}</p>
                        </div>
                    );
                }}
                atBottomStateChange={(atBottom) => {
                    clearInterval(appendInterval.current);
                    if (atBottom) {
                        appendInterval.current = setInterval(() => {
                            // console.log("appending items");
                            // setTotal(total + 3)
                        }, 200);
                    }
                    setAtBottom(atBottom);
                }}
            />

            <div className="space-y-2">
                <div className="text-xs flex flex-row items-center">
                    <p className="flex-1">
                        {showButton && (
                            <span
                                className="hover:underline"
                                onClick={() =>
                                    virtuosoRef.current.scrollToIndex({
                                        index: messages.length - 1,
                                        behavior: "smooth",
                                    })
                                }
                            >
                                Bottom
                            </span>
                        )}
                    </p>
                    <p>{message.length} / 240</p>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(message, identity.name);
                    }}
                    className="flex flex-row"
                >
                    <input
                        maxLength={240}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full p-1 border-emboss-invert"
                        placeholder="Enter a message"
                        type="text"
                    />
                    <Button className="whitespace-nowrap" loading={loading}>
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
}
