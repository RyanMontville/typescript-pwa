import { getAllUsers, getAllUserStatsForYear } from "./services/userService";
import { getYears } from "./services/canvasService";
import { initializeApp, getSearchString, getYear, doesURLContainYear, scrollAnimation } from "./main";
import { ContentPair, User, UserMain } from "./models";
import { createHeader, createButton } from "./modules/utils";
import { navigateTo } from "./modules/navigate";

let pageHeader: string = "";
let userList: UserMain[] | undefined = undefined;
let usersToShow: UserMain[] = [];

const main = document.querySelector('main') as HTMLElement;
const body = document.querySelector('body') as HTMLElement;
const pageH2 = document.querySelector('h2') as HTMLElement;
const returnToTopButton = document.getElementById('return-to-top') as HTMLElement;

function displayUsersByUsername() {
    pageH2.textContent = pageHeader;
    returnToTopButton.classList.remove('hide');
    if (userList) {
        if (usersToShow.length < 10) returnToTopButton.classList.add('hide');
        const userListContainer = usersToShow.reduce((acc: HTMLElement, user: UserMain) => {
            const userRow = document.createElement('article');
            userRow.setAttribute('class', 'user-row middle');
            const usernameDiv = document.createElement('div');
            usernameDiv.setAttribute('class', 'username');
            const usernameP = document.createElement('p');
            usernameP.textContent = user['username'];
            usernameDiv.appendChild(usernameP);
            userRow.appendChild(usernameDiv);
            if (user['canvas2023']) {
                const canvas2023Link = document.createElement('a');
                canvas2023Link.setAttribute('href', `user.html?username=${user['username']}&year=2023`);
                canvas2023Link.setAttribute('class', 'btn pink');
                canvas2023Link.textContent = "2023";
                userRow.appendChild(canvas2023Link);
            }
            if (user['canvas2024']) {
                const canvas2024Link = document.createElement('a');
                canvas2024Link.setAttribute('href', `user.html?username=${user['username']}&year=2024`);
                canvas2024Link.setAttribute('class', 'btn purple');
                canvas2024Link.textContent = "2024";
                userRow.appendChild(canvas2024Link);
            }
            if (user['canvas2025']) {
                const canvas2025Link = document.createElement('a');
                canvas2025Link.setAttribute('href', `user.html?username=${user['username']}&year=2025`);
                canvas2025Link.setAttribute('class', 'btn mauve');
                canvas2025Link.textContent = "2025";
                userRow.appendChild(canvas2025Link);
            }
            acc.appendChild(userRow);
            return acc;
        }, document.createElement('div'));
        userListContainer.setAttribute('class', 'hide');
        userListContainer.setAttribute('id', 'userListContainer');
        body.replaceChild(userListContainer, main);
    }
}

async function displayUsersByRank() {
    const year = getYear();
    const allUserStats: User[] | undefined = await getAllUserStatsForYear(year);
    if (allUserStats) {
        pageH2.textContent = `Displaying ${allUserStats.length} users by ${year} rankings:`;
        const userListContainer = allUserStats.reduce((acc: HTMLElement, user: User) => {
            const userRow = document.createElement('article');
            userRow.setAttribute('class', 'user-row middle');
            const usernameDiv = document.createElement('div');
            usernameDiv.setAttribute('class', 'username');
            const usernameP = document.createElement('p');
            usernameP.textContent = `${user['userRank']}) ${user['username']} - ${user['pixelCount']} pixels`
            usernameDiv.appendChild(usernameP);
            userRow.appendChild(usernameDiv);
            const canvas2025Link = document.createElement('a');
            canvas2025Link.setAttribute('href', `user.html?user=${user['username']}&year=${year}`);
            canvas2025Link.setAttribute('class', 'btn mauve');
            canvas2025Link.textContent = `${year}`;
            userRow.appendChild(canvas2025Link);
            acc.appendChild(userRow);
            return acc;
        }, document.createElement('div'));
        userListContainer.setAttribute('class', 'hide');
        userListContainer.setAttribute('id', 'userListContainer');
        body.replaceChild(userListContainer, main);
    }
}

function displayFilterOptions() {
    const years: ContentPair[] = getYears();
    const filterPlaceholder = document.getElementById('filterPlaceholder') as HTMLElement;
    const filtersSection = years.reduce((acc: HTMLElement, year: ContentPair) => {
        const yearButton = document.createElement('button');
        yearButton.setAttribute('class', `btn ${year['contentValue']}`);
        yearButton.textContent = year['contentKey'];
        yearButton.addEventListener('click', () => navigateTo('/users', {params: {year: year['contentKey']}}));
        acc.appendChild(yearButton);
        return acc;
    }, document.createElement('section'));
    filtersSection.setAttribute('class', 'btn-wrapper hide');
    filtersSection.setAttribute('id', 'filterOptions')
    const allUsersButton = createButton('blue', "All Users");
    allUsersButton.addEventListener('click', () => navigateTo('/users'));
    filtersSection.prepend(allUsersButton);
    const filterHeader = createHeader("h2", "Filter Users:");
    filtersSection.prepend(filterHeader);
    body.replaceChild(filtersSection, filterPlaceholder);
}

initializeApp("Users", "Users", true).then(async () => {
    userList = await getAllUsers();
    if (userList) {
        displayFilterOptions();
        const searchString = getSearchString();
        if (searchString) {
            usersToShow = userList.filter(user => user['username'].toLowerCase().includes(searchString.toLowerCase()));
            pageHeader = usersToShow.length > 0 ? `Displaying ${usersToShow.length} users matching '${searchString}':` : `No results for '${searchString}'`;
            displayUsersByUsername();
        } else if (doesURLContainYear()) {
            await displayUsersByRank();
        } else {
            usersToShow = userList;
            pageHeader = `Displaying ${userList.length} users in alphabetical order:`
            displayUsersByUsername();
        }
    }
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    const filterOptions = document.getElementById('filterOptions');
    if (filterOptions) filterOptions.classList.remove('hide');
    pageH2.classList.remove('hide');
    const userListContainer = document.getElementById('userListContainer');
    if (userListContainer) userListContainer.classList.remove('hide');
    returnToTopButton.addEventListener('click', () => {
        const header = document.querySelector('header') as HTMLElement;
        header.scrollIntoView({behavior: 'smooth', block: 'start'})
    })
    scrollAnimation(false);
});