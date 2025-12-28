import { useParams } from "react-router-dom"

export const Component = () => {
    const { address } = useParams()
    return(
        <>
        <p className='text-white'>Portfolio {address}</p>
        </>
    )
}