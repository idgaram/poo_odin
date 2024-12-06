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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "296 pages", false);

// console.log(Object.getPrototypeOf(theHobbit));
console.log(theHobbit.valueOf());
