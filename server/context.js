const fs = require('fs-extra');
const path = require('path');

module.exports = {
  getContext: () => {
    
    const contextData = fs.readJsonSync(
      path.resolve(process.cwd(), 'src/data/data.json'));
    const meta = fs.readJsonSync(
      path.resolve(process.cwd(), 'meta.json'));

    const templateContext = {
      META: meta,
      DATA: contextData,
      
      ENV: process.env.NODE_ENV,
    };

    return templateContext;
  }
}
