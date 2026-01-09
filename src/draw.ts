import { getPixelsForDraw } from "./services/canvasService";
import { initializeApp, getYear } from "./main";
import { createButton } from "./modules/utils";
import { Pixel, drawParams } from "./models";
import { navigateTo } from "./modules/navigate";

let year: number = 2025;
let canvasWidth: number = 500;
let canvasHeight: number = 500;

const main = document.querySelector('main') as HTMLElement;
const drawHeader = document.getElementById('drawHeader') as HTMLElement;
const drawTitle = document.getElementById('drawTitle') as HTMLElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext("2d");

//URL Params
const urlParams = new URLSearchParams(window.location.search);
let sentFrom: string | null = null;
let background: string = "";
let username: string = "";
let special: string = "";
let color: string = "";
let undo: boolean = false;
let reverse: boolean = false;
let topOnly: string = "";

let pixelsToDraw: Pixel[] = [];
let filename: string = "";
let drawTitleContent: string = "";

initializeApp("Draw", "Draw", true).then(async () => {
    year = getYear();
    sentFrom = urlParams.get('sentFrom');
    const usernameString = urlParams.get('username');
    if (usernameString) username = usernameString;
    if (sentFrom) {
        if (sentFrom === "home") {
            //Create a button to return to the year overview
            const returnHomeButton = createButton('blue', `Back to the ${year} Overview`, "arrow_back");
            returnHomeButton.addEventListener('click', () => navigateTo('/', {params: {year: year}}));
            drawHeader.appendChild(returnHomeButton);
            drawTitleContent = `The image below  contains all the pixels placed during Canvas ${year}`;
            filename = `canvas${year}`
        } else if (sentFrom === "user") {
            //Create a button to return to the user's stats
            const returnToUserButton = createButton('blue', 'Back to your stats', "arrow_back");
            returnToUserButton.addEventListener('click', () => navigateTo('/user', {params: {year: year, user: username}}));
            drawHeader.appendChild(returnToUserButton);
            drawTitleContent = `The image below contains all the pixels placed by ${username} during Canvas ${year}`;
            filename = `${username}-pixels-${year}`
        } else if (sentFrom === "search") {
            //Create a button to return to the search page
            const returnToUserButton = createButton('blue', 'Back to search', "arrow_back");
            returnToUserButton.addEventListener('click', () => navigateTo('/advanced-search'));
            drawHeader.appendChild(returnToUserButton);
            if (username) {
                drawTitleContent = `The image below contains all the pixels placed by ${username} during Canvas ${year}`;
            } else {
                drawTitleContent = `The image below contains all the pixels placed by ${username} during Canvas ${year}`;
            }
            filename = `${username}-pixels-${year}`
        }
    }
    //Get url params
    const backgroundString = urlParams.get('background');
    background = backgroundString ? backgroundString : "white";
    const undoString = urlParams.get('undo');
    if (undoString) {
        undo = true;
        drawTitleContent += " that were undone"
        filename += "-undo";
    };
    const colorString = urlParams.get('color');
    if (colorString) {
        color = getHexForColor(colorString);
        drawTitleContent += ` that are ${colorString}`;
        filename += `${colorString}`;
    }
    const isTopString = urlParams.get('isTop');
    if (isTopString) {
        topOnly = isTopString;
        drawTitleContent += " that were visible at the end of the event";
        filename += "-top-only";
    };
    const specialString = urlParams.get('special');
    if (specialString) {
        special = specialString;
        if (specialString === "template") {
            drawTitleContent += ' that were included in the "megatemplate"';
            filename += '-megatemplate';
        }
        if (specialString === "reverse") {
            reverse = true;
            drawTitleContent += " in reverse order";
            filename += '-reverse';
        }
        if (specialString === "undo") {
            undo = true;
            drawTitleContent += " that were undone"
            filename += "-undo";
        }
    }
    const reverseString = urlParams.get('reverse');
    if (reverseString) {
        reverse = true;
        drawTitleContent += " in reverse order";
        filename += '-reverse';
    }
    const pixelData = await getPixelsForDraw(new drawParams(year, undo, username, color, special, topOnly));
    if (pixelData) pixelsToDraw = pixelData;
    //Set the Canvas dimensions for the year
    if (year === 2023) {
        canvasHeight = 1000;
        canvasWidth = 1000;
    } else if (year === 2024) {
        canvasHeight = 500;
        canvasWidth = 1000;
    } else if (year === 2025) {
        canvasHeight = 500;
        canvasWidth = 500;
    }

    drawTitle.textContent = drawTitleContent;
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
    main.classList.remove('hide');
    if (pixelsToDraw.length > 0) {
        console.log(`Got ${pixelsToDraw.length} pixels`);
        canvas.setAttribute('width', `${canvasWidth}`);
        canvas.setAttribute('height', `${canvasHeight}`);
        if (context) {
            //Set the background
            if (background === "black") {
                context.fillStyle = "#000000";
                context.fillRect(0, 0, canvasWidth, canvasHeight);
            } else if (background !== "transparent") {
                context.fillStyle = "#ffffff";
                context.fillRect(0, 0, canvasWidth, canvasHeight);
            }
            //Draw the pixels
            if (!reverse) {
                pixelsToDraw.forEach(pixel => {
                    setTimeout(() => {
                        context.fillStyle = pixel['colorHex'];
                        context.fillRect(pixel['xCoordinate'], pixel['yCoordinate'], 1, 1);
                    }, 2000);
                });
            } else {
                const l = pixelsToDraw.length - 1;
                for (let i = l; i >= 0; i--) {
                    setTimeout(() => {
                        context.fillStyle = pixelsToDraw[i]['colorHex'];
                        context.fillRect(pixelsToDraw[i]['xCoordinate'], pixelsToDraw[i]['yCoordinate'], 1, 1);
                    }, 2000);
                }
            }
        }
        const downloadButton = createButton('green', `Download ${filename}`);
        downloadButton.addEventListener('click', () => downloadImage());
        drawHeader.appendChild(downloadButton);
    } else {
        drawTitle.textContent = "You have filtered out all the pixels!";
        console.log("no pixels")
    }
});

