import { useState } from 'react';
import { sculptureList } from './data';

export default function App() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const hasNext = index < sculptureList.length - 1;
    function handleNextClick() {
        hasNext ? setIndex(index + 1) : setIndex(0);
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    let sculpture = sculptureList[index];
    return (
        <>
            <button onClick={handleNextClick}>下一个</button>
            <h2>
                <i>{sculpture.name}</i>
                by {sculpture.artist}
            </h2>
            <h3> ({index + 1} of {sculptureList.length})</h3>
            <button onClick={handleMoreClick}>{showMore ? "隐藏" : "显示更多"}</button>
            {showMore && <p>{sculpture.description}</p>}
            <img src={sculpture.url} alt='...' />
        </>
    )
}