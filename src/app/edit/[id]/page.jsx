"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const page = () => {
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [sentStatus, setSentStatus] = useState(false);

  const pathName = usePathname();
  const id = pathName.split("/")[2];

  const router = useRouter();

  useEffect(() => {
    fetch(`https://task-api-0t4e.onrender.com/api/todos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data.data);
        setTodo(data.data[0]);
        setTitle(data.data[0].title);
        setIsCompleted(data.data[0].isCompleted);
      })
      .catch((err) => console.log("Something went wrong: ", err));
  }, []);

  const sendTodo = (e) => {
    e.preventDefault();

    const todo = { title: title, isCompleted: isCompleted };
    console.log(todo);

    fetch(`https://task-api-0t4e.onrender.com/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSentStatus(true);

        setTimeout(() => router.push("/"), 1000);
      })
      .catch((err) => console.log(err));
  };

  console.log("isCompleted: ", isCompleted);
  return (
    <div className="flex justify-center  pt-12">
      {todo && (
        <form
          className="w-[80%] max-w-[40rem] border border-gray-200 rounded-md shadow-md py-12 flex flex-col items-center"
          onSubmit={sendTodo}
        >
          <input
            type="text"
            placeholder={todo.title}
            className="px-2 py-1 block w-96 border border-gray-300 focus:outline rounded-sm mb-2"
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <input
              type="checkbox"
              id="isCompleted"
              value={isCompleted}
              onChange={() => {
                setIsCompleted((isCompleted) => !isCompleted);
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
              complete
            </label>
          </div>
          <button className="block w-fit mx-auto mt-10 px-4 py-1 bg-green-500 rounded-sm text-white text-lg hover:shadow-md">
            Save
          </button>
          {sentStatus && (
            <p className="text-center text-green-500 mt-1 mb-2 text-sm">
              Todo updated.
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default page;
