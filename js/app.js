const searchButton = () => {
    const searchField = document.getElementById('search-field')
    const errorMessage = document.getElementById('error')
    errorMessage.innerHTML = '';
    const searchFieldText = searchField.value;
    searchField.value = '';

    if (searchFieldText.length > 0) {
        fetch(`https://openlibrary.org/search.json?q=${searchFieldText}`)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    } else {
        errorMessage.innerHTML = `
            <p class="text-center bg-warning w-25 mx-auto mt-3 p-2">Please Enter a Valid Name</p>
        `
    }

    // fetch(`http://openlibrary.org/search.json?q=${searchFieldText}`)
    //     .then(res => res.json())
    //     .then(data => displaySearchResult(data.docs))
}

const displaySearchResult = books => {
    const card = document.getElementById('card');
    const count = document.getElementById('count')
    const errorHandle = document.getElementById('error-message')
    errorHandle.innerHTML = '';
    const showBookNum = books.docs.length;
    const totalBook = books.numFound;
    count.innerHTML = `<h6 class="text-danger my-3 text-center">Total Founded Book: ${showBookNum} / ${totalBook}</h6>`;
    card.textContent = '';
    if (books.docs.length === 0) {
        errorHandle.innerHTML = `
            <h5 class="text-center mt-5">Your Search Result is Not Found.</h5>
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