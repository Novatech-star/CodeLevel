// ========================================
// 1. RÉCUPÉRATION DES ÉLÉMENTS HTML
// ========================================

const nom = document.getElementById("name");
const email = document.getElementById("email");
const langage = document.getElementById("language");
const experience = document.getElementById("experience");

const editeur = document.querySelector(".code-editor");
const bouton = document.querySelector(".evaluate-button");

const niveau = document.querySelector(".level");
const scoreElement = document.querySelector(".score");
const message = document.querySelector(".message");


// ========================================
// 2. FONCTION D'ÉVALUATION
// ========================================

function evaluerCode(code, langageChoisi) {

    let score = 0;

    // Vérifier la longueur du code
    if (code.trim().length >= 30) {
        score += 10;
    }

    // Vérifications adaptées au langage
    switch (langageChoisi) {

        case "javascript":

            if (/\b(let|const|var)\b/.test(code)) {
                score += 20;
            }

            if (/\bif\b|\bswitch\b/.test(code)) {
                score += 20;
            }

            if (/\b(for|while|do)\b/.test(code)) {
                score += 20;
            }

            if (/\bfunction\b|=>/.test(code)) {
                score += 30;
            }

            break;


        case "python":

            if (/^\s*[a-zA-Z_]\w*\s*=/m.test(code)) {
                score += 20;
            }

            if (/\bif\b|\belif\b/.test(code)) {
                score += 20;
            }

            if (/\b(for|while)\b/.test(code)) {
                score += 20;
            }

            if (/\bdef\b/.test(code)) {
                score += 30;
            }

            break;


        case "php":

            if (/\$[a-zA-Z_]\w*/.test(code)) {
                score += 20;
            }

            if (/\bif\b|\bswitch\b/.test(code)) {
                score += 20;
            }

            if (/\b(for|while|foreach|do)\b/.test(code)) {
                score += 20;
            }

            if (/\bfunction\b/.test(code)) {
                score += 30;
            }

            break;


        case "java":

            if (/\b(int|double|float|String|boolean|var)\b/.test(code)) {
                score += 20;
            }

            if (/\bif\b|\bswitch\b/.test(code)) {
                score += 20;
            }

            if (/\b(for|while|do)\b/.test(code)) {
                score += 20;
            }

            if (/\b(public|private|protected)\b/.test(code)) {
                score += 30;
            }

            break;


        case "html":

            if (/<html\b/i.test(code)) {
                score += 20;
            }

            if (/<head\b/i.test(code) && /<body\b/i.test(code)) {
                score += 20;
            }

            if (/<(h1|h2|p)\b/i.test(code)) {
                score += 20;
            }

            if (/<(div|main|section)\b/i.test(code)) {
                score += 30;
            }

            break;


        case "css":

            if (/[a-zA-Z][\w-]*\s*\{[^}]*:[^}]*\}/.test(code)) {
                score += 20;
            }

            if (/\b(color|background-color)\s*:/.test(code)) {
                score += 20;
            }

            if (/\b(margin|padding)\s*:/.test(code)) {
                score += 20;
            }

            if (/\b(display|position|flex|grid)\s*:/.test(code)) {
                score += 30;
            }

            break;
    }

    // Limiter le score à 100
    score = Math.min(score, 100);

    // Déterminer le niveau
    let niveau;

    if (score < 25) {
        niveau = "Débutant";
    } else if (score < 50) {
        niveau = "Amateur";
    } else if (score < 75) {
        niveau = "Intermédiaire";
    } else {
        niveau = "Avancé";
    }

    return {
        score: score,
        niveau: niveau
    };
}


// ========================================
// 3. RÉACTION AU CLIC
// ========================================

bouton.addEventListener("click", function () {

    const nomUtilisateur = nom.value.trim();
    const emailUtilisateur = email.value.trim();
    const langageChoisi = langage.value;
    const anneesExperience = experience.value;
    const code = editeur.value.trim();


    // Vérifier les champs obligatoires

    if (
        nomUtilisateur === "" ||
        emailUtilisateur === "" ||
        langageChoisi === "" ||
        anneesExperience === "" ||
        code === ""
    ) {
        niveau.textContent = "Informations manquantes";

        scoreElement.textContent = "Score : -- / 100";

        message.textContent =
            "Veuillez remplir tous les champs et saisir votre code.";

        return;
    }


    // Vérifier l'expérience

    if (
        !Number.isFinite(Number(anneesExperience)) ||
        Number(anneesExperience) < 0
    ) {
        niveau.textContent = "Donnée invalide";

        scoreElement.textContent = "Score : -- / 100";

        message.textContent =
            "Veuillez saisir un nombre d'années d'expérience valide.";

        return;
    }


    // Vérifier le format de l'adresse e-mail

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUtilisateur)) {
        niveau.textContent = "E-mail invalide";

        scoreElement.textContent = "Score : -- / 100";

        message.textContent =
            "Veuillez saisir une adresse e-mail valide.";

        return;
    }


    // Analyser le code

    const resultat = evaluerCode(code, langageChoisi);


    // Afficher le résultat

    niveau.textContent = resultat.niveau;

    scoreElement.textContent =
        "Score : " + resultat.score + " / 100";

    message.textContent =
        "Bonjour " + nomUtilisateur +
        " ! Ton code en " + langageChoisi +
        " a obtenu un score indicatif de " +
        resultat.score + " points.";
});
