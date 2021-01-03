import R from 'random'
import Window from './Window'

export default function AboutWindow({ close, desktopRef }) {
    return (
        <Window title='About This Site' offset={25} close={close} desktopRef={desktopRef}>
            <div className='max-w-2xl w-full mx-auto space-y-4'>
                <p>
                    Elit labore dolor commodo magna occaecat adipisicing non. Consectetur aute esse ullamco qui
                    incididunt duis dolor sint laboris. Eu sint id Lorem incididunt officia consectetur magna deserunt
                    amet in ut. Proident proident commodo ex irure officia in laborum esse adipisicing tempor nostrud
                    ullamco laborum. Amet laborum enim pariatur enim tempor occaecat aliquip ea qui incididunt do.
                    Exercitation amet excepteur voluptate do do occaecat.
                </p>

                <p>
                    Non aliqua mollit mollit in aliqua ex reprehenderit officia irure dolore sunt mollit. Dolore
                    adipisicing non qui et magna do in quis sit et ea. Ut laboris ullamco dolor ullamco nostrud non
                    mollit eu id id do aute. Ad ullamco est magna cillum esse qui adipisicing esse duis qui dolore.
                </p>

                <p>
                    Aliqua consequat aliqua eiusmod consequat nostrud laboris tempor. Quis velit eiusmod non et. Quis
                    proident culpa enim pariatur laboris mollit eu sunt nulla culpa.s
                </p>
            </div>
        </Window>
    )
}
