"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [todos, setTodos] = useState(null);
  // const [isTodosReady]

  // const dummyTodos = [
  //   {
  //     title: "Wash clothes",
  //     isCompleted: true,
  //   },
  //   {
  //     title: "Cook food",
  //     isCompleted: false,
  //   },
  //   {
  //     title: "Play games",
  //     isCompleted: false,
  //   },
  //   {
  //     title: "Do NYSC",
  //     isCompleted: true,
  //   },
  // ];

  useEffect(() => {
    fetch("http://localhost:8080/api/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data.data);
      })
      .catch((err) => console.log("Something went wrong: ", err));
  }, []);

  return (
    <div className="flex justify-center pt-12">
      <div className="w-[80%] max-w-[40rem] border border-gray-200 rounded-md shadow-md py-6">
        <h1 className="mb-6 text-center text-2xl text-gray-700">Todo</h1>
        <div className="flex flex-col gap-2 px-1 text-gray-700">
          {todos ? (
            todos.map((todo, index) => (
              <div
                key={index}
                className="flex justify-between hover:bg-gray-100 rounded-sm px-2 py-1"
              >
                <div className="flex gap-1">
                  {todo.isCompleted ? (
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
                  <p>{todo.title}</p>
                </div>
                <div className="flex gap-1">
                  {/* Edit icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>

                  {/* Delete Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center h-[20vh] flex justify-center items-center text-lg text-gray-500">
              Getting todos...
            </p>
          )}
        </div>
        <Link
          href={"/add"}
          className="block w-fit mx-auto mt-10 px-4 py-1 bg-green-500 rounded-sm text-white text-lg hover:shadow-md"
        >
          Add Todo
        </Link>
      </div>
    </div>
  );
}
