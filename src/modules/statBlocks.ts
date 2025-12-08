import { ColorCount, ContentPair, UserStat, YearStat } from "../models";
import { createIconDiv, createHeader, getRandomColor, createExternalLink, createParagraph, createLinkButton } from "./utils";

export function createTextStat(stat: YearStat) {
    const textStat = document.createElement('article');
    textStat.setAttribute('class', stat['direction']);
    if (stat['icon']) {
        const statIcon = createIconDiv('icon', stat['icon']);
        textStat.appendChild(statIcon);
    }
    const statSection = document.createElement('section');
    if (stat['header']) {
        const statHeader = createHeader("h3", stat['header']);
        statSection.appendChild(statHeader);
    }
    stat['content'].forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph['contentValue'];
        p.setAttribute("class", 'text');
        statSection.appendChild(p);
    });
    textStat.appendChild(statSection);
    return textStat;
}

export function createColorStat(stat: YearStat) {
    const body = document.querySelector('body') as HTMLElement;
    const colorStat = document.createElement('article');
    colorStat.setAttribute('class', `${stat['direction']} colorStat`);
    const pieChartContainer = document.createElement('div');
    pieChartContainer.setAttribute('id', 'colorCountsPieChart');
    colorStat.appendChild(pieChartContainer);
    const statSection = document.createElement('section');
    statSection.setAttribute('class', 'color-section');
    if (stat['header']) {
        const statHeader = createHeader('h3', stat['header']);
        statSection.appendChild(statHeader);
    }
    const toolTip = document.createElement('div');
    toolTip.setAttribute('id', 'tooltip');
    statSection.appendChild(toolTip);
    colorStat.appendChild(statSection);
    return colorStat;
}

export function createTopUsersStat(topUsers: YearStat, year: number) {
    const topUsersStat = document.createElement('article');
    topUsersStat.setAttribute('class', topUsers['direction']);
    const statSection = document.createElement('section');
    if (topUsers['header']) {
        const statHeader = createHeader("h3", topUsers['header']);
        statSection.appendChild(statHeader);
    }
    const topUsersUl = topUsers['content'].reduce((acc: HTMLElement, user: ContentPair) => {
        const userLi = document.createElement('li');
        const linkToUser = document.createElement('a');
        linkToUser.setAttribute('href', `user?user=${user['contentKey']}&year=${year}`)
        linkToUser.textContent = user['contentKey'];
        userLi.appendChild(linkToUser);
        const placementCount = document.createElement('span');
        placementCount.textContent = `: ${user['contentValue']}`;
        userLi.appendChild(placementCount);
        acc.appendChild(userLi);
        return acc;
    }, document.createElement('ul'));
    topUsersUl.setAttribute('class', 'top-users');
    statSection.appendChild(topUsersUl);
    topUsersStat.appendChild(statSection);
    return topUsersStat;
}

export function createImageStat(stat: YearStat) {
    const imageStat = document.createElement('article');
    imageStat.setAttribute('class', stat['direction']);
    const statSection = document.createElement('section');
    if (stat['header']) {
        const statHeader = createHeader("h3", stat['header']);
        statSection.appendChild(statHeader);
    }
    stat['content'].forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.setAttribute('class', 'center');
        imageDiv.innerHTML = image['contentValue'];
        statSection.appendChild(imageDiv);
    });
    imageStat.appendChild(statSection);
    return imageStat;
}

export function createLinkBlock(stat: YearStat, external: boolean) {
    const externalLink = document.createElement('article');
    externalLink.setAttribute('class', stat['direction']);
    if (stat['icon']) {
        const statIcon = createIconDiv('icon', stat['icon']);
        externalLink.appendChild(statIcon);
    }
    const statSection = document.createElement('section');
    if (stat['header']) {
        const statHeader = createHeader("h3", stat['header']);
        statSection.appendChild(statHeader);
    }
    const linkWrapper = stat['content'].reduce((acc: HTMLElement, currLink: ContentPair, currentIndex: number) => {
        const link = createLinkButton(getRandomColor(currentIndex), currLink['contentValue'], currLink['contentKey'], true)
        acc.appendChild(link);
        return acc;
    }, document.createElement('div'));
    linkWrapper.setAttribute('class', 'btn-wrapper');
    statSection.appendChild(linkWrapper);
    externalLink.appendChild(statSection);
    return externalLink;
}

