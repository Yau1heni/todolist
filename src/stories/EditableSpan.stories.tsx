import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import EditableSpan from '../components/EditableSpan/EditableSpan';

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argsTypes: {
        onclick: {
            description: 'button inside form clicked'
        },
    },

} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    changeTitle: action('EditableSpan value changed')
};

