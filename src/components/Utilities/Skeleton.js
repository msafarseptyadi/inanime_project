export default function SkeletonCard(){
    return (
    <div className="flex flex-row bg-gray-200 rounded-lg animate-pulse h-230px md:h-[265px] min-w-[300px] md:min-w-[370px] overflow-hidden">
        <div className="w-[120px] md:w-[185px] bg-gray-300" />
        <div className="flex-1 p-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
    </div>
    );
}