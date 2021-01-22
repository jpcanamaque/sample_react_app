import React from 'react';

export function SelectOptionBuilder(props) {
    return (
        <option value = {props.value}>{props.value}</option>
    );
}