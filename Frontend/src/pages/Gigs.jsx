import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import GigCard from "../components/GigCard"
import SkeletonCard from "../components/SkeletonCard"


const Gigs = () => {
    const { loading, error, sendRequest } = useFetch()
    const [gig, setGig] = useState([])

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const data = await sendRequest("http://localhost:5000/api/gigs/getGigs", {
                    method: "GET"
                })

                setGig(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchGigs()
    }, [])
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {loading ? (
                // Agar loading chal rahi hai, toh 6 skeleton cards ka grid dikhao
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SkeletonCard key={n} />
                    ))}
                </div>
            ) : (
                // Loading khatam hone par asli Gig Cards dikhao
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    {gig.map((singleGig) => (
                        <GigCard key={singleGig._id} gig={singleGig} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default Gigs