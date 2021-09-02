// Load API
const searchButton = () => {
    const searchField = document.getElementById('search-field')
    const errorMessage = document.getElementById('error')
    errorMessage.innerHTML = '';
    const searchFieldText = searchField.value;
    searchField.value = '';
    // Empty string error handle
    if (searchFieldText.length > 0) {
        fetch(`https://openlibrary.org/search.json?q=${searchFieldText}`) // API link
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    } else {
        errorMessage.innerHTML = `
            <p class="text-center bg-warning w-25 mx-auto mt-3 p-2">Please Enter a Valid Name</p>
        `
    }
}
// Display search result
const displaySearchResult = books => {
    const card = document.getElementById('card');
    const count = document.getElementById('count')
    const errorHandle = document.getElementById('error-message')
    errorHandle.innerHTML = '';
    const showBookNumber = books.docs.length;
    const totalBookCount = books.numFound;
    count.innerHTML = `<h6 class="text-danger my-3 text-center">Showing Books: ${showBookNumber} / ${totalBookCount}</h6>`;
    card.textContent = '';
    // Not found error handle
    if (books.docs.length === 0) {
        errorHandle.innerHTML = `
            <h5 class="text-center mt-5">Sorry!! Your Search Result is Not Found :(</h5>
       `
    }
    else {
        books.docs.forEach(book => {
            const createDiv = document.createElement('div')
            createDiv.classList.add('col')
            createDiv.innerHTML = `
            <div class="card-group h-100">
               <div class="card">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid mx-auto w-75 h-75 mx-auto mt-3" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text"><b>Author:</b> ${book.author_name}</p>
                        <p class="card-text"><b>Publisher:</b> ${book.publisher}</p>
                        <p class="card-text"><b>First-Publish:</b> ${book.first_publish_year}</p>
                    </div>
            </div>
        `
            card.appendChild(createDiv)
        })
    }
}