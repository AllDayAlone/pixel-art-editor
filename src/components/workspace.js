import React, {Component} from 'react';
import Konva from 'konva';
import {Stage, Layer} from 'react-konva';
import { isBoolean } from 'util';

import Pixel from './pixel';
import {drawLineBrezenham} from '../engine';

export default class Workspace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lmbPressed: false,
            pixels: props.pixels,
            from: false,
        };
    }

    colorPixels = (pixels, color, isEmpty) => {
        let newPixels = this.state.pixels.map((oldPixel) => {
            if (pixels.find(([_x, _y]) => oldPixel._x === _x && oldPixel._y === _y)) {
                let newPixel = oldPixel;

                if (newPixel.isEmpty) {
                    newPixel.fill = color;
                }
                if (isBoolean(isEmpty)) {
                    newPixel.isEmpty = isEmpty
                }
                
                return newPixel;
            }

            return oldPixel;
        });

        this.setState({pixels: newPixels});
    }

    onMouseOverHandler = (event) => {
        // for paint tool
        let {_x, _y} = event.target.attrs;
        let targetPoint = [_x, _y];    
        
        if (!this.state.from) {          
            this.colorPixels([targetPoint], '#aaa');
        } else {
            let line = drawLineBrezenham(this.state.from, targetPoint);
            this.colorPixels(line, '#aaa');
        }

        // for paint tool
        // this.props.lmbPressed
        //     ? this.colorPixel('#111', false)
        //     : this.colorPixel('#aaa');        
    }

    onMouseOutHandler = (event) => {
        // for line tool
        let {_x, _y} = event.target.attrs;          
        let targetPoint = [_x, _y];
        
        if (!this.state.from) {          
            this.colorPixels([targetPoint], '#e1e1e1');
        } else {
            let line = drawLineBrezenham(this.state.from, targetPoint);
            this.colorPixels(line, '#e1e1e1');
        }
    }

    onMouseDownHandler = (event) => {   
        this.setState({lmbPressed: true});

        // for line tool
        let {_x, _y} = event.target.attrs;  
        let targetPoint = [_x, _y];
        
        if (!this.state.from) {
            this.setState({from: targetPoint});            
            this.colorPixels([targetPoint], '#111', false);
        } else {
            let line = drawLineBrezenham(this.state.from, targetPoint);
            this.colorPixels(line, '#111', false);
            this.setState({from: false});
        }
    } 

    onMouseUpHandler = (event) => this.setState({lmbPressed: false});

    render() {
        let {pixels, lmbPressed} = this.state;
        let width = pixels[0].width * Math.sqrt(pixels.length) + 60;

        return (
            <Stage width={width} height={width}>
                <Layer
                    onMouseDown={this.onMouseDownHandler}
                    onMouseUp={this.onMouseUpHandler}
                    onMouseOver={this.onMouseOverHandler}
                    onMouseOut={this.onMouseOutHandler}
                >
                    {pixels.map((pixelProps) => <Pixel {...pixelProps} />)}
                </Layer>
            </Stage>
        );
    }
}
