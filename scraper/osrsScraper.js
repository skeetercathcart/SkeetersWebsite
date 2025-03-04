const puppeteer = require('puppeteer');


async function weaponScrape(url, page) {

    console.log('Going to url: ' + url);
    await page.goto(url); 

    // Find the table that contains the combat information, find the rows, then use querySelector to structure data such that each row returns data that is related to each other
    const styleData = await page.$$eval("table.wikitable.combat-styles tr", rows => {
        return rows.slice(2).map(row => { // Slice skips first two empty rows. There is one tr that is "mw-empty-elt" and then the header row
            const columns = row.querySelectorAll('td');
            return [...Array.from(columns).slice(1,5), columns[columns.length - 1]].map(col => col.innerText) // Slice skips image cell and the rest of the irrelevant info
        }
        )
    })

    // Grabs the image from what is used in-game
    const imageUrl = await page.$eval(".infobox-image img", images => {
        return images.src 
    })

    const wepName = await page.$eval(".mw-page-title-main", name => {
        return name.innerText
    })

    const bonusData = await page.$$eval(".infobox-bonuses td.infobox-nested", bonuses => {
        return bonuses.map(bonus => bonus.innerText)
    })

    const cleanBonus = bonusData.flat()
                    .filter((item => item.trim() !== '')) //remove any empty cells (usually from cells with images)
                    .map(item=> item.replace(/[+%]/g, '')) //replace '+' and '%' so that Number storage is possible
                    .join(',')
                    .split(',')

    const bonuses = {
        attack: {
            slash: cleanBonus[0],
            stab: cleanBonus[1],
            crush: cleanBonus[2],
            range: cleanBonus[3],
            magic: cleanBonus[4] 
        },
        defense: {
            slash: cleanBonus[5],
            stab: cleanBonus[6],
            crush: cleanBonus[7],
            range: cleanBonus[8],
            magic: cleanBonus[9] 
        },
        strength: cleanBonus[10],
        rangeStrength: cleanBonus[11],
        mageStrength: cleanBonus[12],
        prayer: cleanBonus[13] 
    }

    let attackStyles = {}

    styleData.forEach((style, index) => {
        attackStyles[`style${index + 1}`] = {
            combatStyle: style[0],
            attackType: style[1],
            weaponStyle: style[2],
            attackSpeed: style[3][0] === " " ? styleData[0][3][0] : style[3][0], // Set all entries to match the first if weapon does not vary in attack speed between styles
            levelBoost: style[4]
        };
    });

    //const attackSpeed = await page.$$eval('table.wikitable.combat-styles tr')
    
    
    console.log('weapon name: ' + wepName)
    console.log('imageUrl: ' + imageUrl);
    console.log('bonusData: ' + bonusData)
    console.log('combatData text: ' + styleData);

    const weaponData = {name: wepName, weaponType: "", attackStyles: attackStyles, bonuses: bonuses, isTwoHanded: false, imageUrl: imageUrl}

    console.log('returning weapon data')
    

    return ( weaponData )

    
}

async function tableScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal OSRS Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 

    // # is for id
    // . is for class name

    //                                                               how many items to get   how many columns to get (the name)
    const data = await page.$$eval("table.wikitable.jquery-tablesorter tr:nth-child(-n+30) td:nth-child(-n+2):nth-child(-n+3)", rows => {
        return rows.slice(1).map(row => row.innerText)
    })

    const cleanData = data.flat()
                    .filter((item => item.trim() !== '')) //remove any empty cells (usually from cells with images)
                    .map(item=> item.replace(/[+%]/g, '')) //replace '+' and '%' so that Number storage is possible
                    .join(',')
                    .split(',') // Turn into array


    console.log('data text: ' + data );
    console.log('clean data: ' + cleanData);
    const exampleUrl = 'https://oldschool.runescape.wiki/w/' + cleanData[17]

    const wepData = await weaponScrape(exampleUrl, page);

    console.log("RETURNED WEAPON DATA: " + JSON.stringify(wepData))

    try {
        const response = await fetch('http://localhost:3500/api/addWeapon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wepData),
        });
        if (!response.ok) {
           throw new Error('API Had An Oopsie')
        }
        console.log('API Message')
        } catch (error) {
            console.error('Error:', error.message);
        }


    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');

    
}

tableScrape('https://oldschool.runescape.wiki/w/Weapon_slot_table')