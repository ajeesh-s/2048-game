import React from 'react';
import { updateGlobalState, useGlobalState } from '../context';
import { addItemsInNewPosition, alertTypes, cloneDeep, getMaxValue, isValueExist, KEYS, useEventHandler } from '../utilities/Utils';
import Cubicleomponent from './CubicleComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import showAlert from '../utilities/Messages';
import { useSwipeable } from 'react-swipeable';

const GameBoardComponent = () => {
    const WONMILESTONE = 2048;
    const globalState = useGlobalState().globalState;
    const dispatch = useGlobalState().dispatch;
    const START_DATA = Array(4).fill().map(() => Array(4).fill(0));
    const [gameData, setGameData] = React.useState(START_DATA);
    const [score, setScore] = React.useState(0);
    const newHighScore = React.useRef(true);
    const lastGameData = React.useRef();

    React.useEffect(() => {
        if (score > globalState.highScore) {
            updateGlobalState(dispatch, { highScore: score });
            if (newHighScore.current) {
                showAlert(alertTypes.HIGHSCORE, newGameOnClick);
                newHighScore.current = false;
            }
        }
    }, [score]);

    React.useEffect(() => {
        showAlert(alertTypes.START, newGameOnClick);
    }, [])

    React.useEffect(() => {
        let maxValue = getMaxValue(gameData);
        if (maxValue > globalState.mileStone) {
            updateGlobalState(dispatch, { mileStone: maxValue });
            showAlert(alertTypes.MILESTONE, newGameOnClick, undefined, maxValue);
        }
    }, [gameData])

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => moveLeft(),
        onSwipedUp: () => moveUp(),
        onSwipedRight: () => moveRight(),
        onSwipedDown: () => moveDown(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const undoOnClick = () => {
        setGameData(lastGameData.current);
    }

    const handleKeyDown = (event) => {
        switch (event.keyCode) {
            case KEYS.left: moveLeft();
                break;
            case KEYS.up: moveUp();
                break;
            case KEYS.right: moveRight();
                break;
            case KEYS.down: moveDown();
                break;
            default:
                break;
        }
    };

    const moveLeft = (isMove = true) => {
        let oldData = gameData;
        let newGameData = cloneDeep(gameData);
        let scoreTemp = score;
        for (let i = 0; i < 4; i++) {
            let b = newGameData[i];
            let slow = 0;
            let fast = 1;

            while (slow < 4) {
                if (fast === 4) {
                    fast = slow + 1;
                    slow++;
                    continue;
                }
                if (b[slow] === 0 && b[fast] === 0) {
                    fast++;
                } else if (b[slow] === 0 && b[fast] !== 0) {
                    b[slow] = b[fast];
                    b[fast] = 0;
                    fast++;
                } else if (b[slow] !== 0 && b[fast] === 0) {
                    fast++;
                } else if (b[slow] !== 0 && b[fast] !== 0) {
                    if (b[slow] === b[fast]) {
                        b[slow] = b[slow] + b[fast];
                        scoreTemp += b[slow];
                        b[fast] = 0;
                        fast = slow + 1;
                        slow++;
                    } else {
                        slow++;
                        fast = slow + 1;
                    }
                }
            }
        }
        return setGameDataFromChange(oldData, newGameData, isMove, scoreTemp);

    }

    const moveUp = (isMove = true) => {
        let b = [...gameData];
        let oldData = cloneDeep(gameData);
        let scoreTemp = score;
        for (let i = 0; i < 4; i++) {
            let slow = 0;
            let fast = 1;

            while (slow < 4) {
                if (fast === 4) {
                    fast = slow + 1;
                    slow++;
                    continue;
                }
                if (b[slow][i] === 0 && b[fast][i] === 0) {
                    fast++;
                } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
                    b[slow][i] = b[fast][i];
                    b[fast][i] = 0;
                    fast++;
                } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
                    fast++;
                } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
                    if (b[slow][i] === b[fast][i]) {
                        b[slow][i] = b[slow][i] + b[fast][i];
                        scoreTemp += b[slow][i];
                        b[fast][i] = 0;
                        fast = slow + 1;
                        slow++;
                    } else {
                        slow++;
                        fast = slow + 1;
                    }
                }
            }
        }
        return setGameDataFromChange(oldData, b, isMove, scoreTemp);
    };

    const moveRight = (isMove = true) => {
        let oldData = gameData;
        let newGameData = cloneDeep(gameData);
        let scoreTemp = score;
        for (let i = 3; i >= 0; i--) {
            let b = newGameData[i];
            let slow = b.length - 1;
            let fast = slow - 1;

            while (slow > 0) {
                if (fast === -1) {
                    fast = slow - 1;
                    slow--;
                    continue;
                }
                if (b[slow] === 0 && b[fast] === 0) {
                    fast--;
                } else if (b[slow] === 0 && b[fast] !== 0) {
                    b[slow] = b[fast];
                    b[fast] = 0;
                    fast--;
                } else if (b[slow] !== 0 && b[fast] === 0) {
                    fast--;
                } else if (b[slow] !== 0 && b[fast] !== 0) {
                    if (b[slow] === b[fast]) {
                        b[slow] = b[slow] + b[fast];
                        scoreTemp += b[slow];
                        b[fast] = 0;
                        fast = slow - 1;
                        slow--;
                    } else {
                        slow--;
                        fast = slow - 1;
                    }
                }
            }
        }
        return setGameDataFromChange(oldData, newGameData, isMove, scoreTemp);

    };

    const moveDown = (isMove = true) => {
        let b = [...gameData];
        let oldData = cloneDeep(gameData);
        let scoreTemp = score;
        for (let i = 3; i >= 0; i--) {
            let slow = b.length - 1;
            let fast = slow - 1;

            while (slow > 0) {
                if (fast === -1) {
                    fast = slow - 1;
                    slow--;
                    continue;
                }

                if (b[slow][i] === 0 && b[fast][i] === 0) {
                    fast--;
                } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
                    b[slow][i] = b[fast][i];
                    b[fast][i] = 0;
                    fast--;
                } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
                    fast--;
                } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
                    if (b[slow][i] === b[fast][i]) {
                        b[slow][i] = b[slow][i] + b[fast][i];
                        scoreTemp += b[slow][i];
                        b[fast][i] = 0;
                        fast = slow - 1;
                        slow--;
                    } else {
                        slow--;
                        fast = slow - 1;
                    }
                }
            }
        }
        return setGameDataFromChange(oldData, b, isMove, scoreTemp)
    };

    const setGameDataFromChange = (oldData, newGameData, isMove, scoreTemp) => {
        if (JSON.stringify(oldData) !== JSON.stringify(newGameData)) {
            lastGameData.current = oldData;
            if (isValueExist(newGameData, WONMILESTONE)) {
                setGameData(newGameData);
                showAlert(alertTypes.WON, newGameOnClick);
            } else newGameData = addItemsInNewPosition(newGameData);
        } else if (isMove && checkGameOver()) {
            showAlert(alertTypes.GAMEOVER, newGameOnClick, undoOnClick);
        }

        if (isMove) {
            setGameData(newGameData);
            setScore(scoreTemp);
        } else return newGameData;
    }

    const newGameOnClick = () => {
        let data = cloneDeep(addItemsInNewPosition(addItemsInNewPosition(START_DATA)));
        setGameData(data);
        setScore(0);
    }

    const checkGameOver = () => {
        if (isValueExist(gameData, 0))
            return false;
        let data = [JSON.stringify(moveLeft(false)), JSON.stringify(moveUp(false)), JSON.stringify(moveRight(false)), JSON.stringify(moveDown(false))];
        const allEqual = data.every(v => v === JSON.stringify(gameData))
        if (allEqual) return true;
    }

    return (
        <div className="container full-width" {...swipeHandlers}>
            <div className="row">
                <HeaderComponent {...{ score }} />
            </div>
            <div className="board-container container shadow" tabIndex="-1" >
                {useEventHandler('keydown', handleKeyDown)}
                <div className="row">
                    {gameData.map((data) => {
                        return <>
                            {
                                data.map((row, rowIndex) => <Cubicleomponent data={row} key={`cubic-${rowIndex}`} />)
                            }
                        </>
                    })
                    }
                </div>
            </div>
            <div className="row">
                <FooterComponent {...{ newGameOnClick }} />
            </div>
        </div>
    );
}
export default GameBoardComponent