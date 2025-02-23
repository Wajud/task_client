"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [sentStatus, setSentStatus] = useState(false);
  // console.log(isCompleted);
  const router = useRouter();

  const sendTodo = (e) => {
    e.preventDefault();
    if (!title) {
      setTitleError(true);
      setTimeout(() => setTitleError(false), 2000);
      return;
    }
    const todo = { title, isCompleted };
    fetch("https://task-api-0t4e.onrender.com/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data), setSentStatus(true);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-center  pt-12">
      <form
        className="w-[80%] max-w-[40rem] border border-gray-200 rounded-md shadow-md py-12 flex flex-col items-center"
        onSubmit={sendTodo}
      >
        <input
          type="text"
          placeholder="Title"
          className="px-2 py-1 block w-96 border border-gray-300 focus:outline rounded-sm mb-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && (
          <p className="text-center text-red-500 -mt-2 mb-2">
            Todo title must be set
          </p>
        )}
        <div>
          <input
            type="checkbox"
            id="isCompleted"
            value={isCompleted}
            onChange={() => {
              setIsCompleted((isCompleted) => !isCompleted);
              console.log("isCompleted: ", isCompleted);
            }}
            className="mb-2 hidden"
          />
          <label htmlFor="isCompleted" className="flex gap-1 text-blue-500">
            {" "}
            {isCompleted ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="4"
                  stroke="#4561ed"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M6 12L10 16L18 8"
                  stroke="#4561ed"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="4"
                  stroke="#4561ed"
                  strokeWidth="2"
                />
              </svg>
            )}
            completed
          </label>
        </div>
        <button className="block w-fit mx-auto mt-10 px-4 py-1 bg-green-500 rounded-sm text-white text-lg hover:shadow-md">
          Add
        </button>
        {sentStatus && (
          <p className="text-center text-green-500 mb-2">
            Todo successfully sent.
          </p>
        )}
      </form>
    </div>
  );
};

export default page;
