import { useEffect, useState } from "react";

export default function useFetch(mediaFunction, initalDataValue, arg){
    const [data, setData] = useState(initalDataValue)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await mediaFunction(arg)
                setData(data)
            } catch {
                setError('Failed to fetch data. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [mediaFunction, arg])

    return { data, setData, isLoading, error}
}