import { ColorCount, ContentPair, YearStat, StatImage } from "./models.js";

export const canvas2025: YearStat[] = [
    new YearStat(
        'text', 'left', 'person', undefined,
        [
            new ContentPair('p', '638 users from 435 instances placed pixels on the canvas in 2025. (Down 1,274 users from 2024)'),
            new ContentPair('p', '185 returning users from 2024 and 47 users who have participated in all 3 Canvas events.')
        ]
    ),
    new YearStat(
        'text', 'right', 'grid_view', undefined,
        [
            new ContentPair('p', '308439 total pixels placed on the canvas. (Down 334,204 pixels from 2024, but the canvas was twice as big in 2024)')
        ]
    ),
    new YearStat(
        'colorCount', 'left', undefined, 'Pixels by color (Click on a slice to view the Canvas with only that color)', [new ContentPair('year', '2025')]
    ),
    new YearStat(
        'text', 'right', 'layers', undefined,
        [new ContentPair('p', '225444 are the final pixels on the canvas, making the canvas 90.1776% covered at the end of the event. (Up 8.3684% from 2024)')]
    ),
    new YearStat(
        'image', 'left', undefined, 'Pixels placed per minute', [
            new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/pixelsPerMinute.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/pixelsPerMinute.png" alt="Pixels placed per minute" /></a>'),
        ]
    ),
    new YearStat(
        'text', 'right', 'kid_star', undefined,
        [new ContentPair('p', '158 pixels were placed at (304, 40) making it the coordinate with the most pixels')]
    ),
    new YearStat(
        'userList', 'left', undefined, 'The users that contributed to the top pixel were:',
        [
            new ContentPair('Dexruus@chaos.social', '31 times'),
            new ContentPair('DmMacniel@feddit.org', '32 times'),
            new ContentPair('Sonne@feddit.org', '1 times'),
            new ContentPair('adlerweb@social.adlerweb.info', '27 times'),
            new ContentPair('flughoernchen@feddit.org', '28 times'),
            new ContentPair('hazyskies@toast.ooo', '3 times'),
            new ContentPair('Adopon@lemmy.world', '2 times'),
            new ContentPair('nuko147@lemmy.world', '12 times'),
            new ContentPair('xantater@fbsweb.de', '6 times'),
            new ContentPair('marius851000@mariusdavid.fr', '2 times'),
            new ContentPair('irelephant@app.wafrn.net', '4 times'),
            new ContentPair('Lokloy@lemmy.world', '2 times'),
            new ContentPair('D_a_X@feddit.org', '2 times'),
            new ContentPair('viviansequeira@mastodon.world', '2 times'),
            new ContentPair('elvith@feddit.org', '2 times'),
            new ContentPair('ace_garp@lemmy.world', '1 time'),
            new ContentPair('rrconkle@lemmy.zip', '1 time')
        ]
    ),
    new YearStat(
        'text', 'left', 'undo', undefined,
        [new ContentPair('p', '4969 pixels were undone by 360 users. (Down 10,755 pixels from 2024)')]
    ),
    new YearStat(
        'text', 'right', 'delete_forever', undefined,
        [new ContentPair('p', '0 users undid every pixel they placed. (Last year there were 13 users)')]
    ),
    new YearStat(
        'generate', 'left', 'dashboard_customize', 'Generate a Custom Canvas Image',
        [
            new ContentPair('Canvas at end of event', 'draw.html?sentFrom=home&year=2025'),
            new ContentPair('Just the pixels that where undone', 'draw.html?sentFrom=home&year=2025&undo=true'),
            new ContentPair('Pixels that made it from the "megatemplate" to the end of the event', 'draw.html?sentFrom=home&year=2025&special=template'),
            new ContentPair('Reverse Order', 'draw.html?sentFrom=home&year=2025&reverse=true'),
            new ContentPair('Something Else', 'advanced-search.html')
            // new ContentPair('Uncontested pixels', ''),
            // new ContentPair('Generate somthing else', 'more')
            // new ContentPair('any more to add?', '')
        ]
    ),
    new YearStat(
        'externalLinks', 'right', 'link', undefined, [
            new ContentPair('View the 2025 Atlas', 'https://atlas2025.mariusdavid.fr/')
        ]
    ),
    new YearStat('social', 'left', undefined, undefined, [])
];

