import { ContentPair } from "../models";

export function createHeader(headingSize: string, headerText: string) {
  let header: HTMLElement;
  switch (headingSize) {
    case "h1":
      header = document.createElement('h1');
      break;
    case "h2":
      header = document.createElement("h2");
      break;
    case "h3":
      header = document.createElement("h3");
      break;
    case "h4":
      header = document.createElement("h4");
      break
    default:
      header = document.createElement("h2");
      break;
  }
  header.textContent = headerText;
  return header;
}

export function createIconDiv(iconType: string, iconName: string) {
  const iconDiv = document.createElement('div');
  iconDiv.setAttribute('class', 'icon');
  if (iconType === "icon") {
    const icon = document.createElement('span');
    icon.setAttribute('class', 'material-symbols-outlined');
    icon.textContent = iconName;
    iconDiv.appendChild(icon);
  } else {
    const textIcon = createHeader("h2", iconName);
    iconDiv.appendChild(textIcon);
  }
  return iconDiv;
}

export function createExternalLink(liWrapper: boolean, linkHref: string, linkText: string, largeScreeText?: string) {
  const newA = document.createElement('a');
  newA.setAttribute('href', linkHref);
  newA.setAttribute('target', '_blank');
  newA.textContent = linkText;
  if (liWrapper) {
    const newLi = document.createElement('li');
    newLi.appendChild(newA);
    if (largeScreeText) {
      const largeScreenSpan = document.createElement('span');
      largeScreenSpan.setAttribute('class', 'large-screens-only');
      largeScreenSpan.textContent = largeScreeText;
      newLi.appendChild(largeScreenSpan);
    }
    return newLi;
  } else {
    return newA;
  }
}

export function createLinkButton(color: string, href: string, linkText: string, external: boolean, iconName?: string) {
  const newLinkButton = document.createElement('a');
  newLinkButton.setAttribute('class', `btn ${color}`);
  newLinkButton.setAttribute('href', href);
  if (external) {
    newLinkButton.setAttribute('target', '_blank');
  }
  if (iconName) {
    const icon = document.createElement('span');
    icon.setAttribute('class', 'material-symbols-outlined');
    icon.textContent = iconName;
    newLinkButton.appendChild(icon);
  }
  const linkTextNode = document.createTextNode(linkText);
  newLinkButton.appendChild(linkTextNode);
  return newLinkButton;
}

function shuffle(array: string[]): string[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function getRandomColor(index: number) {
  const colorsShuffled = shuffle(['white', 'light-grey', 'medium-grey', 'peach', 'beige', 'pink', 'magenta', 'mauve', 'purple', 'dark-purple', 'navy', 'blue', 'azure', 'aqua', 'light-teal', 'dark-teal', 'forest', 'dark-green', 'green', 'lime', 'pastel-yellow', 'yellow', 'orange', 'rust', 'maroon', 'rose', 'red', 'watermelon']);
  return `btn ${colorsShuffled[index]}`;
}

export function createButton(buttonColor: string, buttonText: string, iconName?: string) {
  const newButton = document.createElement("button");
  newButton.setAttribute('class', `btn ${buttonColor}`);
  if (iconName) {
    const icon = document.createElement('span');
    icon.setAttribute('class', 'material-symbols-outlined');
    icon.textContent = iconName;
    newButton.appendChild(icon);
  }
  const buttonTextNode = document.createTextNode(buttonText);
  newButton.appendChild(buttonTextNode);
  return newButton;
}

export function getHexForColor(color: string) {
  switch (color) {
    case 'white': return '#FFFFFF';
    case 'light grey': return '#B9C3CF';
    case 'medium grey': return '#777F8C';
    case 'deep grey': return '#424651';
    case 'dark grey': return '#1F1E26';
    case 'black': return '#000000';
    case 'dark chocolate': return '#382215';
    case 'chocolate': return '#7C3F20';
    case 'brown': return '#C06F37';
    case 'peach': return '#FEAD6C';
    case 'beige': return '#FFD2B1';
    case 'pink': return '#FFA4D0';
    case 'magenta': return '#F14FB4';
    case 'mauve': return '#E973FF';
    case 'purple': return '#A630D2';
    case 'dark purple': return '#531D8C';
    case 'navy': return '#242367';
    case 'blue': return '#0334BF';
    case 'azure': return '#149CFF';
    case 'aqua': return '#8DF5FF';
    case 'light teal': return '#01BFA5';
    case 'dark teal': return '#16777E';
    case 'forest': return '#054523';
    case 'dark green': return '#18862F';
    case 'green': return '#61E021';
    case 'lime': return '#B1FF37';
    case 'pastel yellow': return '#FFFFA5';
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