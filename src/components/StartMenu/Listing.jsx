import { useState } from 'react'
import Button from '../Button'
import { useOutsideAlerter } from '../../lib/win98'

export function ListingButton({ onClick, children, src }) {
    return (
        <button onClick={onClick} className='flex items-center text-left w-full p-4'>
            <img className='inline-block w-8 mr-4' src={src} alt='123' />
            <span className='text-lg inline-block'>{children}</span>
            <span className='ml-auto'>&gt;</span>
        </button>
    )
}

export default function Listing({ shutdown, setActiveTab }) {
    return (
        <>
            <ListingButton onClick={() => setActiveTab('contact')} src='/img/win-98/channels_file-2.png'>
                Contact Us
            </ListingButton>
            <ListingButton onClick={() => setActiveTab('about')} src='/img/win-98/computer_2-5.png'>
                About this Machine
            </ListingButton>

            <div className='py-2'>
                <div className='w-full border-emboss'></div>
            </div>

            <ListingButton onClick={shutdown} src='/img/win-98/restrict-1.png'>
                Shutdown
            </ListingButton>
        </>
    )
}
