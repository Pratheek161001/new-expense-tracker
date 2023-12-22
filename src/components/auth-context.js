import React, { useState } from 'react'

const AuthContext = React.createContext({
    token:'',
    isloggedin:false,
    login:(token)=>{},
    logout:()=>{}
});
export const AuthContextprovider=(props)=>{
    const [token,settoken]=useState(null)
    const userisloggedin=!!token;
    const loginhandler=(token)=>{
        settoken(token);
    }
    const logouthandler=(token)=>{
        settoken(null);
    }
    const contextvalue={
        token:token,
        isloggedin:userisloggedin,
        login:loginhandler,
        logout:logouthandler,
    }
    return <AuthContext.Provider value={contextvalue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext