import Layout from "../components/Layout"
import { firestore } from "../firebase/initFirebase"
import { collection, addDoc } from "firebase/firestore"

export default function Teste() {
    const sendData = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "testes"), {
                first: "saske",
                last: "naruto",
            });
            console.log(docRef);

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout title="teste">
            <h2 className="font-thin mx-auto my-4 text-2xl md:text-3xl italic md:mt-8">Coming Soon...</h2>
            <button onClick={sendData}>SASKE</button>
        </Layout>
    )
}
