import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useQueryClient, useMutation, QueryClient } from 'react-query';
import updateTodoRequest from '../apis/updateTodoRequest';
import deleteTodoRequest from '../apis/deleteTodoRequest';
import {debounce} from 'lodash';
import { TokenContext } from '../App';
export const TodoItem = ({todo}) => {
    const [token] = useContext(TokenContext);
    const [text, setText] = useState(todo.text);


    const queryClient = useQueryClient();
    const {mutate: updateTodo} = useMutation(
        (updatedTodo)=> updateTodoRequest(updatedTodo, token), 
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
        },
    }
    );
    

    const {mutate: deleteTodo} = useMutation(
        (updatedTodo)=> deleteTodoRequest(updatedTodo, token), 
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
        },
    }
    );
    const debouncedUpdateTodo = useCallback(
        debounce(
            updateTodo, 
            600, 
            [updateTodo]
        ));

    useEffect(() => {
        if(text !== todo.text){
            debouncedUpdateTodo({
                ...todo,
                text,
            });
        }
    }, [text])
    return (
        <div>
            <input 
                checked={todo.completed} 
                type = "checkbox"
                onChange = {() => 
                    updateTodo({
                    ...todo,
                    completed: !todo.completed,
                })}
            />
            <input 
                type = "text"
                value = {text}
                onChange = {(e) => setText(e.target.value)}
            />

            <button onClick={() => deleteTodo(todo)}>delete</button>
        </div>
    );
};
