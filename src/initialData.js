let out = [];

const pixelSize = 30;
const pixelsInRow = 20;
const padding = 20;

let offset = (pixelsInRow / 2 - 1) * pixelSize + padding;

let general = {    
    fill: '#e1e1e1', 
    width: pixelSize, 
    height: pixelSize, 
    stroke: 'white',
    strokeWidth: 2,
    isEmpty: true,
}

for (let _x = -(pixelsInRow / 2 - 1); _x <= pixelsInRow / 2; _x += 1) {
    for (let _y = -(pixelsInRow / 2 - 1); _y <= pixelsInRow / 2; _y += 1) {
        out.push({_x, _y, x: offset + pixelSize * _x, y: offset + pixelSize * _y, ...general});
    }
}

export default out;