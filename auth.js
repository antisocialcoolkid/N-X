const SUPABASE_URL =
"https://asgowauvzfnsszstvzqi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_scsteNa_ILseeQYkL1Olyg_38UMGSZS";

const supabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const form =
document.getElementById("registerForm");

const message =
document.getElementById("message");


if (!form) {

    console.error(
        "No se encontró registerForm"
    );

} else {

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            message.textContent =
            "Conectando...";


            const username =
            document
            .getElementById("username")
            .value
            .trim()
            .toLowerCase();


            const email =
            document
            .getElementById("email")
            .value
            .trim();


            const password =
            document
            .getElementById("password")
            .value;


            try {

                const {
                    data,
                    error
                } =
                await supabase.auth.signUp({

                    email:
                    email,

                    password:
                    password,

                    options: {

                        data: {

                            username:
                            username

                        }

                    }

                });


                if (error) {

                    throw error;

                }


                if (!data.user) {

                    message.textContent =
                    "Revisa tu correo para confirmar la cuenta.";

                    return;

                }


                message.textContent =
                "✓ Cuenta creada";


                setTimeout(
                    function() {

                        window.location.href =
                        "profile.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(error);

                message.textContent =
                "ERROR: " +
                error.message;

            }

        }
    );

}
