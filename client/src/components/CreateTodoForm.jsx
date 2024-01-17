import React, { useContext, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import createTodoRequest from '../apis/createTodoRequest';
import { TokenContext } from '../App';

export const CreateTodoForm = () => {
    const [token] = useContext(TokenContext);
    const [text, setText] = useState('');
    const queryClient = useQueryClient();
    const {mutate: createTodo} = useMutation(
        (newTodo)=> createTodoRequest(newTodo, token), 
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
        },
    }
    );
  return (
    <form onSubmit={(e) =>{
        //prevents refresh
        e.preventDefault();
        if(!text) return;
        createTodo({
            text,
        });
        setText('');
    }}>
        <input onChange = {e => setText(e.target.value)}
        value = {text}
        type = "text" />

        <button>Create</button>
    </form>
  )
}
