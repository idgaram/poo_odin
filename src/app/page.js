"use client";
import AddBookForm from "@/components/AddBookForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addBookToLibrary, toggleDarkMode } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [myLibrary, setMyLibrary] = useState([
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      pageCount: 296,
      isRead: false,
    },
    {
      title: "The Hobbit 2",
      author: "J.R.R. Tolkien",
      pageCount: 296,
      isRead: false,
    },
  ]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // const toggleDarkMode = () => {
  //   setIsDarkMode((prev) => !prev);
  //   if (!isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // };

  // function Book(title, author, pageCount, isRead) {
  //   this.title = title;
  //   this.author = author;
  //   this.pageCount = pageCount;
  //   this.isRead = isRead;
  //   this.info = () => {
  //     return `${title} by ${author}, ${pageCount}, ${
  //       isRead ? "read" : "not read yet"
  //     }`;
  //   };
  // }

  // function addBookToLibrary(title, author, pageCount, isRead) {
  //   const newBook = new Book(title, author, pageCount, isRead);
  //   // myLibrary.push(newBook);
  //   setMyLibrary((prevLibrary) => [...prevLibrary, newBook]);
  // }
  function handleRemove(bookTitle) {
    setMyLibrary((prevItems) =>
      prevItems.filter((item) => item.title !== bookTitle)
    );
  }

  return (
    <div className="flex flex-col max-w-[50%] mx-auto items-center justify-center mt-20">
      <h1 className="my-20 text-4xl font-sans">my library</h1>
      {myLibrary.map((book) => (
        <Card key={book.title} className="p-4 m-4 w-[70%]">
          <div>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.pageCount} pages</p>
            <p>{book.isRead ? "read" : "not read"}</p>
          </div>
          <Button type="button" onClick={() => handleRemove(book.title)}>
            remove
          </Button>
        </Card>
      ))}
      {!displayForm ? (
        <Button
          type="button"
          onClick={() => setDisplayForm(true)}
          className="my-4"
        >
          add a book
        </Button>
      ) : (
        <AddBookForm
          addBookToLibrary={addBookToLibrary}
          myLibrary={myLibrary}
          setMyLibrary={setMyLibrary}
          setDisplayForm={setDisplayForm}
        />
      )}

      <Button
        type="button"
        onClick={() => toggleDarkMode(setIsDarkMode, isDarkMode)}
        className="p-2 border my-4"
      >
        Toggle {isDarkMode ? "light" : "dark"} mode
      </Button>
    </div>
  );
}
