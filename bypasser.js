const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const readline = require('readline');

puppeteer.use(StealthPlugin());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function run() {
    console.log("=== StudyStark Bypasser Professional Suite ===");
    console.log("             Created by Stark                ");
    console.log("1. Auto Mode (Full Automation)");
    console.log("2. Semi-Auto Mode (Confirm clicks in terminal)");
    console.log("3. Manual Mode (Script only opens browser)");
    
    const choice = await askQuestion("Select Mode (1/2/3): ");
    
    if (choice === '3') {
        console.log("Opening browser in Manual Mode...");
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://studystark.com/verify-task/');
        return;
    }

    const isSemiAuto = choice === '2';
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    async function smartClick(selector, label, isOptional = false) {
        try {
            await page.waitForSelector(selector, { visible: true, timeout: isOptional ? 5000 : 60000 });
            if (isSemiAuto) {
                await askQuestion(`[Semi-Auto] Ready to click ${label}. Press Enter to proceed...`);
            }
            // Ensure element is in view for visual confirmation
            await page.evaluate((sel) => {
                const el = document.querySelector(sel);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, selector);
            await new Promise(r => setTimeout(r, 500));
            await page.click(selector);
            return true;
        } catch (e) {
            if (!isOptional) console.log(`Could not find ${label}.`);
            return false;
        }
    }

    console.log("Navigating to StudyStark...");
    await page.goto('https://studystark.com/verify-task/', { waitUntil: 'networkidle2' });

    // --- MAIN LOOP ---
    while (true) {
        const url = page.url();
        
        // 1. Google Search Redirect
        if (url.includes('google.com/search')) {
            console.log("Detected Google Search redirect. Finding VidyaRays...");
            const found = await page.evaluate(() => {
                const results = document.querySelectorAll('a');
                for (let res of results) {
                    if (res.href.includes('stark.vidyarays.com')) {
                        res.click();
                        return true;
                    }
                }
                return false;
            });
            if (found) await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
        }

        // 2. StudyStark Start Page
        if (url.includes('studystark.com/verify-task/')) {
            const genBtn = await page.$('#genBtn');
            const goHomeBtn = await page.$('.btn-generate-big');

            if (genBtn) {
                console.log("Clicking Generate Access Key...");
                await smartClick('#genBtn', "Generate Access Key");
                await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
            } else if (goHomeBtn) {
                console.log("Key Generated! Returning Home...");
                await smartClick('.btn-generate-big', "Go Home");
                console.log("\n[SUCCESS] Verification Complete! Script Finished.");
                break;
            }
        }

        // 3. VidyaRays Verification Steps
        if (url.includes('stark.vidyarays.com')) {
            const stepInfo = await page.evaluate(() => {
                const el = document.querySelector('.step-info') || { innerText: 'Unknown' };
                return el.innerText;
            });
            console.log(`Working on Step: ${stepInfo}`);

            // A. Click 'VERIFY NOW' (Top)
            const hasVerify = await smartClick('#verifyBtn', "VERIFY NOW", true);
            
            // B. Click 'CONTINUE' (Bottom)
            // Search by text if selector fails
            const hasContinue = await page.evaluate(() => {
                const all = document.querySelectorAll('span, button, a');
                for (let el of all) {
                    if (el.innerText.trim().toUpperCase() === 'CONTINUE' && el.offsetParent !== null) {
                        el.scrollIntoView();
                        el.click();
                        return true;
                    }
                }
                return false;
            });
            if (hasContinue) console.log("Clicked CONTINUE.");

            // C. Click 'PROCEED' or 'GET LINK'
            console.log("Waiting for final button (Proceed/Get Link)...");
            const finalFound = await page.evaluate(async () => {
                const wait = (ms) => new Promise(r => setTimeout(r, ms));
                while (true) {
                    const proceed = document.querySelector('#pleaseWait');
                    const getLink = document.querySelector('#final-get-link');
                    
                    if (proceed && proceed.innerText.trim().toUpperCase() === 'PROCEED' && proceed.offsetParent !== null) {
                        proceed.scrollIntoView();
                        proceed.click();
                        return "PROCEED";
                    }
                    if (getLink && getLink.offsetParent !== null) {
                        getLink.scrollIntoView();
                        getLink.click();
                        return "GET LINK";
                    }
                    await wait(1000);
                }
            });
            console.log(`Clicked ${finalFound}.`);
            await new Promise(r => setTimeout(r, 2000));
        }

        await new Promise(r => setTimeout(r, 2000));
    }

    console.log("\nPress Enter to close the browser...");
    await askQuestion("");
    await browser.close();
    process.exit();
}

run().catch(error => {
    console.error("An error occurred:", error);
    process.exit(1);
});


