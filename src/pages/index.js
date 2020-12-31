import { useRef, useState } from 'react'
import AppIcon from '../components/AppIcon'
import Button from '../components/Button'
import Shutdown from '../components/Shutdown'
import StartMenu from '../components/StartMenu/StartMenu'
import Taskbar from '../components/Taskbar'
import ShopWindow from '../components/Windows/ShopWindow/ShopWindow'
import StreamWindow from '../components/Windows/StreamWindow'

export default function IndexPage() {
    const desktopRef = useRef()

    const [shutdown, setShutdown] = useState(false)

    const [showStream, setShowStream] = useState(false)
    const [showShop, setShowShop] = useState(false)
    const [showStart, setShowStart] = useState(false)

    const doShutdown = () => {
        setShowStart(false)
        setShutdown(true)
    }
    return (
        <>
            {shutdown && <Shutdown setShutdown={setShutdown} />}
            <div className='flex flex-col h-full font-win'>
                <div ref={desktopRef} className='relative bg-win-blue overflow-hidden block h-full noise'>
                    <div className='apps p-4 flex flex-col'>
                        {/* <AppIcon
                            title='Kandi'
                            src='/img/win-98/help_book_computer-4.png'
                            desktopRef={desktopRef}
                            onDoubleClick={() => setShowStream((s) => !s)}
                        /> */}
                        <AppIcon
                            title='Open The Stream'
                            src='/img/win-98/help_book_computer-4.png'
                            desktopRef={desktopRef}
                            onDoubleClick={() => setShowStream((s) => !s)}
                        />

                        <AppIcon
                            title='Open The Shop'
                            src='/img/win-98/world-2.png'
                            desktopRef={desktopRef}
                            onDoubleClick={() => setShowShop((s) => !s)}
                        />
                    </div>
                    <div className='absolute pointer-events-none inset-0'>
                        {showStream && <StreamWindow close={() => setShowStream(false)} desktopRef={desktopRef} />}
                        {showShop && <ShopWindow close={() => setShowShop(false)} desktopRef={desktopRef} />}

                        {showStart && <StartMenu shutdown={doShutdown} toggle={() => setShowStart((s) => !s)} />}
                    </div>
                </div>
                <Taskbar>
                    <Button onClick={() => setShowStart((s) => !s)}>
                        <div className='flex items-center'>
                            <img className='absolute w-6' src='/img/win-98/win-98.png' alt='' />
                            <span className='pl-8  font-win-bold'>Start</span>
                        </div>
                    </Button>
                    <Button>Twitter</Button>
                    <Button>Instagram</Button>
                    <Button>YouTube</Button>
                    <Button>Behance</Button>
                </Taskbar>
            </div>
        </>
    )
}
