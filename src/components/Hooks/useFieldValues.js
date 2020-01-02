import React, { useState } from 'react'

export default (initialState) => {
    const [fieldValues, setState] = useState(initialState)

    const handleInputChange = (value, key) => {
        setState(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    return [
        fieldValues,
        handleInputChange
    ]
}
