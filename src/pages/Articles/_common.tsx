import {useState} from 'react';

export const CollapsableContent = ({title, children}) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <aside className="collapsable">
            <h3 onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? `⏬` : `⏫`} {title}</h3>
            {isCollapsed ? '' : children}
        </aside>
    )
}
