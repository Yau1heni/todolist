import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


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

    return (
        <div>
            <TextField
                value={title}
                variant='outlined'
                onChange={onChangeItemHandler}
                onKeyDown={onKeyHandler}
                id='outlined-basic'
                label={error ? 'Title is required' : 'type out here...'}
                size='small'
                error = {error}
            />
            <Button
                style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                variant='contained'
                color='primary'
                onClick={addItem}>
                +
            </Button>
        </div>
    );
};

export default AddItemForm;