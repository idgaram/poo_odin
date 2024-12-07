"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const myLibrary = [];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.info = () => {
      return `${title} by ${author}, ${pageCount}, ${
        isRead ? "read" : "not read yet"
      }`;
    };
  }

  function addBookToLibrary(title, author, pageCount, isRead) {
    const newBook = new Book(title, author, pageCount, isRead);
    myLibrary.push(newBook);
  }

  // // const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "296 pages", false);

  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "296 pages", false);
  addBookToLibrary("The Hobbit 2", "J.R.R. Tolkien", "296 pages", false);
  addBookToLibrary("The Hobbit 3", "J.R.R. Tolkien", "296 pages", false);
  // // console.log(Object.getPrototypeOf(theHobbit));
  // // console.log(myLibrary);

  return (
    <div className="flex flex-col max-w-[50%] mx-auto items-center justify-center mt-20">
      {/* {console.log(myLibrary)}
      {myLibrary.map((book) => {
        console.log(book.title);
      })} */}
      <h1 className="my-20 text-4xl font-sans">my library</h1>
      {myLibrary.map((book) => (
        <Card key={book.title} className="p-4 m-4 w-[70%]">
          <div>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.pageCount}</p>
            <p>{book.isRead ? "read" : "not read"}</p>
          </div>
        </Card>
      ))}
      <button onClick={toggleDarkMode} className="p-2 border">
        Toggle {isDarkMode ? "light" : "dark"} mode
      </button>
    </div>
  );
}
