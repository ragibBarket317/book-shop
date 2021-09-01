const searchButton = () => {
    const searchField = document.getElementById('search-field')
    const searchFieldText = searchField.value;
    searchField.value = '';

    fetch(`http://openlibrary.org/search.json?q=${searchFieldText}`)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}

const displaySearchResult = books => {
    const card = document.getElementById('card');
    card.textContent = '';
    books.forEach(book => {
        const createDiv = document.createElement('div')
        createDiv.classList.add('col')
        createDiv.innerHTML = `
            <div class="card-group">
               <div class="card">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-75 h-75 img-fluid mx-auto mt-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author_name}</p>
                        <div>${book.first_publish_year}</div>
                    </div>
                
            </div>
        `
        card.appendChild(createDiv)
    })
}