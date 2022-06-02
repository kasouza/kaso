import Layout from "../../components/Layout";
import Tab from "../../components/TabLayout/Tab";
import TabLayout from "../../components/TabLayout/TabLayout";

export default function Admin() {
    return (
        <Layout title="Admin">
            <TabLayout>
                <Tab displayName="Saske">
                    SAskekasda
                </Tab>
                <Tab displayName="Nartuo">
                    NArutoasdjo
                </Tab>
            </TabLayout>
        </Layout>
    )
}