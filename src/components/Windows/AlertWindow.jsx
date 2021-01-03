import R from 'random'
import Window from './Window'
import Topbar from './Topbar'
import { useEffect } from 'react'

export default function AlertWindow({ alert, setAlert, title, close, desktopRef }) {
    if (!alert) return <></>
    return (
        <div
            className={`right-0  z-50 w-full md:w-1/2 space-y-1 border-emboss absolute flex flex-col pointer-events-auto bg-win-gray p-1`}>
            <Topbar title={alert?.title} maximize={() => setAlert(alert)} close={() => setAlert(null)} />
            <div className='bg-white border-emboss-invert h-full p-3 overflow-auto'>{alert?.message}</div>
        </div>
    )
}
