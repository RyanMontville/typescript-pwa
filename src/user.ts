import { initializeApp, getYear, scrollAnimation } from "./main.js";
import { getUserStats, GetColorCountForUsername } from "./services/userService.js";
import { ColorCount, ContentPair, ParagraphBlock, UserStat, YearStat } from "./models.js";
import { createHeader, createIconDiv, createLinkButton } from "./modules/utils.js";
import { createUserStatBlock } from "./modules/statBlocks.js";
import { createColorCountPieChart } from "./modules/d3Graphics.js";

let year: number = 0;
let username: string = "";
const main = document.querySelector('main') as HTMLElement;

let userColorCounts: ColorCount[] | null = null;

function displayColorCounts(stat: UserStat) {
    if (userColorCounts) {
        const colorCountArticle = document.createElement('article');
        colorCountArticle.setAttribute('class', stat['direction']);
        const pieChartContainer = document.createElement('div');
        pieChartContainer.setAttribute('id', 'colorCountsPieChart');
        colorCountArticle.appendChild(pieChartContainer);
        const colorSection = document.createElement('section');
        colorSection.setAttribute('class', 'color-section');
        const colorCountHeader = createHeader("h3", "Pixels placed by color:");
        colorSection.appendChild(colorCountHeader);
        const toolTip = document.createElement('div');
        toolTip.setAttribute('id', 'tooltip');
        colorSection.appendChild(toolTip);
        colorCountArticle.appendChild(colorSection);
        return colorCountArticle;
    }
}


async function displayUserStats() {

    if (username !== "") {
        const userStats: UserStat[] | null = await getUserStats(username, year);
        console.log(userStats);
        if (userStats) {
            const tempHeader = createHeader("h2", username);
            main.appendChild(tempHeader);
            userStats.forEach(async stat => {
                if (stat['iconText'] == "colorCount") {
                    const colorCountBlock = displayColorCounts(stat);
                    if (colorCountBlock) {
                        main.appendChild(colorCountBlock);
                        if (userColorCounts) createColorCountPieChart(year, userColorCounts, "colorCountsPieChart", false, "slice");
                    }
                } else if (stat['iconText'] === "drawLinks") {
                    const drawBlock = document.createElement('article');
                    drawBlock.setAttribute('class', stat['direction']);
                    const iconDiv = createIconDiv('icon', 'dashboard_customize');
                    drawBlock.appendChild(iconDiv);
                    const drawSection = document.createElement('section');
                    const sectionHeader = createHeader("h3", `View your pixels placed in ${year}`);
                    drawSection.appendChild(sectionHeader);
                    const linkWrapper = document.createElement('div');
                    linkWrapper.setAttribute('class', 'btn-wrapper');
                    const whiteBackground = createLinkButton('white', `draw.html?sentFrom=user&username=${username}&year=${year}&background=white`, 'with white background', false);
                    linkWrapper.appendChild(whiteBackground);
                    const blackBackground = createLinkButton('black', `draw.html?sentFrom=user&username=${username}&year=${year}&background=black`, 'with black background', false);
                    linkWrapper.appendChild(blackBackground);
                    const transparentBackground = createLinkButton('dark-grey', `draw.html?sentFrom=user&username=${username}&year=${year}&background=transparent`, 'with transparent background', false);
                    linkWrapper.appendChild(transparentBackground);
                    drawSection.appendChild(linkWrapper);
                    drawBlock.appendChild(drawSection);
                    main.appendChild(drawBlock);
                } else {
                    const userStat = createUserStatBlock(stat);
                    main.appendChild(userStat);
                }
            });

        } else {
            const sorryP: ParagraphBlock = new ParagraphBlock([new ContentPair("text", `${username} did not participate in Canvas ${year}`)]);
            const sorryBlock = createUserStatBlock(new UserStat("left", "icon", "person_cancel", sorryP));
            main.appendChild(sorryBlock);
            const findP: ParagraphBlock = {
                parts: [
                    new ContentPair(`users?year=${year}`, "Click here"),
                    new ContentPair("text", ` to view the list of users for Canvas ${year} and see if you can find your username`)
                ]
            }
            const findBlock = createUserStatBlock(new UserStat("right", "icon", "person_search", findP));
            main.appendChild(findBlock);
            const messageP: ParagraphBlock = {
                parts: [
                    new ContentPair("text", `If you still can't find your username and you truely believe you did participate in ${year}, send a dm to `),
                    new ContentPair("https://sh.itjust.works/u/the_real_monte", "@the_real_monte"),
                    new ContentPair("text", " on Lemmy and we can check the database")
                ]
            }
            const messageBlock = createUserStatBlock(new UserStat("left", "icon", "mail", messageP));
            main.appendChild(messageBlock);
        }
    } else {
        console.warn("Didn't find username")
    }

}

initializeApp("users", "", true).then(async () => {
    year = getYear();
    // Get the username from the url
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam: string | null = urlParams.get('user');
    if (usernameParam) username = usernameParam;
    userColorCounts = await GetColorCountForUsername(year, username);
    await displayUserStats();
    document.title = `${username} - Canvas Stats`;
    main.classList.remove('hide');
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    scrollAnimation(true);
});