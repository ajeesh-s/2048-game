import React from 'react';
import { getColour } from '../utilities/Utils';
const Cubicleomponent = (props) => {
    const {data} = props;
    console.log("cube",data)
    return (
        <div className="col-3 board-square"  style={{ background: getColour(data), color: data !== 0 && '#645B52' }}>
                <div className="cubicle typing">{data===0?'':data}</div>
        </div>
    );
}
export default Cubicleomponent