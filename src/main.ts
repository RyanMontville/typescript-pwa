const years: number[] = [2023, 2024, 2025];
let year: number = 2025;
// Get the year from the url
const urlParams = new URLSearchParams(window.location.search);
const yearString: string | null = urlParams.get('year');
//Set the year
if (yearString) {
  year = isNaN(parseInt(yearString)) ? 2025 : parseInt(yearString);
}
let search: string | null = urlParams.get('search');

const bodyElem = document.querySelector('body') as HTMLElement;

export async function initializeApp(partentPage: string, currentPage: string, showSearch: boolean) {
  if (currentPage !== "") {
    //Set the page title
    document.title = `${currentPage} - Canvas Stats`;
  }
  //Wait for the DOM to load
  await new Promise<void>(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
    } else {
      resolve();
    }
  });

  if (showSearch) {
    //Load the search bar
    await loadSearch();
  }
  //Load the nav
  await loadNav();
  //Load the header
  await loadHeader(partentPage, currentPage);
  //Load the footer
  await loadFooter();
  //Load the pop ups
  await loadPopUps();
  const header = document.querySelector('header') as HTMLElement;
  const nav = document.querySelector('nav') as HTMLElement;
  const search = document.getElementById('search-group')
  header.classList.remove('hide');
  nav.classList.remove('hide');
  if (search) {
    search.classList.remove('hide');
  }


  //Set logo year image
  const logoYear = document.getElementById('logo-year') as HTMLElement;
  logoYear.setAttribute('src', `images/logo${year}.png`);

  function goToYearHomepage() {
    window.location.href = `index.html?year=${year}`
  }

  const changeYear = document.getElementById('changeYear') as HTMLElement;
  changeYear.addEventListener('click', () => {
    const changeYearPopUp = document.getElementById('changeYearPopup') as HTMLElement;
    const selectH2 = document.createElement('h2');
    selectH2.textContent = 'Select a year';
    changeYearPopUp.appendChild(selectH2);
    const yearsUl = years.reduce((acc: HTMLElement, currYear: number) => {
      if (currYear !== year) {
        const yearLi = document.createElement('li');
        const yearButton = document.createElement('button');
        yearButton.textContent = `${currYear}`;
        yearButton.addEventListener('click', () => {
          let currentUrl = window.location.href.split("?")[0];
          let urlParams = window.location.href.split("?")[1].split("&");
          urlParams.forEach((param, index) => {
            const paramPair = param.split("=");
            if (paramPair[0] === "year") {
              urlParams[index] = `year=${currYear}`;
            }
          });
          const newParams = urlParams.join("&")
          window.location.href = `${currentUrl}?${newParams}`;
        });
        yearLi.appendChild(yearButton);
        acc.appendChild(yearLi);
        return acc;
      }
      return acc;
    }, document.createElement('ul'));
    changeYearPopUp.append(yearsUl);
    const yearSelectionContainer = document.getElementById('changeYearContainer') as HTMLElement;
    yearSelectionContainer.style.display = 'flex';
  });
  
}

export function getYear() {
  return year;
}

export function doesURLContainYear() {
  return yearString !== null;
}

export function getSearchString() {
  return search;
}

export async function fetchHTML(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`${response.status}: ${response.statusText}`);
      throw new Error("Error fetching header");
    }
    return await response.text();
  } catch (error: any) {
    console.error(`Error fethcing ${url}: ${error}`);
  }
}

async function loadHeader(partentPage: string, currentPage: string) {
  try {
    //Get the header html from the header file. Using a relative path broke on GitHub pages
    const headerData = await fetchHTML('https://raw.githubusercontent.com/RyanMontville/typescript-pwa/refs/heads/main/templates/header.html');
    if (headerData) {
      //Create the header element and set the header HTML
      let header = document.createElement('header');
      header.setAttribute('class', 'hide');
      header.innerHTML = headerData;
      bodyElem.prepend(header);
    }
  } catch (error: any) {
    console.error(`Failed to load the header: ${error}`);
  }
}

async function loadNav() {
  try {
    //Get the nav HTML from the nav file
    const navData = await fetchHTML('https://raw.githubusercontent.com/RyanMontville/typescript-pwa/refs/heads/main/templates/nav.html');
    if (navData) {
      //Create the nav element and set the innner HTML
      let nav = document.createElement('nav');
      nav.setAttribute('class', 'hide');
      nav.innerHTML = navData;
      const homeLink = nav.querySelector('#home') as HTMLElement;
      homeLink.setAttribute('href', `/?year=${year}`);
      bodyElem.prepend(nav);
    }
  } catch (error) {
    console.error(`Failed to load the nav: ${error}`);
  }
}

async function loadSearch() {
  try {
    //Get the search HTML from the search file
    const searchData = await fetchHTML('https://raw.githubusercontent.com/RyanMontville/typescript-pwa/refs/heads/main/templates/search.html');
    if (searchData) {
      //Create the search container
      const searchGroup = document.createElement('form');
      searchGroup.setAttribute('class', 'search-form-group hide');
      searchGroup.setAttribute('id', 'search-group');
      searchGroup.innerHTML = searchData;
      searchGroup.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(searchGroup);
        const searchString = formData.get('serch-input');
        window.location.href = `users?search=${searchString}`;
      })
      bodyElem.prepend(searchGroup);
    }
  } catch (error) {
    console.error(`Failed to load the nav: ${error}`);
  }
}

async function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder') as HTMLElement;
  try {
    const footerData = await fetchHTML('https://raw.githubusercontent.com/RyanMontville/typescript-pwa/refs/heads/main/templates/footer.html');
    if (footerData) {
      const footer = document.createElement('footer');
      footer.innerHTML = footerData;
      bodyElem.replaceChild(footer, footerPlaceholder);
    }
  } catch (error) {
    console.error(`Failed to load the footer: ${error}`);
  }
}

async function loadPopUps() {
  const popupPlaceholder = document.getElementById('popup-placeholder') as HTMLElement;
  try {
    //Get the popups HTML from the popups file
    const popUpsData = await fetchHTML('https://raw.githubusercontent.com/RyanMontville/typescript-pwa/refs/heads/main/templates/popups.html');
    if (popUpsData) {
      //Create the popups
      const popUpsDiv = document.createElement('div');
      popUpsDiv.innerHTML = popUpsData;
      bodyElem.replaceChild(popUpsDiv, popupPlaceholder);
    }
  } catch (error) {
    console.error(`Failed to load the popups: ${error}`);
  }
}

export function scrollAnimation(onlyOnce: boolean) {

  /* Scroll animation */
  const animatedElements = document.querySelectorAll('article');
  if (animatedElements.length > 0) {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          if (onlyOnce) {
            observer.unobserve(entry.target); 
          }
        } else {
          entry.target.classList.remove('show');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}