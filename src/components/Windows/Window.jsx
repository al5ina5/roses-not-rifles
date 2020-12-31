import { motion } from 'framer-motion'
import { Children, useEffect, useRef, useState } from 'react'
import Button from '../Button'
import { useOutsideAlerter } from '../../lib/win98'
import { full } from 'acorn-walk'
import Draggable, { DraggableCore } from 'react-draggable'
import Topbar from './Topbar'

export default function Window({ title, offset, close, taskbar, children }) {
    const [fullScreen, setFullScreen] = useState(false)
    const [top, setTop] = useState(true)

    const [dragPos, setDragPos] = useState({ x: offset, y: offset })

    const topClasses = top ? 'z-30' : 'z-20'

    const windowRef = useRef(null)
    useOutsideAlerter(windowRef, (e) => setTop(false))

    return (
        <>
            <Draggable
                axis='both'
                handle='.dragger'
                onDrag={(event, data) => {
                    if (!fullScreen) setDragPos(data)
                }}
                position={fullScreen ? { x: 0, y: 0 } : dragPos}
                grid={[25, 25]}
                scale={1}>
                <div
                    ref={windowRef}
                    onPointerDown={() => setTop(true)}
                    className={`${
                        fullScreen ? 'h-full w-full' : 'w-3/4 h-3/4'
                    } ${topClasses} space-y-1 border-emboss absolute flex flex-col pointer-events-auto bg-win-gray p-1`}>
                    <Topbar title={title} maximize={() => setFullScreen((s) => !s)} close={close} />
                    {taskbar}
                    <div className='bg-white border-emboss-invert h-full p-3 overflow-auto'>{children}</div>
                </div>
            </Draggable>
        </>
    )
}
