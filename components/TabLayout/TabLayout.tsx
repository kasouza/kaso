import React, { ReactElement } from "react";
import { FC, useState } from "react";
import { TabProps } from "./Tab"

export interface TabLayoutProps {
    children: ReactElement<TabProps> | ReactElement<TabProps>[]
}

const TabLayout: FC<TabLayoutProps> = ({ children }) => {
    const [currentTabIdx, setCurrentTabIdx] = useState(0)

    const currentTab = React.Children.toArray(children)[currentTabIdx] as ReactElement<TabProps>

    return (
        <div className="flex flex-col md:flex-row h-full w-11/12 md:w-4/5 gap-16">
            <div className="mt-6 h-fit border-default">
                <ol className="flex flex-col px-2">
                    {React.Children.map(children, (tab: ReactElement<TabProps>, i) => (
                        <li className="border-black dark:border-white border-opacity-60 dark:border-opacity-60 border-b last:border-b-0">
                            <button className="block text-center hover:text-gray-700 dark:hover:text-gray-300 w-full px-16 py-4" onClick={() => setCurrentTabIdx(i)}>{tab.props.displayName}</button>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="flex flex-col gap-4 w-full h-full">
                <h1 className="text-4xl">{currentTab.props.displayName}</h1>
                <div>
                    {currentTab}
                </div>
            </div>
        </div>
    )
}

export default TabLayout