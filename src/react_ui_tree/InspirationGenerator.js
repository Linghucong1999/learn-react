import * as React from 'react';
import quotes from './quotes';
import FancyText from './FancyText';
import inspirations from './inspirations';
import Color from './Color';

export default function InspirationGenerator({ children }) {
    const [index, setIndex] = React.useState(0);
    const quote = quotes[index];
    const inspiration = inspirations[index];
    const next = () => setIndex((index + 1) % quotes.length);

    return (
        <>
            <p>你的下一个选择是 {inspiration.type}</p>
            {inspiration.type === 'quote' ? <FancyText text={inspiration.value}></FancyText> : <Color value={inspiration.value}></Color>}
            <FancyText text={quote}></FancyText>
            <button onClick={next}>下一个</button>
            {children}
        </>
    )
}