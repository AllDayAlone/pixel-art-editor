import React, {PureComponent} from 'react';
import Konva from 'konva';
import {Rect} from 'react-konva';

export default class Pixel extends PureComponent {
    render() {
        return <Rect {...this.props} />;
    }
}