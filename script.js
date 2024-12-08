function main() {
    const form_container_events = document.querySelectorAll(".container");
    const input = document.querySelector("#input");

    renderDynamicFormEvents(form_container_events);
    gettingFormResults(input);
}

function DOMRenderizer() {
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
    }

    return {login, signUp}
}

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
    btn.addEventListener("click", () => {

        const form = new FormData(document.querySelector("form"));
        console.log(form)
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


        /* register */
        /*
        fetch('http://localhost:3000/register', requestOptions).then(async (response) => {
         
                })

        */
        // login
        fetch('http://localhost:3000/login', requestOptions).then(async (response) => {
            if (response.status == 400) {
                alert("Login mal sucedido!");
                return;
            }
            alert("Login feito com sucesso!!")
        })
    })
}

main()