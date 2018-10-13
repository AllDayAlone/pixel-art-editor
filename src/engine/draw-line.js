import {mirror, normalize} from './utils';

export const drawLineBrezenham = (from, to) => {
    let [x0, y0] = from;
    let [x1, y1] = to;

    if (x1 < x0) {
        return drawLineBrezenham(to, from);
    }

    let deltaX = Math.abs(x1 - x0);
    let deltaY = Math.abs(y1 - y0);
    
    if (deltaY > deltaX) {
        let lineArray = drawLineBrezenham(mirror(from), mirror(to));

        return lineArray.map(mirror);
    }
    
    let error = 0;
    let deltaError = deltaY;
    let y = y0;
    let dirY = normalize(y1 - y0);
    let out = [];

    for (let x = x0; x <= x1; x++) {
        out.push([x, y]);
        error = error + deltaError;
        if (2 * error >= deltaX) {
            y = y + dirY;
            error = error - deltaX;
        }
    }
    
    return out;
}


