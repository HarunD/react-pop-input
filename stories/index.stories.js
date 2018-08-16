import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import PopInput from '../src/PopInput';

storiesOf('PopInput', module).add('Simple', () => <PopInput value="Volvo" onSave={val => {
    console.log("Value : ", val)
}}/>);
