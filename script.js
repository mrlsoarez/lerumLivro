function main() {

    const form_container_events = document.querySelectorAll(".container");
    const input = document.querySelector("#input");
    const formDealer = formEvents();
    
    formDealer.renderDynamicFormEvents(form_container_events);
    formDealer.gettingFormResults(input);

}

function DOMRenderizer() {

    const main = document.querySelector("main");

    const login = (title, form, button) => {
        title.innerHTML = "<p>Faça login!</p>";
        form.innerHTML = 
        `
        <form>
            <section>
                <label for = "email">Email:</label>
                <input type = "text" name = "email">
            </section>
             <section>
                <label for = "password">Senha:</label>
                <input type = "password" name = "senha">
            </section>
            <section>
                <p>Ainda não se cadastrou? <a href = "#" class = "toggleForm">Cadastre-se!</a>
            </section>
        </form>
        `;
        button.innerHTML = "Entrar";
        button.id = "login"
    }

    const signUp = (title, form, button) => {
        title.innerHTML = `<p>Cadastre-se!</p>`
        form.innerHTML = `
        <form>
            <section>
                <label for = "email">Email:</label>
                <input type = "text" name = "email">
            </section>
             <section>
                <label for = "password">Senha:</label>
                <input type = "password" name = "password">
            </section>
            <section>
                <label for = "password2">Confirme sua senha: </label>
                <input type = "password" name = "password2">
            </section>
             <section>
                <p>Já possui conta? <a href = "#" class = "toggleForm">Faça login!</a>
            </section>
        </form>
        `;
        button.innerHTML = "Cadastrar";
        button.id = "register";
    }
    
    const library = () => {
        main.innerHTML = ""
    }
    return {login, signUp, library}
}

function formEvents() {
    function renderDynamicFormEvents(container) {
        const render = DOMRenderizer();
    
        if (container[0].className.includes("login") && container[1].className.includes("login")) {
            render.login(container[0], container[1], container[2]);
        }
        else {
            render.signUp(container[0], container[1], container[2]);
        }
    
        listenToSignUpToggle(container);
    }

    function listenToSignUpToggle(container) {
        const toggler = document.querySelector(".toggleForm");
        toggler.addEventListener("click", (e) => {
            e.preventDefault();
            for (let i = 0; i < container.length; i++) {
                if (container[i].className.includes("login")) {
                    container[i].className = container[i].className.replace("login", "signup");
                }
                else {
                    container[i].className = container[i].className.replace("signup", "login");
                }
            }
            renderDynamicFormEvents(container);
        })
    }

    function gettingFormResults(btn) {

        let URL;
    
        btn.addEventListener("click", () => {
    
            if (btn.id == "login") {
                URL = "http://localhost:3000/login"
            }
            else {
                URL = "http://localhost:3000/register"
            }
            
            const form = new FormData(document.querySelector("form"));
    
            const userData = {
                email: form.get("email"),
                password: form.get("senha")
            };
    
            let requestOptions = {
                headers: {
                    'Content-Type': 'application/json',  
                },
                method: 'POST',
                body: JSON.stringify(userData), 
                mode: "cors"
            };
    
            fetch(URL, requestOptions).then(async (response) => {
                const res = await response.json();
                if (URL.includes("login") && response.status == 200) {
                    DOMRenderizer().library()
                }
                else if (URL.includes("register") && response.status == 200) {
                    //window.location.reload()
                }
                else if (response.status == 400) {
                    alert(res.message)
                }
            })
        })
    }

    return {renderDynamicFormEvents, listenToSignUpToggle, gettingFormResults}
}







main()