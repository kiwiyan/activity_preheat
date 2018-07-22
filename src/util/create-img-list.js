const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, '../../static/img'), (err, files) => {
    if (err) {
        console.log('err:', err);
        return;
    }
    fs.writeFile(path.resolve(__dirname, 'imglist.js'), `export default ${JSON.stringify(files, null, 4)};`, (err) => {
        if (err) {
            console.log('err:', err)
        }
        console.log('生成图片列表ok！');
    })
})