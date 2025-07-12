const puppeteer = require('puppeteer');

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

    // Get infobox information (stats)
    const elementInfo = await page.$$eval('table.infobox tr th span a img', element => {
        return (element.map(el => el.alt)[21])
    })
    const combatInfo = await page.$$eval(".infobox-nested", (header, elementInfo) => {
        
        const infoboxArray = header.map(el => el.innerText).filter(item => item !== '')
        
        if(elementInfo !== "No elemental weakness") {
                elementInfo = elementInfo.split(' ')[0];
                infoboxArray[16] = infoboxArray[16].split(' ')[0].slice(0, -1)
            } else {
                elementInfo = "None";
                infoboxArray[16] = "0";
            }

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
                weakElement: elementInfo,
                weaknessBonus: infoboxArray[16],
                lightRanged: infoboxArray[17],
                mediumRanged: infoboxArray[18],
                heavyRanged: infoboxArray[19],
            }
        }
        return combatJSON
    }, elementInfo)

    const monster = { imageURL: imageURL, combatLevel: combatLevel, attackStyle: attackStyle, attackSpeed: attackSpeed, size: monsterSize, attribute: monsterAttribute, 
                      combatStats: combatInfo.combatStats, attackBonuses: combatInfo.attackBonuses, defenceBonuses: combatInfo.defenceBonuses }


    return { monster }


}

async function monsterFullScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal OSRS Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 

   // Gets href for each monster in an array
    const hrefData = await page.$$eval(".wikitable tr td:nth-child(2) a", tables => {
        return tables.map(table => table.href)
    });

    let searchIndex = 0; 

    for(index in hrefData) {

        console.log("Current Index: " + searchIndex)
        // Create sub-page to force loading of proper data given the URI anchor (i.e. different level/variants)
        const subPage = await browser.newPage() 
        let monsterData = await monsterPageScrape(hrefData[index], subPage)
        let reqBody = {}
        try {
            reqBody = {
                name: hrefData[index].replace("https://oldschool.runescape.wiki/w/", "").replace(/_/g, " "), // Name taken from URI minus wiki and underscore(s)
                ...monsterData.monster // Rest of monster data comes from scraped page
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
            await subPage.close()
            searchIndex += 1;
    }
    
    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');
    return ( "complete" )

    
}

async function scrapeTest(url, page) {

    console.log("Entering monsterPageScrape with URL: " + url)

    await page.goto(url, {timeout: 90000})

    const elementInfo = await page.$$eval('table.infobox tr th span a img', element => {
        return (element.map(el => el.alt)[21])
    })
    
    console.log("element info: " + elementInfo)

    return 
}

async function monsterTestScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal OSRS Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 

   // Gets href for each monster in an array
    const hrefData = ["https://oldschool.runescape.wiki/w/Aberrant_spectre", "https://oldschool.runescape.wiki/w/Aviansie#Level_97_(2)", "https://oldschool.runescape.wiki/w/Ankou#Level_86", "https://oldschool.runescape.wiki/w/Vorkath#Dragon_Slayer_II"]
    let searchIndex = 0; 

    for(index in hrefData) {

        console.log("Current Index: " + searchIndex)
        // Create sub-page to force loading of proper data given the URI anchor (i.e. different level/variants)
        const subPage = await browser.newPage() 
        let monsterData = await scrapeTest(hrefData[index], subPage)
            await subPage.close()
            searchIndex += 1;
    }
    
    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');
    return ( "complete" )

    
}

monsterFullScrape("https://oldschool.runescape.wiki/w/Bestiary/Slayer_assignments_(T_to_Z)")
