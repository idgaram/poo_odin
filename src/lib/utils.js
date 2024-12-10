import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function Book(title, author, pageCount, isRead) {
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

export function addBookToLibrary(library, title, author, pageCount, isRead) {
  const newBook = new Book(title, author, pageCount, isRead);
  library((prevLibrary) => [...prevLibrary, newBook]);
}

export const toggleDarkMode = (setThemeState, isDarkMode) => {
  setThemeState((prev) => !prev);
  if (!isDarkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};
