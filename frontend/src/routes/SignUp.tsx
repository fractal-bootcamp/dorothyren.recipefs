import { SignUp, useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"

export default function SignUpPage() {
    //at the sign up page write a function that creates a user
    const { getToken, userId } = useAuth()

    useEffect(() => {
        const createUserInDb = async () => {
            const serverUrl = "http://localhost:8000"
            try {
                const token = await getToken(); //getting the auth token 
                const response = await fetch(serverUrl + '/createuser', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('failed to create user in database');
                }
                //handle user creation
                console.log('user created in database');
            } catch (error) {
                console.error('Error creating user:', error);
                //handle error 
            }
            console.log('redirect 2')
            window.location.href = "/"

        }

        if (userId) {
            createUserInDb()
        }
    }, [userId])


    if (userId) {
        return <div>Logged In</div>
    }


    return <SignUp path="/sign-up" />;
}