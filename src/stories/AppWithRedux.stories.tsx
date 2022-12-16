import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from '../App';
import {ReduxStoreProviderDecorator} from './Decorators/ReduxStoreProviderDecorator';



export default {
  title: 'TODOLIST/AppWithRedux',
  component: App,
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const AppWithReduxStory = Template.bind({});



