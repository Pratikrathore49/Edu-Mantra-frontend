
import { Navigate } from 'react-router';
import axiosInstance from '../services/axiosInstance';
import { useEffect, useState } from 'react';

const PaymentProtected = ({children}) =>{
    const [allowed , setAllowed] = useState(null);

    useEffect(()=>{
     async function checkAccess(){
        try{const res= await axiosInstance.get('/v2/paper/isPurchase');
            setAllowed(res.data.access);
            console.log('protected',res)
        }catch(error){
            setAllowed(false);
    }
}

    checkAccess();
    },[]);
console.log('access',allowed)
    if(allowed === null) return <div>Checking access...</div>;
    if(!allowed) return <Navigate to='/student/payment' replace />;
    return children;

}

export default PaymentProtected;