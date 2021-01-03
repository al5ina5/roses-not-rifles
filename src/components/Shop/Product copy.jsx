import { useState } from 'react'
import useSWR from 'swr'
import Button from '../Button'
import arraysEqual from 'array-equal'

export default function Product({ id, name, price, img, attributes }) {
    const { data: variations, error } = useSWR(
        `https://api.sebastianalsina.com/i/wp-json/wc/v3/products/${id}/variations/?consumer_key=ck_c3873703ef255eb3d803a6a61113c592ce752c0f&consumer_secret=cs_be6dd9734d54e9885fe006840f4a96266a38634e`
    )

    const [selectedAttributes, setSelectedAttributes] = useState([])

    const updateOptions = (value) => {
        const copy = [...selectedAttributes]

        const clearExisting = copy.filter((selection) => selection.id !== value.id)
        clearExisting.push(value)

        setSelectedAttributes(clearExisting)

        // console.log(variations[0].attributes)
        // console.log(selectedAttributes)

        const findVariation = variations.filter((variation) => {
            console.log(variation.attributes)
            console.log(selectedAttributes)

            var arraysMatch = function (arr1, arr2) {
                // Check if the arrays are the same length
                if (arr1.length !== arr2.length) return false

                // Check if all items exist and are in the same order
                for (var i = 0; i < arr1.length; i++) {
                    if (arr1[i] !== arr2[i]) return false
                }

                // Otherwise, return true
                return true
            }

            console.log(arraysMatch(variation.attributes, selectedAttributes))

            return variation.attributes == selectedAttributes
        })
        // console.log(findVariation)
    }

    return (
        <>
            <div className=' bg-win-gray p-8 border-emboss rounded gap-8 grid grid-cols-1 sm:grid-cols-2'>
                <div>
                    <img src={img} alt='' />
                </div>
                <div className='flex flex-col'>
                    <div className='space-y-4'>
                        <p className='text-2xl font-win-bold'>{name}</p>

                        <form action=''>
                            {attributes?.map((attribute, index) => (
                                <select
                                    onChange={(e) =>
                                        updateOptions({
                                            id: attribute.id,
                                            name: attribute.name,
                                            option: e.target.value
                                        })
                                    }
                                    key={index}
                                    className='border-emboss p-1 pr-12'
                                    name=''
                                    id=''>
                                    {attribute.options.map((option, index) => (
                                        <option value={option}>{option}</option>
                                    ))}
                                </select>
                            ))}
                        </form>

                        <p>Price: {price}</p>
                        <p>Laboris laborum aliquip aliqua amet consectetur proident.</p>
                    </div>

                    <div className='flex mt-auto'>
                        <Button className='ml-auto'>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
