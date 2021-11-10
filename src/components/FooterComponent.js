import React from 'react';
import showAlert from '../utilities/Messages';
import { alertTypes } from '../utilities/Utils';

const FooterComponent = (props) => {
    const { newGameOnClick } = props;
    return (
        <div className="header">
            <div class="d-flex justify-content-between">
                <div>
                    <button type="button" class="btn btn-primary btn-sm" onClick={newGameOnClick}>Reset Game</button>
                </div>
                <div>
                    <button type="button" class="btn btn-primary btn-sm" onClick={() => showAlert(alertTypes.INSTRUCTIONS, newGameOnClick)}>Instructions</button>
                </div>
            </div>
        </div>
    );
}
export default FooterComponent