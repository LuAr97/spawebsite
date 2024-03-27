import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a context
interface AdminContextType {
  adminMode: boolean;
  setAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Define a provider component
export const AdminProvider = ( {children} :{children:ReactNode} ) => {
  const [adminMode, setAdminMode] = useState(false);

  return (
    <AdminContext.Provider value={{ adminMode, setAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to consume the context
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  console.log(context)
  if (!context) {
    throw new Error('useAdminContext must be used within a AdminProvider');
  }
  return context;
};

// const ExampleComponent: React.FC = () => {
//     const { adminMode, setAdminMode } = useAdminContext();
  
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setAdminMode(true);
//     };
  
//     return (
//       <div>
//         {adminMode}
//       </div>
//     );
//   };
  
//   export default ExampleComponent;
