import { initializeApp, scrollAnimation } from "./main";

initializeApp("F.A.Q.", "F.A.Q.", true).then(() => {
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    const main = document.querySelector('main');
    if (main) main.classList.remove('hide');
});