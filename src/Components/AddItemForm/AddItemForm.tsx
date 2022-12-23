import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, disabled}) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value);
    };
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItemCallback();

    const addItemCallback = () => {
        const trimTitle = title.trim();
        trimTitle !== '' ? addItem(trimTitle) : setError(true);
        setTitle('');
    };

    return (
            <div>
                <TextField
                        style={{paddingBottom: '20px'}}
                        value={title}
                        variant="outlined"
                        onChange={onChangeItemHandler}
                        onKeyDown={onKeyHandler}
                        id="outlined-basic"
                        label={error ? 'Title is required' : 'type out here...'}
                        size="small"
                        error={error}
                        disabled = {disabled}
                />
                <Button
                        style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                        variant="contained"
                        color="primary"
                        onClick={addItemCallback}
                        disabled = {disabled}
                >
                    +
                </Button>
            </div>
    );
});

export default AddItemForm;