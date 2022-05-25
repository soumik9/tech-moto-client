import { useEffect, useState } from "react"

const useToken = (user, getUser )=> {
    const [token, setToken] = useState('');

    useEffect( () => {

        if(user || getUser){
            const email = user?.user?.email;
            const name = user?.user?.displayName;
    
            const role = getUser?.role ? getUser.role : 'user';
            const currentUser = { name: name, email: email, role: role } 
    
            if(email){
                fetch(`https://tech-moto-9.herokuapp.com/users/${email}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
            }
        }

    }, [user, getUser])

    return [token];
}

export default useToken;