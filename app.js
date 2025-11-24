const booksContainer = document.getElementById("books");
const filterAuthor = document.getElementById("filterAuthor");

let currentBooks = [];

async function searchBooks() {
  const query = document.getElementById("searchInput").value;
  if (!query) {
    alert("Please enter a search term!");
    return;
  }

  booksContainer.innerHTML = "<p>Loading...</p>";
  filterAuthor.innerHTML = `<option value="">All Authors</option>`; // Reset author filter

  const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=20`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      booksContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    currentBooks = data.items;
    populateAuthors(currentBooks);
    displayBooks(currentBooks);
  } catch (error) {
    booksContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    console.error(error);
  }
}

function populateAuthors(books) {
  const authorsSet = new Set();
  books.forEach((item) => {
    if (item.volumeInfo.authors) {
      item.volumeInfo.authors.forEach((a) => authorsSet.add(a));
    }
  });

  authorsSet.forEach((author) => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    filterAuthor.appendChild(option);
  });
}

filterAuthor.addEventListener("change", () => {
  const author = filterAuthor.value;
  if (author === "") displayBooks(currentBooks);
  else {
    const filtered = currentBooks.filter(
      (item) =>
        item.volumeInfo.authors && item.volumeInfo.authors.includes(author)
    );
    displayBooks(filtered);
  }
});

function displayBooks(books) {
  booksContainer.innerHTML = "";
  books.forEach((item) => {
    const book = item.volumeInfo;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h3>${book.title || "No Title"}</h3>
            <p><strong>Author:</strong> ${
              book.authors ? book.authors.join(", ") : "Unknown"
            }</p>
            <p><strong>Published:</strong> ${book.publishedDate || "N/A"}</p>
            <a href="${book.previewLink}" target="_blank">Preview Book</a>
        `;
    booksContainer.appendChild(card);
  });
}

