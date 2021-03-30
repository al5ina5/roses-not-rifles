import shortid from "shortid";
import { createContext, useContext, useState } from "react";
import Window from "./Windows/Window";
import Modal from "./Modal";

const PopsContext = createContext({});

export default function PopsProvider({ children }) {
    const test = {
        id: "123123",
        title: "Test!",
        children: <p>React</p>,
    };

    const [windows, setWindows] = useState([]);

    const triggerAlert = (data) => {
        setAlert({ ...data });

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    const removeWindow = (wid) =>
        setWindows(windows.filter((results) => results.id !== wid));

    const createWindow = (props) => {
        const id = shortid.generate();

        const newWindow = {
            type: "window",
            id,
            ...props,
        };

        setWindows([...windows, newWindow]);
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

        setWindows([...windows, newWindow]);
    };

    return (
        <PopsContext.Provider
            value={{
                windows,
                setWindows,
                removeWindow,
                createWindow,
                createModal,
            }}
        >
            {windows.map((window, index) => {
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
