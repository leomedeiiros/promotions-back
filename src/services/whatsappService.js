const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.sendMessage = async (message, chatName) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: false // WhatsApp precisa ser visível
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com/', { waitUntil: 'networkidle0' });

    await page.waitForSelector('._3uIPm', { timeout: 120000 });
    await wait(3000);

    const chatSearch = await page.$('._2vDPL');
    await chatSearch.click();
    await page.keyboard.type(chatName);
    await wait(1000);

    const firstChat = await page.$('._8nE1Y');
    if (firstChat) {
      await firstChat.click();
      await wait(1000);

      const messageBox = await page.$('.iq0m558w');
      await messageBox.click();

      await page.evaluate((text) => {
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', text);
        const event = new ClipboardEvent('paste', {
          clipboardData: dataTransfer,
          bubbles: true
        });
        document.querySelector('.iq0m558w').dispatchEvent(event);
      }, message);

      await wait(1000);
      await page.keyboard.press('Enter');
      await wait(2000);

      return true;
    } else {
      throw new Error('Chat não encontrado');
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem pelo WhatsApp:', error);
    throw new Error('Falha ao enviar mensagem pelo WhatsApp');
  } finally {
    setTimeout(async () => {
      await browser.close();
    }, 5000);
  }
};
