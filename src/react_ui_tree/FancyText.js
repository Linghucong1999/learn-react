export default function FancyText({ text, title }) {
    return title ? <h1 className="fancy title">{title}</h1> : <h3 className="fancy cursive">{text}</h3>;
}