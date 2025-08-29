import React from "react";

const Home = ({ user, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center">
        {user ? (
          <>
            <h1 className="text-4xl font-bold">Welcome, {user.username}!</h1>
            <p className="mt-4 text-lg">You are now authenticated. Go to My Tasks to manage your to-do list.</p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">Welcome to the Todo App</h1>
            <p className="mt-4 text-lg">Please register or log in to manage your tasks.</p>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;