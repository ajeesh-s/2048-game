import React  from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import gameOverImg from '../assets/img/game-over.jpeg';
import startImg from '../assets/img/2048.png';
import winImg from '../assets/img/congrats.png';
import highScoreImg from '../assets/img/high-score.jpeg';
import { alertTypes } from './Utils';

const showAlert = (type, newGameOnClick) => {
    const swalAlert = withReactContent(Swal);
    switch (type) {
        case alertTypes.START:
            swalAlert.fire({
                title: <div><img src={startImg} style={{ height: '150px' }} /><p>Welcome</p></div>
            }).then(() => {
                return swalAlert.fire({
                    title: <p>Let's play</p>,
                    confirmButtonText: 'Start Game',
                    didClose: () => newGameOnClick()

                })
            })
            break;
        case alertTypes.GAMEOVER:
            swalAlert.fire({
                title: <img src={gameOverImg} style={{ height: '200px' }} />
            }).then(() => {
                return swalAlert.fire({
                    title: <p>Come on play again...</p>,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Play Again',
                    didClose: () => newGameOnClick()

                })
            })
            break;
        case alertTypes.WON:
            swalAlert.fire({
                title: <img src={winImg} style={{ height: '200px' }} />
            }).then(() => {
                return swalAlert.fire({
                    title: <p>Let's play again...</p>,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Play Again',
                    didClose: () => newGameOnClick()

                })
            })
            break;
        case alertTypes.INSTRUCTIONS:
            swalAlert.fire({
                title: <div><p className="instructions">HOW TO PLAY: Use your arrow keys to move the tiles.
                    Tiles with the same number merge into one when they touch. Add them up to reach 2048!</p></div>
            })
            break;
        case alertTypes.HIGHSCORE:
            swalAlert.fire({
                title: <p>Wow...New High Score.</p>,
                iconHtml: <img src={highScoreImg} style={{height:'150px'}}/>
            })
            break;
    }
}
export default showAlert