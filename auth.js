const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";


const db =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const form =
document.getElementById(
    "loginForm"
);

const email =
document.getElementById(
    "email"
);

const password =
document.getElementById(
    "password"
);

const button =
document.getElementById(
    "loginButton"
);

const message =
document.getElementById(
    "message"
);


/* =========================
   LOGIN
========================= */

form.addEventListener(
"submit",
async function(event){

    event.preventDefault();

    event.stopPropagation();


    const emailValue =
    email.value.trim();

    const passwordValue =
    password.value;


    if(!emailValue){

        message.textContent =
        "❌ Escribe tu email.";

        return;

    }


    if(!passwordValue){

        message.textContent =
        "❌ Escribe tu contraseña.";

        return;

    }


    button.disabled =
    true;

    button.textContent =
    "Signing in...";


    message.textContent =
    "Iniciando sesión...";


    try{

        console.log(
            "Intentando login..."
        );


        const {
            data,
            error
        } =
        await db.auth.signInWithPassword({

            email:
            emailValue,

            password:
            passwordValue

        });


        console.log(
            "Supabase:",
            data,
            error
        );


        if(error){

            message.textContent =
            "❌ " +
            error.message;

            button.disabled =
            false;

            button.textContent =
            "Sign in";

            return;

        }


        if(!data.session){

            message.textContent =
            "❌ No se creó la sesión.";

            button.disabled =
            false;

            button.textContent =
            "Sign in";

            return;

        }


        message.textContent =
        "✓ Login correcto.";


        /*
           Pequeña espera para que
           Supabase guarde la sesión.
        */

        await new Promise(
            resolve =>
            setTimeout(
                resolve,
                700
            )
        );


        /*
           IMPORTANTE:
           no usamos submit ni reload.
        */

        window.location.replace(
            "profile.html"
        );

    }

    catch(error){

        console.error(
            error
        );


        message.textContent =
        "❌ " +
        error.message;


        button.disabled =
        false;

        button.textContent =
        "Sign in";

    }

});
