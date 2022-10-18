import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void

}
const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()
    const addItem = () => {
        const trimTitle = title.trim()
        trimTitle !== '' ? props.addItem(trimTitle) : setError(true)
        setTitle('')
    }
    const errorMessage = error ? <div style={{color: 'red'}}>Title is required!</div> : null
    return (
        <div>
            <input
                value={title}
                onChange={onChangeItemHandler}
                onKeyDown={onKeyHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;