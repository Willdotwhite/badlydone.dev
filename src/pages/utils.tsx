export function ItemCard({imgSrc, title, subtitle, copy, url, download}) {
    return (
        <a href={url} download={download} target="_blank" rel="noreferrer">
            <div style={{margin: '0 auto', width: '240px', height: '180px', overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                <img src={imgSrc} alt={title} height={180} />
            </div>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            {copy.split("\\n").map(((line, index) => <p key={`line-${title}-${index}`} className="copy">{line}</p>))}
        </a>
    )
}
