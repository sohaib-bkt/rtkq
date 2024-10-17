import React from 'react';  
import { useGetItemsQuery } from './slice/Api';

const ItemList = () => {  
  const { data: items, error, isLoading } = useGetItemsQuery();  

  if (isLoading) return <div>Loading...</div>;  
  if (error) return <div>Error fetching items: {error.message}</div>;  

  return (  
    <ul>  
      {items.map(item => (  
        <li key={item.id}>{item.title}</li>  
      ))}  
    </ul>  
  );  
};

export default ItemList;