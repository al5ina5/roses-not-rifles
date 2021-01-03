import { useEffect } from 'react'
import Axios from 'axios'

export const fetcher = (url) =>
    Axios.get(url, {
        config: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }).then((res) => res.data)

export function useOutsideAlerter(ref, exec) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) exec(event)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}
