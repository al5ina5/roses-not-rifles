import R from 'random'
import Window from './Window'

export default function StreamWindow({ close, desktopRef }) {
    return (
        <Window title='The Stream' offset={50} close={close} desktopRef={desktopRef}>
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {new Array(100).fill(100).map(() => (
                    <>
                        <div
                            className='p-2 border-emboss square bg-cover bg-center'
                            style={{
                                backgroundImage: `url(https://source.unsplash.com/random/${R.int(1, 999999)})`
                            }}></div>
                    </>
                ))}
            </div> */}
        </Window>
    )
}
