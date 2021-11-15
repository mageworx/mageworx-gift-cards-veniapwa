import React from 'react';
import { ChevronDown as ChevronDownIcon } from 'react-feather';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from "@magento/venia-ui/lib/components/Icon";
import getFormattedPrice from "../../../features/common/getFormattedPrice/getFormattedPrice";
import FieldIcons from "../Field/fieldIcons";
import defaultClasses from './select.module.css';

const arrow = <Icon src={ChevronDownIcon} size={24} />;

const Select = props => {
    const {
        id,
        items,
        handleChange,
        currency,
        value
    } = props;
    const before = null;
    const classes = useStyle(defaultClasses);
    const inputClass = classes.input;
    if (!items) return null;

    const options = items.map(
        ({ disabled = null, hidden = null, label, value, key = value }) => (
            <option
                key={key}
                disabled={disabled}
                hidden={hidden}
                value={value}
            >
                {typeof(value) === "number" ? getFormattedPrice(value, currency) : label}
            </option>
        )
    );

    return (
        <FieldIcons after={arrow} before={before}>
            <select className={inputClass} name={id} onChange={handleChange} value={value}>
                {options}
            </select>
        </FieldIcons>
    );
};

export default Select;
