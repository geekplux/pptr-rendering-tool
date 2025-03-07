const { getBrowser } = require('../setup.js');

module.exports = async function render(req, res) {
  const {
    query: { url },
  } = req;

  if (typeof url !== 'string') {
    res.code = 400;
    res.body = 'URL is required.';
    return;
  }

  console.time(url);
  try {
    const page = await (await getBrowser()).newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    rawHtml = await page.content();
    res.statusCode = 200;
    res.setHeader('Content-Type', `text/plain`);
    res.end(rawHtml.toString());
    page.close();
  } catch (e) {
    res.body = 'FAILED: ' + e.message;
    res.code = 400;
    console.error('ERROR', e.message);
  }
  console.timeEnd(url);
};
