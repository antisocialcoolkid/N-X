/* =========================
   NØX AUTH
========================= */

const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";


/* =========================
   SUPABASE
========================= */

const supabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================
   ELEMENTS
========================= */

const form =
document.getElementById(
    "loginForm"
);

const emailInput =
document.getElementById(
    "email"
);

const passwordInput =
document.getElementById(
    "password"
);

const message =
document.getElementById(
    "message"
);

const discordLogin =
document.getElementById(
    "discordLogin"
);


/* =========================
   CHECK FORM
========================= */

if(!form){

    console.error(
        "❌ No se encontró #loginForm"
    );

    if(message){

        message.textContent =
        "❌ No se encontró el formulario.";

    }

}


/* =========================
   LOGIN
========================= */

if(form){

    form.addEventListener(
    "submit",
    async function(event){

        event.preventDefault();


        const email =
        emailInput.value.trim();


        const password =
        passwordInput.value;


        /* VALIDATION */

        if(!email){

            showMessage(
                "❌ Escribe tu email.",
                "error"
            );

            return;

        }


        if(!password){

            showMessage(
                "❌ Escribe tu contraseña.",
                "error"
            );

            return;

        }


        /* BUTTON */

        const button =
        form.querySelector(
            'button[type="submit"]'
        );


        if(button){

            button.disabled =
            true;

            button.textContent =
            "Signing in...";

        }


        showMessage(
            "Iniciando sesión...",
            ""
        );


        try{

            const result =
            await supabase.auth.signInWithPassword({

                email:
                email,

                password:
                password

            });


            console.log(
                "LOGIN RESULT:",
                result
            );


            if(result.error){

                showMessage(
                    getAuthError(
                        result.error
                    ),
                    "error"
                );


                resetButton(
                    button
                );


                return;

            }


            if(!result.data.user){

                showMessage(
                    "❌ No se pudo obtener el usuario.",
                    "error"
                );


                resetButton(
                    button
                );


                return;

            }


            showMessage(
                "✓ Login correcto. Entrando...",
                "success"
            );


            /*
               Esperamos un momento para que
               la sesión quede guardada.
            */

            await new Promise(
                function(resolve){

                    setTimeout(
                        resolve,
                        500
                    );

                }
            );


            /*
               Comprobamos que realmente
               exista la sesión.
            */

            const sessionResult =
            await supabase.auth.getSession();


            if(
                sessionResult.error ||
                !sessionResult.data.session
            ){

                showMessage(
                    "❌ La sesión no pudo guardarse.",
                    "error"
                );


                resetButton(
                    button
                );


                return;

            }


            /*
               REDIRECCIÓN
            */

            window.location.href =
            "profile.html";


        }catch(error){

            console.error(
                "LOGIN ERROR:",
                error
            );


            showMessage(
                "❌ " +
                error.message,
                "error"
            );


            resetButton(
                button
            );

        }

    });

}


/* =========================
   DISCORD LOGIN
========================= */

if(discordLogin){

    discordLogin.addEventListener(
    "click",
    async function(){

        discordLogin.disabled =
        true;


        discordLogin.textContent =
        "Connecting...";


        try{

            const result =
            await supabase.auth.signInWithOAuth({

                provider:
                "discord",

                options:{

                    redirectTo:
                    window.location.origin +
                    "/N-X/profile.html"

                }

            });


            if(result.error){

                console.error(
                    result.error
                );


                showMessage(
                    "❌ " +
                    result.error.message,
                    "error"
                );


                discordLogin.disabled =
                false;


                discordLogin.textContent =
                "Continue with Discord";

            }

        }catch(error){

            console.error(
                error
            );


            showMessage(
                "❌ " +
                error.message,
                "error"
            );


            discordLogin.disabled =
            false;


            discordLogin.textContent =
            "Continue with Discord";

        }

    });

}


/* =========================
   AUTH ERRORS
========================= */

function getAuthError(
    error
){

    const text =
    String(
        error.message ||
        ""
    ).toLowerCase();


    if(
        text.includes(
            "invalid login credentials"
        )
    ){

        return (
            "❌ Email o contraseña incorrectos."
        );

    }


    if(
        text.includes(
            "email not confirmed"
        )
    ){

        return (
            "❌ Primero debes confirmar tu email."
        );

    }


    if(
        text.includes(
            "rate limit"
        )
    ){

        return (
            "❌ Demasiados intentos. Espera un momento y vuelve a intentar."
        );

    }


    return (
        "❌ " +
        error.message
    );

}


/* =========================
   MESSAGE
========================= */

function showMessage(
    text,
    type
){

    if(!message){

        return;

    }


    message.textContent =
    text;


    message.className =
    type || "";

}


/* =========================
   RESET BUTTON
========================= */

function resetButton(
    button
){

    if(!button){

        return;

    }


    button.disabled =
    false;


    button.textContent =
    "Sign in";

}
