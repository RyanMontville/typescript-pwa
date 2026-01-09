import { initializeApp, getYear, scrollAnimation } from "./main.js";
import { ColorCount } from "./models.js";
import { createColorCountPieChart } from "./modules/d3Graphics.js";
import { getBlockStructure, renderTree } from "./modules/createNodeTree.js";
import { createHeader } from "./modules/utils.js";

let year: number = 0;
const main = document.querySelector('main') as HTMLElement;

year = getYear();

initializeApp("Home", "Home", year !== 2026 ? true : false).then(async () => {
    const response = await fetch(`https://raw.githubusercontent.com/CanvasStats/data-files/refs/heads/main/${year}/overview${year}.json`);
    const yearData = await response.json();
    console.log(yearData);
    let colorCounts: ColorCount[] = [];
    yearData.blocks.forEach((block: any) => {
        const structure = getBlockStructure(block, year);
        if (block.type === "color-grid") {
            colorCounts = mapColorCountJsonToInterface(block.data);
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
        } else {
            renderTree(structure, main);
        }
    });
    createColorCountPieChart(2025, colorCounts, "colorCountsPieChart", true, "slice-clickable");
    main.classList.remove('hide');
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    scrollAnimation(true);
});

function mapColorCountJsonToInterface(data: ColorCount[]) {
    return data.reduce((acc: ColorCount[], currentCount: ColorCount) => {
        const newCount: ColorCount = {class: currentCount['class'], label: currentCount['label'], count: currentCount['count'], hex: currentCount['hex']};
        acc.push(newCount);
        return acc;
    }, []);
}