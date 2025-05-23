import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  

export const apiSlice = createApi({  
  reducerPath: 'api',  
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/posts' }), 
  endpoints: (builder) => ({  
    getItems: builder.query({  
      query: () => '/',
    }),  
    getItem: builder.query({  
      query: (id) => `/${id}`,
    }),  
    createItem: builder.mutation({  
      query: (newItem) => ({  
        url: '/',  
        method: 'POST',  
        body: newItem,  
      }),  
      async onQueryStarted(newItem, { dispatch, queryFulfilled }) {  
        const patchResult = dispatch(  
          apiSlice.util.updateQueryData('getItems', undefined, (draft) => {  
            draft.push({ ...newItem, id: Date.now() }); 
          })  
        );  
        try {  
          await queryFulfilled; 
        } catch {  
          patchResult.undo();  
        }  
      },  
    }),
    
    
    updateItem: builder.mutation({  
      query: ({ id, updatedItem }) => ({  
        url: `/${id}`,  
        method: 'PUT',  
        body: updatedItem,  
      }),  
    }),  
    deleteItem: builder.mutation({  
      query: (id) => ({  
        url: `/${id}`,  
        method: 'DELETE',  
      }),  
    }),  
  }),  
});  

// Export hooks generated by RTK Query  
export const {  
  useGetItemsQuery,  
  useGetItemQuery,  
  useCreateItemMutation,  
  useUpdateItemMutation,  
  useDeleteItemMutation,  
} = apiSlice;  
