import { useRouter } from "next/router";
import { FC } from "react";
import DemoLayout from "./DemoLayout";

interface DemoPostProps {
    id: string,
    title: string,
    subDir: string,
}

const DemoPost: FC<DemoPostProps> = ({id, title, subDir}) => {
    if (id) {
        return <DemoLayout title={title} iframeSrc={`/demos/${subDir}/${id}/index.html`} />
    }

    return <></>
}

export default DemoPost