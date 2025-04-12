const puppeteer = require('puppeteer');

// Function to scrape an individual weapon page and return bonuses, attack styles, and image url
async function weaponPageScrape(url, page) {

    console.log('Going to url: ' + url);
    try {
        await page.goto(url, { timeout: 90000 });
    } catch (err) {
        throw new Error(`Timeout or navigation failed for ${url}`);
    }

    console.log('finding styles')

    const manualEnter = await page.$('.rsw-synced-switch') // table class that signifies an item has different values based on item status

    let styleData = []


    /* Weapons that require charges store different values for some things in the style table 
       I cannot figure out how to scrape the values accurately so it is skipping these items for the time being */
    if(manualEnter) {
        console.log('Enter Manually')
        return ('Skip')
    } else {
        styleData = await page.$$eval("table.wikitable.combat-styles tr", rows => {
            return rows.slice(2).map(row => { // Slice skips first two empty rows. There is one tr that is "mw-empty-elt" and then the header row
                const columns = row.querySelectorAll('td');
                return [...Array.from(columns).slice(1,5), columns[columns.length - 1]].map(col => col.innerText) // Slice skips image cell and the rest of the irrelevant info
            }
            )
        })
    }
    console.log('styles found')


    // Grabs the image from what is used in-game
    const imageURL = await page.$eval(".infobox-image img", images => {
        return images.src 
    })
    console.log('image found')

    /*const wepName = await page.$eval(".mw-page-title-main", name => {
        console.log('name found')
        return name.innerText
    })*/

    const bonusData = await page.$$eval(".infobox-bonuses td.infobox-nested", bonuses => {
        return bonuses.map(bonus => bonus.innerText)
    })
    console.log('bonuses found')

    const cleanBonus = bonusData.flat()
                    .filter((item => item.trim() !== '')) //remove any empty cells (usually from cells with images)
                    .map(item=> item.replace(/[+%]/g, '')) //replace '+' and '%' so that Number storage is possible
                    .join(',')
                    .split(',')

    const bonuses = {
        attack: {
            stab: cleanBonus[0],
            slash: cleanBonus[1],
            crush: cleanBonus[2],
            range: cleanBonus[3],
            magic: cleanBonus[4] 
        },
        defense: {
            stab: cleanBonus[5],
            slash: cleanBonus[6],
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
    
    const weaponData = {attackStyles: attackStyles, bonuses: bonuses, isTwoHanded: false, imageURL: imageURL} 
    return ( weaponData )

    
}

// Function to scrape an individual non-weapon page and return bonuses, image url, and item slot

async function gearPageScrape(url, page) {

    console.log('Going to URL: ' + url);
    await page.goto(url, {timeout: 120000}); 
    


    const slot  = await page.$$eval(".infobox-bonuses tr:nth-last-child(-n+3) th:last-child img", slots =>  {
        return slots.map(slot => slot.alt)
    })

    const slotString = slot[0].split(' ')[0];
  
    const imageURL = await page.$eval(".infobox-image img", images => {
        return images.src 
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

    const gearData = {bonuses: bonuses, imageURL: imageURL, slot: slotString}
        
    return ( gearData )

    
}

// Function to go through a list of items, given a particular item slot and return item names of all corresponding items
async function tableScrape(table) {

    const url = `https://oldschool.runescape.wiki/w/${table}_slot_table`
    console.log('Getting items from: ' + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal OSRS Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 


    const data = await page.$$eval("table.wikitable.jquery-tablesorter tr td:nth-child(-n+2):nth-child(-n+3)", rows => {
        return rows.slice(1).map(row => row.innerText)
    })

    const cleanData = data.flat()
                    .filter((item => item.trim() !== '')) 
                    .map(item=> item.replace(/[+%]/g, ''))
                    .join(',')
                    .split(',') // Turn into array


 
    if(table === 'Weapon') {

        for (const index of cleanData.slice(350)) {
            let wepUrl = 'https://oldschool.runescape.wiki/w/' + index;
        
            let wepData;
            try {
                wepData = await weaponPageScrape(wepUrl, page);
            } catch (err) {
                console.error(`Failed to scrape ${index} — ${err.message}`);
                continue; 
            }
        
            if (wepData === 'Skip') {
                continue;
            }
        
            const reqBody = {
                name: index,
                ...wepData
            };
        
            try {
                const response = await fetch('http://localhost:3500/api/addWeapon', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                });
        
                if (!response.ok) {
                    throw new Error(`API response not OK for ${index}`);
                }
        
                console.log(`Added new item: ${index}`);
            } catch (error) {
                console.error(`Error saving ${index}: ${error.message}`);
            }
        }       
    } else {
        console.log('scraping gear');
        for (const index of cleanData) {
            let gearUrl = 'https://oldschool.runescape.wiki/w/' + index;
            let gearData = await gearPageScrape(gearUrl, page);
            let reqBody = {
                    name: index,
                    ...gearData
                }
            try {
                const response = await fetch('http://localhost:3500/api/addGear', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                });
                if (!response.ok) {
                    throw new Error('API Had An Oopsie')
                }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }
        }    
    
 
    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');

    
}

tableScrape('Weapon')

async function gearTestScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal OSRS Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 
    


    const slot  = await page.$$eval(".infobox-bonuses tr:nth-last-child(-n+3) th:last-child img", slots =>  {
        return slots.map(slot => slot.alt)
    })
    console.log('slot found: ' + slot)

    const slotString = slot[0].split(' ')[0];
    console.log('slotString: ' + slotString)
    
    // Grabs the image from what is used in-game
    const imageURL = await page.$eval(".infobox-image img", images => {
        return images.src 
    })
    console.log('image found: ' + imageURL)

    const bonusData = await page.$$eval(".infobox-bonuses td.infobox-nested", bonuses => {
        return bonuses.map(bonus => bonus.innerText)
    })
    console.log('bonuses found')

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
        

    console.log('bonuses: ' + JSON.stringify(bonuses))
    
    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');
    return ( "complete" )

    
}


// function that takes a bestiary page url, scrapes all individual monster pages from the list, then adds monster to database
async function monsterFullScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal OSRS Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 

    /* Gets all info from each row
    const tableData = await page.$$eval(".wikitable", tables => {
        return tables.map(table => Array.from(table.querySelectorAll("tr")).map(row => 
            Array.from(row.querySelectorAll("td")).slice(0,14).map(td => td.innerText.trim()).filter(item => item !== "")
        ).filter(row => row.length > 0)); // Remove empty rows
    }); */

    // Gets href for each monster in an array
    const hrefData = await page.$$eval(".wikitable tr td a", tables => {
        return tables.map(table => table.href)
    });

  
    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');
    return ( "complete" )

}


// Function to scrape an individual monster page to return size, attack style, attack speed, and attribute(s)
async function monsterPageScrape(url, page) {

    console.log("Entering monsterPageScrape with URL: " + url)

    await page.goto(url, {timeout: 90000})

    // To find Attack Speed
    let attackSpeed = ''
    const attackSpeedHeader = await page.$('a[title ="Monster attack speed"]'); // Find the <a> with the corresponding title
    
    if (attackSpeedHeader) {
        attackSpeed = await page.evaluate(el => {
        const attackSpeedParent = el.parentElement; // Find the <th> containing the <a> above
                return attackSpeedParent?.nextElementSibling?.innerText.trim() || null; // Get the sibling element of the <th> that contains the text 
            }, attackSpeedHeader);
    } else {
        console.log("Attack Speed not found")
    }

    // To find Combat Level
    let combatLevel = ''
    const combatLevelHeader = await page.$('a[title ="Combat level"]'); // Find the <a> with the corresponding title
    
    if (combatLevelHeader) {
        combatLevel = await page.evaluate(el => {
        const combatLevelParent = el.parentElement; // Find the <th> containing the <a> above
                return combatLevelParent?.nextElementSibling?.innerText.trim() || null; // Get the sibling element of the <th> that contains the text 
            }, combatLevelHeader);
    } else {
        console.log("Combat level not found")
    }

    // To find Monster Size
    let monsterSize = ''
    const monsterSizeHeader = await page.$('a[title ="Size"]'); // Find the <a> with the corresponding title
    
    if (monsterSizeHeader) {
        monsterSize = await page.evaluate(el => {
        const monsterSizeParent = el.parentElement; // Find the <th> containing the <a> above
                return monsterSizeParent?.nextElementSibling?.innerText.trim() || null; // Get the sibling element of the <th> that contains the text 
            }, monsterSizeHeader);
    } else {
        console.log("Monster Size not found")
    }

    // To find attack style
    let attackStyle = ''
    const attackStyleHeader = await page.$('a[title ="Combat Options"]'); // Find the <a> with the corresponding title
    
    if (attackStyleHeader) { 
        attackStyle = await page.evaluate(el => {
        const attackStyleParent = el.parentElement; // Find the <th> containing the <a> above
            return attackStyleParent?.nextElementSibling?.innerText.trim() || null; // Get the sibling element of the <th> that contains the text 
            }, attackStyleHeader);
        
    } else {
        console.log("Monster Attack Style not found")
    }
    
    // To find monster attribute
    let monsterAttribute = ''
    const monsterAttributeHeader = await page.$('a[title ="Monster attribute"]'); // Find the <a> with the corresponding title
    
    if ( monsterAttributeHeader ) {
        monsterAttribute = await page.evaluate(el => {
        const monsterAttributeParent = el.parentElement; // Find the <th> containing the <a> above
                return monsterAttributeParent?.nextElementSibling?.innerText.trim() || null; // Get the sibling element of the <th> that contains the text 
            }, monsterAttributeHeader);
    } else {
        console.log("Monster Attribute not found")
    }

    // To find the image URL
    const imageURL = await page.$eval(".infobox-image img", images => {
        return images.src 
    })
    console.log('image found: ' + imageURL)

    const combatInfo = await page.$$eval(".infobox-nested", header => {
        
        const infoboxArray = header.map(el => el.innerText).filter(item => item !== '')
        const combatJSON = {
            combatStats: {
                hitpoints: infoboxArray[0],
                attack: infoboxArray[1],
                strength: infoboxArray[2], 
                defense: infoboxArray[3],
                magic: infoboxArray[4],
                ranged: infoboxArray[5],
            },
            attackBonuses: {
                attack: infoboxArray[6],
                strength: infoboxArray[7],
                magic: infoboxArray[8],
                magicStrength: infoboxArray[9],
                ranged: infoboxArray[10],
                rangedStrength: infoboxArray[11], 
            },
            defenceBonuses: {
                stab: infoboxArray[12],
                slash: infoboxArray[13],
                crush: infoboxArray[14],
                magic: infoboxArray[15],
                elemental: infoboxArray[16],
                lightRanged: infoboxArray[17],
                mediumRanged: infoboxArray[18],
                heavyRanged: infoboxArray[19],
            }
        }
        return combatJSON
    })

    const monster = { imageURL: imageURL, combatLevel: combatLevel, attackStyle: attackStyle, attackSpeed: attackSpeed, size: monsterSize, attribute: monsterAttribute, 
                      combatStats: combatInfo.combatStats, attackBonuses: combatInfo.attackBonuses, defenceBonuses: combatInfo.defenceBonuses }


    return { monster }


}


async function monsterTestScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal OSRS Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 

    // Gets href for each monster in an array
    const hrefData = await page.$$eval(".wikitable tr td a", tables => {
        return tables.map(table => table.href).filter(item => item !== "https://oldschool.runescape.wiki/w/Members").filter(f2p => f2p !== "https://oldschool.runescape.wiki/w/Free-to-play")
    });

    for(let index = 174; index < hrefData.length; index++) {

        let monsterData = await monsterPageScrape(hrefData[index], page)
        let reqBody = {}
        try {
            reqBody = {
                name: hrefData[index].replace("https://oldschool.runescape.wiki/w/", "").replace(/_/g, " "),
                ...monsterData.monster
            }
    
            console.log("reqBody: " + JSON.stringify(reqBody))
            const response = await fetch('http://localhost:3500/api/addMonster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            if (!response.ok) {
                throw new Error('API Had An Oopsie')
            }
            } catch (error) {
                console.error('Error:', error.message);
            } 

    }
    
 
    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');
    return ( "complete" )

    
}


// monsterTestScrape("https://oldschool.runescape.wiki/w/Bestiary/Slayer_assignments_(A_to_B)")