export const colorCounts2025: ColorCount[] = [
    new ColorCount('#000000', 'black', 54027),
    new ColorCount('#0334BF', 'blue', 21426),
    new ColorCount('#ffffff', 'white', 20892),
    new ColorCount('#F30F0C', 'red', 20788),
    new ColorCount('#FDE111', 'yellow', 19925),
    new ColorCount('#149CFF', 'azure', 12089),
    new ColorCount('#8DF5FF', 'aqua', 11301),
    new ColorCount('#B9C3CF', 'light grey', 11099),
    new ColorCount('#777F8C', 'medium grey', 10523),
    new ColorCount('#18862F', 'dark green', 10519),
    new ColorCount('#1F1E26', 'dark grey', 8519),
    new ColorCount('#531D8C', 'dark purple', 8464),
    new ColorCount('#424651', 'deep grey', 7658),
    new ColorCount('#242367', 'navy', 7563),
    new ColorCount('#FFA4D0', 'pink', 6879),
    new ColorCount('#A630D2', 'purple', 6486),
    new ColorCount('#FFFFA5', 'pastel yellow', 5991),
    new ColorCount('#C06F37', 'brown', 5419),
    new ColorCount('#99011A', 'rose', 5120),
    new ColorCount('#61E021', 'green', 4841),
    new ColorCount('#FFD2B1', 'beige', 4546),
    new ColorCount('#16777E', 'dark teal', 4431),
    new ColorCount('#7C3F20', 'chocolate', 4341),
    new ColorCount('#F66E08', 'rust', 4313),
    new ColorCount('#F14FB4', 'magenta', 4291),
    new ColorCount('#FF9F17', 'orange', 3864),
    new ColorCount('#B1FF37', 'lime', 3669),
    new ColorCount('#054523', 'forest', 3425),
    new ColorCount('#01BFA5', 'light teal', 2980),
    new ColorCount('#382215', 'dark chocolate', 2884),
    new ColorCount('#FF7872', 'watermelon', 2801),
    new ColorCount('#FEAD6C', 'peach', 2583),
    new ColorCount('#550022', 'maroon', 2532),
    new ColorCount('#E973FF', 'mauve', 2250)
];

export const canvas2024: YearStat[] = [
    new YearStat(
        'text', 'left', 'person', undefined, 
        [
            new ContentPair('p', '1912 users from 305 instances placed pixels on the canvas in 2024. (Down 292 users from 2023)'),
            new ContentPair('p', '206 returning users from 2023')]
    ),
    new YearStat(
        'text', 'right', 'grid_view', undefined, [new ContentPair('p', '642643 total pixels placed on the canvas. (Up 14,227 pixels from 2023)')]
    ),
    new YearStat(
        'colorCount', 'left', undefined, 'Pixels by color (Click on a slice to view the Canvas with only that color)', [new ContentPair('year', '2024')]
    ),
    new YearStat(
        'text', 'right', 'layers', undefined,
        [new ContentPair('p', '409046 are the final pixels on the canvas, making the canvas 81.8092% covered at the end of the event. (Up 27.6436% from 2023, but the canvas was twice as big in 2023')]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixels placed per minute', [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/pixels-placed-per-minute.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/pixels-placed-per-minute.png" alt="Pixels placed per minute" /></a>')]
    ),
    new YearStat(
        'text', 'left', 'kid_star', undefined,
        [new ContentPair('p', '1427 pixels were placed at (10,262) making it the coordinate with the most pixels')]
    ),
    new YearStat(
        'userList', 'right', undefined, 'The users that contributed to the top pixel were:',
        [
            new ContentPair('142446@toast.ooo', '1414 times'),
            new ContentPair('Kelo@lemmy.world', '7 times'),
            new ContentPair('hemko@lemmy.dbzer0.com', '2 times'),
            new ContentPair('ategon@programming.dev', '1 time'),
            new ContentPair('grant@grants.cafe', '1 time'),
            new ContentPair('EXtremeExploit@lemmy.world', '1 time'),
            new ContentPair('hdggDalton@toast.ooo', '1 time'),
        ]
    ),
    new YearStat(
        'image', 'left', undefined, 'Pixel Heat Map', 
        [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/heatmap-with-legend.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/heatmap-with-legend.png" alt="2024 Pixel Heat Map" /></a>')]
    ),
    new YearStat(
        'text', 'right', 'undo', undefined,
        [new ContentPair('p', '15724 pixels were undone by 1101 users (Up 5,009 pixels from 2023)')]
    ),
    new YearStat(
        'text', 'left', 'delete_forever', undefined,
        [new ContentPair('p', '13 users undid every pixel they placed. (Up 9 users from 2023)')]
    ),
    new YearStat(
        'generate', 'right', 'dashboard_customize', 'Generate a Custom Canvas Image',
        [
            new ContentPair('Canvas at end of event', 'draw.html?sentFrom=home&year=2024'),
            new ContentPair('Just the pixels that where undone', 'draw.html?sentFrom=home&year=2025&undo=true'),
            new ContentPair('Reverse Order', 'draw.html?sentFrom=home&year=2024&reverse=true'),
            new ContentPair('Something Else', 'advanced-search.html')
            // new ContentPair('Uncontested pixels', ''),
            // new ContentPair('Generate somthing else', 'more')
        ]
    ),
    new YearStat(
        'externalLinks', 'left', 'link', undefined, [
            new ContentPair('View the 2024 Atlas', 'https://atlas.mariusdavid.fr/')
        ]
    ),
    new YearStat('social', 'right', undefined, undefined, [])
];

