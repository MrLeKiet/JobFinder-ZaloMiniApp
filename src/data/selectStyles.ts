// Custom styles for react-select in registration form

const customSelectStyles = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: 'white',
        minHeight: 40,
        border: 'none',
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
        const color = '#6B7280';
        let backgroundColor = '';
        if (isDisabled) backgroundColor = '';
        else if (isSelected) backgroundColor = color;
        else if (isFocused) backgroundColor = 'rgba(107,114,128,0.1)';
        let optionColor = color;
        if (isDisabled) optionColor = '#ccc';
        else if (isSelected) optionColor = 'white';
        return {
            ...styles,
            backgroundColor,
            color: optionColor,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isSelected ? color : 'rgba(107,114,128,0.2)'),
            },
        };
    },
};

export default customSelectStyles;
