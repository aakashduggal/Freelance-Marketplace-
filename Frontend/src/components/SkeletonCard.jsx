const SkeletonCard = () => {
    return (
        // animate-pulse class isko dhak-dhak wala (shimmering) effect degi
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-gray-200"></div>
            
            {/* Content Skeleton */}
            <div className="p-5 flex flex-col gap-4">
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                
                {/* Footer Skeleton */}
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard;
