import { useState } from 'react'
import Button from '../Button'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const ready = name && email && subject && message

    return (
        <>
            <form className='p-1' action=''>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='block w-full p-1 border-emboss-invert'
                    placeholder='Your Name *'
                    type='text'
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full p-1 border-emboss-invert'
                    placeholder='Your Email *'
                    type='text'
                />
                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className='block w-full p-1 border-emboss-invert'
                    placeholder='Message Subject *'
                    type='text'
                />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='block w-full p-1 border-emboss-invert'
                    placeholder='Message'
                    type='text'
                />
                <div className='p-1'>
                    <Button className='opacity50 w-full'>Send Message</Button>
                </div>
            </form>
        </>
    )
}
