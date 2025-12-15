import { useParams, Link } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white pt-24 px-4 flex flex-col items-center">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-red-600">
            Movie Detail Page
        </h1>
        
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
          <p className="text-xl text-gray-300">
            Movie ID:
          </p>
          <p className="text-4xl font-mono font-bold text-yellow-400 mt-2">
            {id}
          </p>
        </div>

        <p className="text-gray-400">
        </p>

        <Link 
          to="/" 
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MovieDetailPage;