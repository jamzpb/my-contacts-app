import { createContext, useCallback, useEffect, useState } from "react";
import { Contact } from "../types/Contact";
import { fetchContacts } from "../utils/apiMethods";

type ContactContextType = {
  data: Contact[];
  error: string;
  refreshData: () => Promise<void>;
};

export const ContactsContext = createContext<ContactContextType>({
  data: [],
  error: "",
  refreshData: async () => {},
});

export const ContactsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<Contact[]>([]);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    fetchContacts()
      .then(setData)
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ContactsContext.Provider value={{ data, refreshData: fetchData, error }}>
      {children}
    </ContactsContext.Provider>
  );
};
