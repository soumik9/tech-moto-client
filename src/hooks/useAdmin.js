import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import auth from "../firebase.init";

const useAdmin = (user) => {

    let navigate = useNavigate();
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect( () => {
        const email = user?.email;
    
        if(email){
            fetch(`https://tech-moto-9.herokuapp.com/admin/${email}`, {
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
                setAdmin(data.admin);
                setAdminLoading(false);
            })
        }
    }, [user, navigate])

    return [admin, adminLoading];
}

export default useAdmin;