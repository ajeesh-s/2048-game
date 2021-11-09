import React from 'react';
import { useGlobalState } from '../context';
import startImg from '../assets/img/2048.png';

const HeaderComponent = (props) => {
    const { score } = props;
    const globalState = useGlobalState().globalState;
    console.log(globalState)
    return (
        <>
            <div className="header row">
                <div className="gamename">
                    <img className="shadow" src={startImg} style={{ height: '150px' }} />
                </div>
            </div>
            <div class="d-flex justify-content-between font-fam">
                <div>
                    <button type="button" class="btn btn-outline-primary shadow">{`Score`}<h2 class="card-title">{`${score}`}</h2></button>
                </div>
                <div>
                    <button type="button" class="btn btn-outline-primary shadow">{`High Score`}<h2 class="card-title">{`${globalState.highScore}`}</h2></button>
                </div>
            </div>
        </>
    );
}
export default HeaderComponent