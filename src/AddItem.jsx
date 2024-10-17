import React, { useState } from 'react';  
import { useCreateItemMutation } from './slice/Api'; 

const AddItem = () => {  
  const [title, setTitle] = useState('');  
  const [createItem] = useCreateItemMutation();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    await createItem({ title }).unwrap();  
    setTitle('');  
  };  

  return (  
    <form onSubmit={handleSubmit}>  
      <input  
        type="text"  
        value={title}  
        onChange={(e) => setTitle(e.target.value)}  
        placeholder="Item name"  
      />  
      <button type="submit">Add Item</button>  
    </form>  
  );  
};

export default AddItem;