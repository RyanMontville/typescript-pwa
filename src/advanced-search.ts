import { initializeApp, getYear, scrollAnimation } from "./main.js";

const main = document.querySelector('main') as HTMLElement;

initializeApp("search", "search", true).then(() => {

    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    main.classList.remove('hide');
    scrollAnimation(true);
})