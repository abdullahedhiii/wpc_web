import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">Whoops! Not Found</h1>
      <p className="text-gray-500 mt-4">The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 text-blue-500 underline">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
