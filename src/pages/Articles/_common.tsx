import {useState} from 'react';

export const CollapsableContent = ({title, children}) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <aside className="collapsable">
            <h2 onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? `⏬`: `⏫`} {title}</h2>
            {isCollapsed ? '' : children}
        </aside>
    )
}