function getHexForColor(colorName: string) {
    switch (colorName) {
        case 'white': return '#FFFFFF';
        case 'light-grey': return '#B9C3CF';
        case 'medium-grey': return '#777F8C';
        case 'deep-grey': return '#424651';
        case 'dark-grey': return '#1F1E26';
        case 'black': return '#000000';
        case 'dark-chocolate': return '#382215';
        case 'chocolate': return '#7C3F20';
        case 'brown': return '#C06F37';
        case 'peach': return '#FEAD6C';
        case 'beige': return '#FFD2B1';
        case 'pink': return '#FFA4D0';
        case 'magenta': return '#F14FB4';
        case 'mauve': return '#E973FF';
        case 'purple': return '#A630D2';
        case 'dark-purple': return '#531D8C';
        case 'navy': return '#242367';
        case 'blue': return '#0334BF';
        case 'azure': return '#149CFF';
        case 'aqua': return '#8DF5FF';
        case 'light-teal': return '#01BFA5';
        case 'dark-teal': return '#16777E';
        case 'forest': return '#054523';
        case 'dark-green': return '#18862F';
        case 'green': return '#61E021';
        case 'lime': return '#B1FF37';
        case 'pastel-yellow': return '#FFFFA5';
        case 'yellow': return '#FDE111';
        case 'orange': return '#FF9F17';
        case 'rust': return '#F66E08';
        case 'maroon': return '#550022';
        case 'rose': return '#99011A';
        case 'red': return '#F30F0C';
        case 'watermelon': return '#FF7872';
        default: return '#000000';
    }
}

function downloadImage() {
    try {
        const dataURL = canvas.toDataURL("image/png");
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = filename + '.png';
        a.click();
    } catch (error) {
        console.error("Error during download:", error);
        console.error(`Error occurred while downloading ${filename}.png`);
    }
}