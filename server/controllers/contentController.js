const path = require('path');
const fs = require('fs/promises');

let cachedContent = null;
let cachedAt = null;
const cacheTtlMs = 1000 * 60 * 10;

const loadContent = async () => {
  const now = Date.now();
  if (cachedContent && cachedAt && now - cachedAt < cacheTtlMs) {
    return cachedContent;
  }

  const filePath = path.join(__dirname, '..', 'data', 'content.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  cachedContent = JSON.parse(fileContents);
  cachedAt = now;
  return cachedContent;
};

const getContent = async (req, res, next) => {
  try {
    const content = await loadContent();
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

module.exports = { getContent };