export function createSocialsBlock(stat: YearStat) {
    const socailsBlock = document.createElement('article');
    socailsBlock.setAttribute('class', stat['direction']);
    const statIcon = createIconDiv('icon', 'public');
    socailsBlock.appendChild(statIcon);
    const statSection = document.createElement('section');
    const statHeader = createHeader("h3", 'Stay Connected:');
    statSection.appendChild(statHeader);
    const socailsUl = document.createElement('ul');
    const lemmyLi = createExternalLink(true, 'https://toast.ooo/c/canvas', 'Lemmy');
    socailsUl.appendChild(lemmyLi);
    const mastodonLi = createExternalLink(true, 'https://social.fediverse.events/@canvas', 'Mastodon');
    socailsUl.appendChild(mastodonLi);
    const matrixLi = createExternalLink(true, 'https://matrix.to/#/#canvas:aftermath.gg?via=matrix.org', 'Matrix Space');
    socailsUl.appendChild(matrixLi);
    const discordLi = createExternalLink(true, 'https://discord.gg/XrDSJ2WJqa', 'Discord', ' (bridged to matrix)');
    socailsUl.appendChild(discordLi);
    const moreInfoLi = document.createElement('li');
    const moreInfoSpan = document.createElement('span');
    moreInfoSpan.textContent = 'More inforamtion about Canvas on ';
    moreInfoLi.appendChild(moreInfoSpan);
    const moreInfoA = createExternalLink(false, 'https://fediverse.events/', 'fediverse.events');
    moreInfoLi.appendChild(moreInfoA);
    socailsUl.appendChild(moreInfoLi);
    statSection.appendChild(socailsUl);
    socailsBlock.appendChild(statSection);
    return socailsBlock;
}

export function createUserStatBlock(stat: UserStat) {
    const statBlock = document.createElement('article');
    statBlock.setAttribute('class', stat['direction']);
    const statIcon = createIconDiv(stat['iconType'], stat['iconText']);
    statBlock.appendChild(statIcon);
    const statSection = document.createElement('section');
    const statContent = createParagraph(stat['statP']);
    statContent.setAttribute('class', 'text');
    statSection.appendChild(statContent);
    statBlock.appendChild(statSection);
    return statBlock;
}

export function createGenerateBlock(stat: YearStat, year: number) {
    const generateBlock = document.createElement('article');
    generateBlock.setAttribute('class', stat['direction']);
    if (stat['icon']) {
        const statIcon = createIconDiv('icon', stat['icon']);
        generateBlock.appendChild(statIcon);
    }
    const statSection = document.createElement('section');
    if (stat['header']) {
        const statHeader = createHeader('h3', stat['header']);
        statSection.appendChild(statHeader);
    }
    let url: string = "";
    const stepOne = stat['content'].reduce((acc: HTMLElement, button: ContentPair, index) => {
        const newButton = document.createElement('button');
        newButton.setAttribute('class', `btn ${getRandomColor(index)}`);
        newButton.setAttribute('id', button['contentValue']);
        newButton.textContent = button['contentKey'];
        newButton.addEventListener('click', () => {
            url = button['contentValue'];
            if (button['contentKey'] == "Something Else") {
                window.location.href = url;
            } else {
                stepOne.classList.add('hide');
            const stepTwo = document.getElementById('stepTwo');
            if (stepTwo) stepTwo.classList.remove('hide');
            }
        });
        acc.appendChild(newButton);
        return acc;
    }, document.createElement('div'));
    stepOne.setAttribute('id', 'stepOne');
    stepOne.setAttribute('class', 'btn-wrapper');
    statSection.appendChild(stepOne);
    const stepTwo = document.createElement('div');
    stepTwo.setAttribute('id', 'stepTwo');
    stepTwo.setAttribute('class', 'btn-wrapper hide');
    const white = document.createElement('button');
    white.setAttribute('class', 'btn white');
    white.textContent = 'With white background';
    white.addEventListener('click', () => {
        window.location.href = `${url}&background=white`;
    });
    stepTwo.appendChild(white);
    const black = document.createElement('button');
    black.setAttribute('class', 'btn black');
    black.textContent = 'With black background';
    black.addEventListener('click', () => {
        window.location.href = `${url}&background=black`;
    });
    stepTwo.appendChild(black);
    const transparent = document.createElement('button');
    transparent.setAttribute('class', 'btn dark-grey');
    transparent.textContent = 'With transparent background';
    transparent.addEventListener('click', () => {
        window.location.href = `${url}&background=transparent`;
    });
    stepTwo.appendChild(transparent);
    statSection.appendChild(stepTwo);
    generateBlock.appendChild(statSection);
    return generateBlock;
}