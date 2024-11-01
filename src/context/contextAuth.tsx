import { createContext, useContext, useState } from "react";

interface AuthContextType {
   email: string;
   setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
   email: "",
   setEmail: () => {},
});

export const AuthProvider = ({ children }: any) => {
   const [email, setEmail] = useState("");

   return (
      <AuthContext.Provider value={{ email, setEmail }}>
         {children}
      </AuthContext.Provider>
   );
};

export const contextAuth = () => useContext(AuthContext);