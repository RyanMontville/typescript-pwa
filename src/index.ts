import { initializeApp, getYear, scrollAnimation } from "./main.js";
import { ColorCount, YearStat } from "./models.js";
import { canvas2023, canvas2024, canvas2025, colorCounts2023, colorCounts2024, colorCounts2025 } from "./yearStats.js";
import { createColorStat, createLinkBlock, createImageStat, createSocialsBlock, createTextStat, createTopUsersStat, createGenerateBlock } from "./modules/statBlocks.js";
import { createColorCountPieChart } from "./modules/d3Graphics.js";

let year: number = 0;
const main = document.querySelector('main') as HTMLElement;

function displayInfoForYear() {
    let statsForYear: YearStat[] = [];
    let colorCountsForYear: ColorCount[] = [];
    switch (year) {
        case 2023:
            statsForYear = canvas2023;
            colorCountsForYear = colorCounts2023;
            break;
        case 2024:
            statsForYear = canvas2024;
            colorCountsForYear = colorCounts2024;
            break;
        case 2025:
            statsForYear = canvas2025;
            colorCountsForYear = colorCounts2025;
            break;
        default:
            statsForYear = canvas2025;
            colorCountsForYear = colorCounts2025;
            break;
    }
    const statsContainer = statsForYear.reduce((acc: HTMLElement, stat: YearStat) => {
        switch (stat.type) {
            case "text":
                const textStat = createTextStat(stat);
                acc.appendChild(textStat);
                break;
            case "colorCount":
                const colorStat = createColorStat(stat);
                acc.appendChild(colorStat);
                break;
            case "userList":
                const topUsersStat = createTopUsersStat(stat, year);
                acc.appendChild(topUsersStat);
                break;
            case "image":
                const imageStat = createImageStat(stat);
                acc.appendChild(imageStat);
                break;
            case "generate":
                const generateBlock = createGenerateBlock(stat, year);
                acc.appendChild(generateBlock);
                break;
            case "externalLinks":
                const exteralLink = createLinkBlock(stat, true);
                acc.appendChild(exteralLink);
                break;
            case "social":
                const socailsBlock = createSocialsBlock(stat);
                acc.appendChild(socailsBlock);
                break;
        }
        return acc;
    }, document.createElement('div'));
    statsContainer.setAttribute('id', 'stats-container');
    main.appendChild(statsContainer);
    createColorCountPieChart(year, colorCountsForYear, "colorCountsPieChart", true, "slice-clickable");
}

initializeApp("Home", "Home", year !== 2026 ? true : false).then(() => {
    year = getYear();
    displayInfoForYear();
    main.classList.remove('hide');
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    scrollAnimation(true);
});