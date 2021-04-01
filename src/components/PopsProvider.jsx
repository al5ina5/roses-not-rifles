import shortid from "shortid";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Window from "./Windows/Window";
import Modal from "./Modal";
import Alert from "./Alert";

const PopsContext = createContext({});

export default function PopsProvider({ children }) {
    const test = {
        id: "123123",
        title: "Test!",
        children: <p>React</p>,
    };

    const [pops, setPops] = useState([]);

    const popRefs = useRef();

    const windows = pops.filter((pop) => pop.type === "window");

    const triggerAlert = (data) => {
        setAlert({ ...data });

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    const removeWindow = (wid) =>
        setPops((_) => _.filter((results) => results.id !== wid));

    const createWindow = (props) => {
        const id = shortid.generate();

        const newWindow = {
            type: "window",
            id,
            ...props,
        };

        setPops([...pops, newWindow]);
    };

    const createModal = (title, subtitle, children) => {
        const id = shortid.generate();

        const newWindow = {
            type: "modal",
            id,
            title,
            subtitle,
            children,
        };

        setPops([...pops, newWindow]);
    };

    const createAlert = (title, subtitle) => {
        const id = shortid.generate();

        const newWindow = {
            type: "alert",
            id,
            title,
            date: Date.now(),
            subtitle,
        };

        console.log(`Creating alert ${newWindow.id}`);
        setPops([...pops, newWindow]);

        setTimeout(() => removeWindow(newWindow.id), 3000);
    };

    return (
        <PopsContext.Provider
            value={{
                windows,
                pops,
                setPops,
                popRefs,
                removeWindow,
                createWindow,
                createModal,
                createAlert,
            }}
        >
            <div
                ref={popRefs}
                className="absolute z-50 top-0 right-0 p-6 space-y-6"
            >
                {pops.map((window, index) => {
                    if (window.type == "alert")
                        return (
                            <Alert
                                date={window.date}
                                hide={() => removeWindow(window.id)}
                                key={window.id}
                                title={window.title}
                                subtitle={window.subtitle}
                            />
                        );
                    return null;
                })}
            </div>
            {pops.map((window, index) => {
                if (window.type == "modal")
                    return (
                        <Modal
                            visible={true}
                            hide={() => removeWindow(window.id)}
                            key={window.id}
                        >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="font-medium">
                                        {window.title}
                                    </p>
                                    <p className="text-xs">{window.title}</p>
                                </div>
                                {window.children}
                            </div>
                        </Modal>
                    );
                if (window.type == "window")
                    return (
                        <Window
                            ref={(ref) => (popRefs.current[window.id] = ref)}
                            fullScreen={window.fullscreen}
                            key={window.id}
                            title={window.title}
                            offset={25}
                            close={() => removeWindow(window.id)}
                        >
                            {window.children}
                        </Window>
                    );
            })}
            {children}
        </PopsContext.Provider>
    );
}

export const usePopups = () => useContext(PopsContext);
