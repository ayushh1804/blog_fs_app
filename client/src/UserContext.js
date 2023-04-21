const { createContext, useState } = require("react");

const UserContext = createContext({});

export const UsercontextProvider = ({ children }) => {
    const [userinfo, setUserInfo] = useState({})

    return (
        <UserContext.Provider value={{ userinfo, setUserInfo }}>{children}</UserContext.Provider>
    )
}