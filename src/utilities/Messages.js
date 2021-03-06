import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import gameOverImg from '../assets/img/game-over.jpeg';
import startImg from '../assets/img/2048.png';
import winImg from '../assets/img/congrats.png';
import highScoreImg from '../assets/img/high-score.jpeg';
import { alertTypes } from './Utils';

const showAlert = (type, newGameOnClick, undoOnClick, mileStone) => {
    const swalAlert = withReactContent(Swal);
    switch (type) {
        case alertTypes.START:
            swalAlert.fire({
                title: <div><img src={startImg} style={{ height: '150px' }} /><p>Welcome Let's play</p></div>,
                confirmButtonText: 'Start Game',
                didClose: () => newGameOnClick()
            })
            break;
        case alertTypes.GAMEOVER:
            swalAlert.fire({
                title: <img src={gameOverImg} style={{ height: '200px' }} />,
                showCancelButton: true,
                cancelButtonText: 'Undo',
            }).then((result) => {
                if (result.isConfirmed) {
                    return swalAlert.fire({
                        title: <p>Let's play again...</p>,
                        confirmButtonText: 'Play Again',
                        didClose: () => newGameOnClick()

                    })
                } else {
                    undoOnClick()
                }
            })
            break;
        case alertTypes.WON:
            swalAlert.fire({
                title: <div><img src={winImg} style={{ height: '200px' }} /><div>You Won <div style={{fontSize:'100px'}}>&#128526;</div></div></div>
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
                title: <div><p className="instructions">HOW TO PLAY<ul class="square">
                <li>Swipe or Press arrow keys to move tiles in any direction. (&#11013; , &#11014;,  &#11013;, &#11015;)</li>
                <li>When tiles with the same number join, they merge into one.</li>
                <li>Make New HighScores and Milestones &#128525;</li>
                <li>Join the tiles and get to the 2048 one! &#128077;</li>
            </ul>Enjoy !</p></div>
            })
            break;
        case alertTypes.HIGHSCORE:
            swalAlert.fire({
                title: <p>Wow...New High Score.</p>,
                iconHtml: <img src={highScoreImg} style={{ height: '150px' }} />
            })
            break;
        case alertTypes.MILESTONE:
            swalAlert.fire({
                title: <p>Wow...New Milestone Reached! <bold>{mileStone}</bold></p>,
                iconHtml: <img src={highScoreImg} style={{ height: '150px' }} />
            })
            break;
    }
}
export default showAlert