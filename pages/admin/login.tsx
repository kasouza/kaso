import { useCallback } from "react";
import Form from "../../components/Form/Form";
import AdminLayout from "../../components/AdminLayout";
import { adminLoginValidators, loginAdmin, registerAdmin } from "../../lib/admin/login/common";

export default function Contact() {
    const handleSubmit = useCallback(async (data: Map<string, string>) => {
        const user = await registerAdmin(
            data.get('email') || '',
            data.get('password') || '');

        console.log(user);
    }, [])

    return (
        <AdminLayout title="Contact">
            <div className="w-11/12 md:w-4/5 lg:w-3/5">
                <Form onSubmit={handleSubmit} inputs={[
                    { name: 'email', displayName: 'Email', placeholder: 'rick@email.com', type: 'email', validations: adminLoginValidators.email },
                    { name: 'password', displayName: 'Password', placeholder: '********', type: 'password', validations: adminLoginValidators.password },
                ]} />
            </div>
        </AdminLayout>
    )
}
