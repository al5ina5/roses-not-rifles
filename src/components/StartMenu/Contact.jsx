import axios from "axios";
import { useState } from "react";
import Button from "../Button";
import { usePopups } from "../PopsProvider";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const { createModal } = usePopups();

    const ready = name && email && subject && message;

    const lines = [
        `New message from the interwebs!`,
        `${name} <${email}>`,
        `Subject: ${subject}`,
        `${message}`,
    ];

    const onSubmit = async () => {
        setLoading(true);
        try {
            // await axios.post("/api/contact", { text: lines.join("\r\n") });
            createModal(
                "Message sent.",
                "Your message has been sent across the interwebs.",
                null
            );
        } catch (error) {}
        setLoading(false);
    };

    return (
        <>
            <form
                className="p-1"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full p-1 border-emboss-invert"
                    placeholder="Your Name *"
                    type="text"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-1 border-emboss-invert"
                    placeholder="Your Email *"
                    type="text"
                />
                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block w-full p-1 border-emboss-invert"
                    placeholder="Message Subject *"
                    type="text"
                />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full p-1 border-emboss-invert"
                    placeholder="Message"
                    type="text"
                />
                <div className="p-1">
                    <Button className="opacity50 w-full" loading={loading}>
                        Send Message
                    </Button>
                </div>
            </form>
        </>
    );
}