export const colorCounts2024: ColorCount[] = [
    new ColorCount('#000000', 'black', 119773),
    new ColorCount('#ffffff', 'white', 55152),
    new ColorCount('#F30F0C', 'red', 54053),
    new ColorCount('#FDE111', 'yellow', 35911),
    new ColorCount('#0334BF', 'blue', 34210),
    new ColorCount('#149CFF', 'azure', 32045),
    new ColorCount('#8DF5FF', 'aqua', 28753),
    new ColorCount('#242367', 'navy', 27663),
    new ColorCount('#FFA4D0', 'pink', 23204),
    new ColorCount('#B9C3CF', 'light grey', 20011),
    new ColorCount('#18862F', 'dark green', 15849),
    new ColorCount('#61E021', 'green', 15535),
    new ColorCount('#777F8C', 'medium grey', 13057),
    new ColorCount('#1F1E26', 'dark grey', 12810),
    new ColorCount('#424651', 'deep grey', 12730),
    new ColorCount('#FFFFA5', 'pastel yellow', 12417),
    new ColorCount('#FF9F17', 'orange', 12336),
    new ColorCount('#A630D2', 'purple', 12185),
    new ColorCount('#531D8C', 'dark purple', 10896),
    new ColorCount('#99011A', 'rose', 8750),
    new ColorCount('#7C3F20', 'chocolate', 8724),
    new ColorCount('#F14FB4', 'magenta', 8536),
    new ColorCount('#FFD2B1', 'beige', 8040),
    new ColorCount('#F66E08', 'rust', 7950),
    new ColorCount('#C06F37', 'brown', 6996),
    new ColorCount('#E973FF', 'mauve', 6421),
    new ColorCount('#054523', 'forest', 5975),
    new ColorCount('#382215', 'dark chocolate', 5388),
    new ColorCount('#16777E', 'dark teal', 5216),
    new ColorCount('#01BFA5', 'light teal', 5153),
    new ColorCount('#550022', 'maroon', 4887),
    new ColorCount('#B1FF37', 'lime', 4168),
    new ColorCount('#FEAD6C', 'peach', 4138),
    new ColorCount('#FF7872', 'watermelon', 3711)
];

