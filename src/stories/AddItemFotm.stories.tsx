import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AddItemForm from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'button clicked inside form'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    addItem: action('Button clicked')
};

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(true);

    const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value);
    };
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItemCallback();

    const addItemCallback = () => {
        const trimTitle = title.trim();
        trimTitle !== '' ? args.addItem(trimTitle) : setError(true);
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
                />
                <Button
                        style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                        variant="contained"
                        color="primary"
                        onClick={addItemCallback}>
                    +
                </Button>
            </div>
    );
};

export const TemplateWithErrorStory = TemplateWithError.bind({});
