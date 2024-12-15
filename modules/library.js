function main() {
    const input = document.querySelector("input");
    const body = document.querySelector(".searches");

    searchForBooks(input, body)
}

    
function DOMRenderizer() {

    const img = (url, body) => {
        const img = document.createElement("img");
        img.setAttribute("src", url);
        body.append(img);
        return img;
    }

    const form_questionary = (data) => {
        
        const form_questionary = document.querySelector(".form-questionary");

        const img = document.querySelector("#img");
        const name = document.querySelector("#name");
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");

        img.src = data.image;
        name.innerHTML = "Nome: " + data.title;
        author.innerHTML = "Author: " + data.author;
        pages.innerHTML = "Páginas: " + data.pages;

        form_questionary.classList.remove("hidden");

        addNewBook(data);
    }

    return {img, form_questionary}
}

function searchForBooks(input) {

    const render = DOMRenderizer();
    const body = document.querySelector(".searches")

    function displayBooks(query) {
    
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=AIzaSyDjmur1Uf9bpzqIa6n_ZS3fhMc-dYt_g2U`, {mode: 'cors', sameSite: "strict"})
        .then(async (response) => {
            const data = await response.json();
            data.items.forEach((item) => {
                const img = render.img(item.volumeInfo.imageLinks.smallThumbnail, body);
                interactWithBooks(img, item.volumeInfo)
            })
        })
    }

    function interactWithBooks(img, item) {

        
        const bookData = {
            image: img.src,
            title: "",
            author: "",
            pages: ""
        };

        img.addEventListener("mouseenter", () => {
            img.classList.add("scaled");
            img.style.cursor = "pointer";
        })

        img.addEventListener("mouseleave", () => {
            img.classList.remove("scaled");
        });

        img.addEventListener("click", () => {
            bookData.title = item.title;
            bookData.author = item.authors[0];
            bookData.pages = item.pageCount;
            render.form_questionary(bookData)
        })
    }


    input.addEventListener("input", (e) => {
        if (input.value.length != "") {
            displayBooks(input.value)
            body.innerHTML = ""
        }
        else {
            body.innerHTML = ""
        }   
    })

}
    

function addNewBook(data) {
    const btn = document.querySelector("#send"); 

    const URL = "http://localhost:3000/saveLibrary";

    let requestOptions = {
        headers: {
            'Content-Type': 'application/json',  
        },
        method: 'POST',
        body: JSON.stringify(data), 
        mode: "cors"
    };


    btn.addEventListener("click", () => {
        fetch(URL, requestOptions).then(async (response) => {
            const res = await response.json();
            console.log(res);
        })    
    })

}

    



main()


