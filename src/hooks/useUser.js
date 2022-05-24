import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import auth from "../firebase.init";

const useUser = (user) => {

    let navigate = useNavigate();
    const [userRole, setUserRole] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect( () => {
        const email = user?.email;
    
        if(email){
            fetch(`https://tech-moto-9.herokuapp.com/user-role/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    signOut(auth);
                    navigate('/login')
                    toast.error('Forbidden/Unauthorized access!', { duration: 2000, position: 'top-right', });
                }
                return res.json();
            })
            .then(data => {
                setUserRole(data.user);
                setUserLoading(false);
            })
        }
    }, [user, navigate])

    return [userRole, userLoading];
}

export default useUser;