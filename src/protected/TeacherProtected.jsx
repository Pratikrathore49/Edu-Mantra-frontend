import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate,useLocation } from 'react-router'

const TeacherProtected = ({children}) => {
    const {user,loading,error} = useSelector((state)=>state.auth)
    const location = useLocation()
    if(loading){
        return <div>loading... </div>
    }
    if(!user || error ){
        return <Navigate to='/login' replace/>;
    }
    if(user.role !== 'teacher') {
        return <Navigate to={'/'} replace/>
    }
  return children
}

export default TeacherProtected

