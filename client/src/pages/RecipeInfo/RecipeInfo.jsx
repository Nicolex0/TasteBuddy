import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaClock,
  FaUtensils,
  FaUsers,
  FaStar,
  FaBookmark,
} from "react-icons/fa";

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(4.5);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      author: "John Doe",
      text: "Great recipe! I loved how easy it was to follow.",
    },
    {
      author: "Jane Smith",
      text: "Delicious! I added some extra herbs and it turned out amazing.",
    },
  ]);

  useEffect(() => {
    // Fetch the recipe data based on the recipeId
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/recipes/${recipeId}`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { author: "You", text: comment }]);
      setComment("");
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-8">
            <div className="text-center mb-8">
              <img
                src={recipe.chefImage}
                alt={recipe.chefName}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg object-cover"
              />
              <h1 className="text-4xl font-bold text-gray-800 mb-2 font-serif">
                {recipe.title}
              </h1>
              <p className="text-xl text-gray-600 italic font-light">
                by {recipe.chefName}
              </p>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex justify-around text-sm text-gray-600 mb-8 bg-gray-100 py-6 rounded-lg shadow-inner">
              <div className="flex flex-col items-center">
                <FaClock className="text-2xl mb-2 text-blue-500" />
                <span className="font-semibold">{recipe.prepTime}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUtensils className="text-2xl mb-2 text-green-500" />
                <span className="font-semibold">{recipe.dietType}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUsers className="text-2xl mb-2 text-purple-500" />
                <span className="font-semibold">
                  {recipe.number_of_people_served} Serves
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-300 pb-2">
                Ingredients
              </h2>
              <p className="text-gray-600 text-lg whitespace-pre-line">
                {recipe.ingredients}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-green-300 pb-2">
                Instructions
              </h2>
              <p className="text-gray-600 text-lg whitespace-pre-line">
                {recipe.instructions}
              </p>
            </div>

            <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Country of Origin
              </h2>
              <p className="text-xl text-gray-600 italic">
                {recipe.countryOfOrigin || "Not specified"}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Rating
              </h2>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-yellow-500 mr-2">
                  {rating.toFixed(1)}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-2xl ${
                        star <= Math.floor(rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-gray-50 p-8 border-l border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-gray-700 mr-2">
                  Rate:
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer text-2xl transition-colors duration-200 ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-300`}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
            </div>
            <button
              className={`${
                isBookmarked ? "bg-blue-600" : "bg-blue-500"
              } text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center w-full mb-8 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
              onClick={handleBookmark}
            >
              <FaBookmark className="mr-2" />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Comments
            </h2>
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-800 font-semibold mb-1">
                    {comment.author}
                  </p>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              ))}
            </div>
            <form className="mt-6" onSubmit={handleSubmitComment}>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                rows="4"
                placeholder="Add your comment..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button
                type="submit"
                className="mt-3 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 w-full transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
