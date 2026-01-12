import { initializeApp, getYear, scrollAnimation } from "./main.js";
import { getUserStats, GetColorCountForUsername, getPixelsPerHourForUser } from "./services/userService.js";
import { ColorCount, JsonBlock, JsonObject } from "./models.js";
import { createHeader, makeElement } from "./modules/utils.js";
import { createColorCountPieChart, createLineGraph } from "./modules/d3Graphics.js";
import { getBlockStructure, renderTree } from "./modules/createNodeTree.js";

interface DataRow {
    timestamp: Date;
    pixelCount: number;
}

let year: number = 0;
let username: string = "";
const main = document.querySelector('main') as HTMLElement;

let userColorCounts: ColorCount[] | null = null;
let pixelsPerHour: DataRow[] | undefined = undefined;

initializeApp("users", "", true).then(async () => {
    year = getYear();
    // Get the username from the url
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam: string | null = urlParams.get('username');
    if (usernameParam) username = usernameParam;
    userColorCounts = await GetColorCountForUsername(year, username);
    pixelsPerHour = await getPixelsPerHourForUser(year, username);
    await displayUserStats();
    document.title = `${username} - Canvas Stats`;
    main.classList.remove('hide');
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    scrollAnimation(true);
});

function displayNoStatsBlocks(username: string | null, year: number) {
    console.log(`Username is ${username?.length}`)
    const noStats: JsonObject = {
        year: year,
        username: username ? username : "",
        blocks: []
    }
    if (!username || username.length === 0) {
        const userFound: JsonBlock = {
            type: "standard",
            layout: "left",
            icon: "person_cancel",
            content: [
                "Error loading user stats. Username not provided."
            ]
        }
        noStats['blocks'].push(userFound);

    } else {
        const userFound: JsonBlock = {
            type: "standard",
            layout: "left",
            icon: "person_cancel",
            content: [
                `${username} did not participate in Canvas ${year}`
            ]
        }
        noStats['blocks'].push(userFound);
    }
    const viewList: JsonBlock = {
        type: "standard",
        layout: "left",
        content: [
            [
                {
                    linkText: "Click here",
                    page: "/users",
                    external: false,
                    queryParams: { year: year },
                    classes: ""
                },
                ` to view the users who participated in ${year}`
            ]
        ]
    }
    const messageMonte: JsonBlock = {
        type: "standard",
        layout: "left",
        content: [
            [
                "If you still can't find your username and you truely believe you did participate in 2024, send a DM to ",
                {
                    linkText: "@the_real_monte",
                    url: "https://sh.itjust.works/u/the_real_monte",
                    external: true,
                    queryParams: {},
                    classes: ""
                },
                " and we can check the database."
            ]
        ]
    }
    noStats['blocks'].push(viewList);
    noStats['blocks'].push(messageMonte);
    return noStats;
}

async function displayUserStats() {
    if (username !== "") {
        const userData: JsonObject | null = await getUserStats(username, year);
        if (userData) {
            const tempHeader = createHeader("h2", username);
            main.appendChild(tempHeader);
            userData.blocks.forEach(async (block: any) => {
                const structure = getBlockStructure(block, year);
                if (block.type === "user-color-grid") {
                    const colorStat = document.createElement('article');
                    colorStat.setAttribute('class', `${block.layout} colorStat`);
                    const pieChartContainer = document.createElement('div');
                    pieChartContainer.setAttribute('id', 'colorCountsPieChart');
                    colorStat.appendChild(pieChartContainer);
                    const statSection = document.createElement('section');
                    statSection.setAttribute('class', 'color-section');
                    if (block.title) {
                        const statHeader = createHeader('h3', block.title);
                        statSection.appendChild(statHeader);
                    }
                    const toolTip = document.createElement('div');
                    toolTip.setAttribute('id', 'tooltip');
                    statSection.appendChild(toolTip);
                    colorStat.appendChild(statSection);
                    main.appendChild(colorStat);
                } else if (block.type === "graph") {
                    const graphStat = makeElement("article", null, block.layout, null);
                    const statSection = makeElement("section", null, null, null);
                    if (block.title) {
                        const statHeader = makeElement("h3", null, "center", block.title);
                        statSection.appendChild(statHeader);
                    }
                    const graphContainer = makeElement("div", "line-graph-container", null, null);
                    graphContainer.setAttribute("style", "width: 100%; max-width: 800px; margin: auto;")
                    statSection.appendChild(graphContainer);
                    graphStat.appendChild(statSection);
                    main.appendChild(graphStat);
                } else {
                    renderTree(structure, main);
                }
            });
            if (userColorCounts) createColorCountPieChart(2025, userColorCounts, "colorCountsPieChart", false, "slice-clickable");
            if (pixelsPerHour) createLineGraph(pixelsPerHour, "#line-graph-container");
        } else {
            const noStats = displayNoStatsBlocks(username, year);
            noStats.blocks.forEach((block: any) => {
                const structure = getBlockStructure(block, year);
                renderTree(structure, main);
            });
        }
    } else {
        const noStats = displayNoStatsBlocks(username, year);
        noStats.blocks.forEach((block: any) => {
            const structure = getBlockStructure(block, year);
            renderTree(structure, main);
        });
    }
}