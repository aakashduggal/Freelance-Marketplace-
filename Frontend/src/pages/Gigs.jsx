import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import GigCard from "../components/GigCard"
import SkeletonCard from "../components/SkeletonCard"

const Gigs = () => {
    const { loading, error, sendRequest } = useFetch()
    const [gig, setGig] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    
    const search = searchParams.get("search") || ""
    const cat = searchParams.get("cat") || ""

    const [searchQuery, setSearchQuery] = useState(search)
    const [sortOrder, setSortOrder] = useState("")

    const filteredAndSortedGigs = useMemo(() => {
        let processedGigs = gig.filter((g) =>
            g.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        if (sortOrder === "asc") {
            processedGigs = processedGigs.sort((a, b) => a.price - b.price)
        }
        else if (sortOrder === "desc") {
            processedGigs = processedGigs.sort((a, b) => b.price - a.price)
        }
        return processedGigs
    }, [gig, searchQuery, sortOrder])

    // Reset local input when URL param changes and fetch new results
    useEffect(() => {
        setSearchQuery(search)
        
        const fetchGigs = async () => {
            try {
                const queryParams = new URLSearchParams()
                if (search) queryParams.append("search", search)
                if (cat) queryParams.append("cat", cat)

                const data = await sendRequest(
                    `https://freelance-marketplace-c0gx.onrender.com/api/gigs/getGigs?${queryParams.toString()}`, 
                    { method: "GET" }
                )
                setGig(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchGigs()
    }, [search, cat])

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            const newParams = {}
            if (searchQuery.trim()) {
                newParams.search = searchQuery.trim()
            }
            if (cat) {
                newParams.cat = cat
            }
            setSearchParams(newParams)
        }
    }

    return (
        <div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 px-4 max-w-7xl mx-auto">
                {/* Search Box */}
                <input
                    type="text"
                    placeholder="Search gigs... (Press Enter to search all)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                {/* Sort Dropdown */}
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>


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
                        {filteredAndSortedGigs.map((singleGig) => (
                            <GigCard key={singleGig._id} gig={singleGig} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Gigs