const { PlaywrightCrawler } = require('crawlee');

const runSampleCrawl = async (startUrl) => {
  const crawler = new PlaywrightCrawler({
    async requestHandler({ request, log }) {
      log.info(`Visited ${request.url}`);
    }
  });

  await crawler.run([startUrl]);
};

module.exports = {
  runSampleCrawl
};
