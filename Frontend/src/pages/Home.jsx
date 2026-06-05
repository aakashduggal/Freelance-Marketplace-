import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [searchVal, setSearchVal] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchVal.trim()) {
      navigate(`/gigs?search=${encodeURIComponent(searchVal.trim())}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleTagClick = (tag) => {
    setSearchVal(tag)
    navigate(`/gigs?search=${encodeURIComponent(tag)}`)
  }

  return (
    <section className="bg-slate-900 text-white py-24 lg:py-32 relative overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-center">
      {/*1. Main Wrapper */}

      {/*2. Inner Container - Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/*3. Left Column - Text & Search*/}
        <div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Find the perfect freelance services for your business
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Many people use our platform to turn their ideas into reality.
          </p>

          {/*4. Search Bar UI*/}
          <div className="flex items-center bg-white rounded-full p-2 w-full max-w-md shadow-lg">
            <input
              className="flex-grow px-4 py-2 text-gray-900 bg-transparent outline-none"
              type="text"
              placeholder="Search for any service..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-indigo-500/30 hover:shadow-lg"
            >
              Search
            </button>
          </div>

          {/* Popular Tags */}
          <div className="mt-6 flex flex-wrap gap-3 items-center text-sm text-gray-400">
            Popular
            <span
              onClick={() => handleTagClick("Website")}
              className="border border-gray-600 rounded-full px-4 py-1 hover:bg-gray-800 transition-colors cursor-pointer text-gray-300"
            >
              Website
            </span>
            <span
              onClick={() => handleTagClick("Design")}
              className="border border-gray-600 rounded-full px-4 py-1 hover:bg-gray-800 transition-colors cursor-pointer text-gray-300"
            >
              Design
            </span>
            <span
              onClick={() => handleTagClick("Logo Design")}
              className="border border-gray-600 rounded-full px-4 py-1 hover:bg-gray-800 transition-colors cursor-pointer text-gray-300"
            >
              Logo Design
            </span>
          </div>

        </div>

        {/*Right Column*/}
        <div className="hidden lg:block relative">
          <div className="w-full h-[400px] bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">

          </div>
        </div>

      </div>

    </section>
  )
}

export default Home