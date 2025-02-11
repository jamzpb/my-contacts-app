import { Contact } from "../types/Contact";


const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log(API_BASE_URL);

export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await fetch(`${API_BASE_URL}/GetAll`);
  const data = response.json();
  return data;
};

export const updateContact = async (updatedData: Contact): Promise<void> => {

  const response = await fetch(`${API_BASE_URL}/Update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })

  return response.json()
}

export const createContact = async (newContact: Contact): Promise<void> => {
  console.log(newContact);
  const response = await fetch(`${API_BASE_URL}/Add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContact),
  })

  return response.json()
}

export const deleteContact = async (Id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/Delete/${Id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(Id),
  })

  //return response.json()
}