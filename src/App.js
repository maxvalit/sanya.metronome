import logo from './logo.svg';

import './App.sass'
import {useState} from "react";
import sound from './metronome1.mp3'

function MyButton(props) {
    return <a style={{'border': '5px blue solid', 'color': 'white'}}
    >{props.children}</a>
}

function Row(props) {
    return <div style={
        {display: 'flex', justifyContent: 'center'}
    }>
        {props.children}
    </div>
}

function App() {
    return (
        <div className="Backgound">
            <Metronome/>
        </div>
    );
}

let MyInterval;


function Metronome(props) {
    let [bpm, setBpm] = useState(120)
    let [isActive, _setIsActive] = useState(false)
    let [isBeat, setIsBeat] = useState(false)

    const setIsActive = (active) => {
        _setIsActive(active)

        if (active) {
            MyInterval = setInterval(() => {
                setIsBeat(true)
                const ticker = new Audio(sound)

                ticker.play()

                setTimeout(() => {
                    setIsBeat(false)
                    //ticker.pause()
                }, 20)
            }, 1000 * 60 / bpm)
        } else {
            clearInterval(MyInterval)
        }

    }


    return <div className={`Metronome ${(isActive ? 'active' : '')} ${(isBeat ? 'beat' : '')}`}>
        <Row>
            <input id='bpm' type={'text'} onChange={(e) => setBpm(e.target.value)} value={bpm}/>
        </Row>
        <Row>
            <a
                id={'start'}
                onClick={e => {
                    setIsActive(!isActive)
                }}>

                {isActive ? 'Stop' : 'Start'}
            </a>
        </Row>
        {/* <audio id={'ticker'}>
            <source src={sound} type="audio/mpeg"/>
        </audio>*/}
    </div>
}

export default App;
