import { FC } from "react";

export interface TabProps {
    displayName: string,
}

const Tab:FC<TabProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Tab