export const canvas2023: YearStat[] = [
    new YearStat(
        'text', 'left', 'person', undefined, 
        [
            new ContentPair('p', '2204 users from 132 instances placed pixels on the canvas in 2023'),]
    ),
    new YearStat(
        'text', 'right', 'grid_view', undefined, [new ContentPair('p', '628416 total pixels placed on the canvas')]
    ),
    new YearStat(
        'colorCount', 'left', undefined, 'Pixels by color (Click on a slice to view the Canvas with only that color)', [new ContentPair('year', '2023')]
    ),
    new YearStat(
        'text', 'right', 'layers', undefined,
        [new ContentPair('p', '541666 are the final pixels on the canvas, making the canvas 54.1666% covered at the end of the event')]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixels placed per minute', [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/pixels-placed-per-minute.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/pixels-placed-per-minute.png" alt="Pixels placed per minute" /></a>')]
    ),
    new YearStat(
        'text', 'right', 'kid_star', undefined,
        [new ContentPair('p', '170 pixels were placed at (175, 171) making it the coordinate with the most pixels')]
    ),
    new YearStat(
        'userList', 'left', undefined, 'The users that contributed to the top pixel were:',
        [
            new ContentPair('Depress_mode@lemmy.world', '83 times'),
            new ContentPair('Kalcifer@lemmy.world', '77 times'),
            new ContentPair('anonymous1691293996@lemmy.world', '4 times'),
            new ContentPair('anonymous1691294527@lemmy.world', '3 times'),
            new ContentPair('anonymous1691296202@lemmy.world', '1 time'),
            new ContentPair('bstix@feddit.dk', '1 time'),
            new ContentPair('Wilker@lemmy.blahaj.zone', '1 time'),
        ]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixel Heat Map', 
        [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/heatmap-with-legend.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/heatmap-with-legend.png" alt="2023 Pixel Heat Map" /></a>')]
    ),
    new YearStat(
        'text', 'left', 'undo', undefined,
        [new ContentPair('p', '10715 pixels were undone by 1000 users')]
    ),
    new YearStat(
        'text', 'right', 'delete_forever', undefined,
        [new ContentPair('p', '4 users undid every pixel they placed')]
    ),
    new YearStat(
        'generate', 'left', 'dashboard_customize', 'Generate a Custom Canvas Image',
        [
            new ContentPair('Canvas at end of event', 'draw.html?sentFrom=home&year=2023'),
            new ContentPair('Just the pixels that where undone', 'draw.html?sentFrom=home&year=2023&undo=true'),
            new ContentPair('Reverse Order', 'draw.html?sentFrom=home&year=2025&reverse=true'),
            new ContentPair('Something Else', 'advanced-search.html')
            // new ContentPair('Uncontested pixels', ''),
            // new ContentPair('Generate somthing else', 'more')
            // new ContentPair('any more to add?', '')
        ]
    ),
    new YearStat('social', 'right', undefined, undefined, [])
];

export const colorCounts2023: ColorCount[] = [
    new ColorCount('#000000', 'black', 121862),
    new ColorCount('#0334BF', 'blue', 58026),
    new ColorCount('#F30F0C', 'red', 54855),
    new ColorCount('#149CFF', 'azure', 33077),
    new ColorCount('#FDE111', 'yellow', 32074),
    new ColorCount('#ffffff', 'white', 23617),
    new ColorCount('#B9C3CF', 'light grey', 19997),
    new ColorCount('#1F1E26', 'dark grey', 19331),
    new ColorCount('#18862F', 'dark green', 19041),
    new ColorCount('#F66E08', 'rust', 18874),
    new ColorCount('#FFA4D0', 'pink', 18315),
    new ColorCount('#242367', 'navy', 17385),
    new ColorCount('#A630D2', 'purple', 17095),
    new ColorCount('#777F8C', 'medium grey', 15380),
    new ColorCount('#FF9F17', 'orange', 14582),
    new ColorCount('#424651', 'deep grey', 13601),
    new ColorCount('#8DF5FF', 'aqua', 12381),
    new ColorCount('#61E021', 'green', 12366),
    new ColorCount('#99011A', 'rose', 10791),
    new ColorCount('#E973FF', 'mauve', 9951),
    new ColorCount('#7C3F20', 'chocolate', 9491),
    new ColorCount('#054523', 'forest', 9253),
    new ColorCount('#FFFFA5', 'pastel yellow', 8397),
    new ColorCount('#C06F37', 'brown', 8384),
    new ColorCount('#FF7872', 'watermelon', 7127),
    new ColorCount('#FEAD6C', 'peach', 5668),
    new ColorCount('#01BFA5', 'light teal', 5596),
    new ColorCount('#B1FF37', 'lime', 5450),
    new ColorCount('#FFD2B1', 'beige', 4723),
    new ColorCount('#16777E', 'dark teal', 4601),
    new ColorCount('#F14FB4', 'magenta', 4430),
    new ColorCount('#550022', 'maroon', 4143)
];