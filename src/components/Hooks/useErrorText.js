import React, { useState } from 'react'


export default (initialState) => {
    const [errorText, setState] = useState(initialState)

    const handleErrorText = (value, key) => {
        setState(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    return [
        errorText,
        handleErrorText
    ]
}
