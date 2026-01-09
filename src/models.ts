export interface Pixel {
    username: string;
    xCoordinate: number;
    yCoordinate: number;
    colorHex: string;
    isTop: boolean;
    isUndo: boolean;
    isSpecial: boolean;
}

export interface User {
    username: string;
    userRank: number;
    pixelCount: number;
    xCord: number;
    yCord: number;
    cordCount: number;
}

export class ColorsCounts {
    constructor(
        public username: string,
        public black: number,
        public darkGrey: number,
        public deepGrey: number,
        public mediumGrey: number,
        public lightGrey: number,
        public white: number,
        public beige: number,
        public peach: number,
        public brown: number,
        public chocolate: number,
        public rust: number,
        public orange: number,
        public yellow: number,
        public pastelYellow: number,
        public lime: number,
        public green: number,
        public darkGreen: number,
        public forest: number,
        public darkTeal: number,
        public lightTeal: number,
        public aqua: number,
        public azure: number,
        public blue: number,
        public navy: number,
        public purple: number,
        public mauve: number,
        public magenta: number,
        public pink: number,
        public watermelon: number,
        public red: number,
        public rose: number,
        public maroon: number,
        public darkChocolate: number,
        public darkPurple: number
    ) { }
}

// export class Overview {
//     constructor(
//         public year: number,
//         public finalCanvas: Image,
//         public tags: Tag[],
//         public colorCounts: ColorCount[],
//         public links: Link[]
//     ) { }
// }

export interface ColorCount {
        class: string;
        label: string;
        count: number;
        hex: string;
}

// export class Tag {
//     constructor(
//         public id: number,
//         public type: string,
//         public content: string[]
//     ) { }
// }

export class Link {
    constructor(
        public linkText: string,
        public classes: string,
        public external: boolean,
        public queryParams?: { [key: string]: any },
        public url?: string,
        public page?: any
    ) { }
}

export class Image {
    constructor(
        public id: number,
        public imageURL: string,
        public imageAlt: string
    ) { }
}

// export class YearStat {
//     constructor(
//         public type: string,
//         public direction: string,
//         public icon: string | undefined,
//         public header: string | undefined,
//         public content: ContentPair[]
//     ) { }
// }

export class ContentPair {
    constructor(
        public contentKey: string,
        public contentValue: string
    ) { }
}

export class UserMain {
    public readonly type = 'UserMain';
    constructor(
        public username: string,
        public canvas2023: boolean,
        public canvas2024: boolean,
        public canvas2025: boolean
    ) { }
}

export class StatImage {
    constructor(
        public imageName: string,
        public imageAlt: string,
        public imageURL: string,
        public imageClass: string
    ) { }
}

export class CoordinatePair {
    constructor(
        public xCoordinate: number,
        public yCoordinate: number
    ) { }
}

// export class ParagraphBlock {
//     constructor(
//         public parts: ContentPair[]
//     ) { }
// }

// export class UserStat {
//     constructor(
//         public direction: string,
//         public iconType: string,
//         public iconText: string,
//         public statP: ParagraphBlock
//     ) { }
// }

export class drawParams {
    constructor(
        public year: number,
        public undo: boolean,
        public username: string,
        public color: string,
        public special: string,
        public topOnly: string
    ) { }
}

export interface JsonObject {
    year: number;
    username: string | undefined;
    blocks: JsonBlock[];

}

export interface JsonBlock {
    type: string;
    layout: string;
    icon?: string;
    title?: string;
    content?: (string | (string | Link)[])[];
    data?: ColorJsonObject[];
    imageUrl?: string;
    items?: ContentPair[];
    buttons?: Link[];
}

export interface ColorJsonObject {
    label: string;
    class: string;
    hex: string;
    count: number;
}