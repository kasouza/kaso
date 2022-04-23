import { useRouter } from "next/router";
import { FC } from "react";
import DemoLayout from "./DemoLayout";

interface DemoPostProps {
    subDir: string,
}

const DemoPost: FC<DemoPostProps> = ({subDir}) => {
    const router = useRouter()
    const { id } = router.query

    if (id) {
        return <DemoLayout iframeSrc={`/demos/${subDir}/${id}/index.html`} />
    }

    return <></>
}

export default DemoPost