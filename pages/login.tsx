import Layout from "../components/Layout";
import Form from "../components/Form/Form";

export default function Login() {
	return (
		<Layout title="Login">
			<section className="mb-16">
				<Form inputs={[
					{ name: "name", displayName: "Name", placeholder: "Rick Astley", type: "text" },
					{ name: "password", displayName: "Password", placeholder: "Rick Astley", type: "password" }
				]} />
			</section>
		</Layout>
	)
}
