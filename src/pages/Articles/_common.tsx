import {useState} from 'react';

export const CollapsableSidebar = ({title, children}) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <aside className="sidebar">
            <h2 onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? `⏬`: `⏫`} {title}</h2>
            {isCollapsed ? '' : children}
        </aside>
    )
}