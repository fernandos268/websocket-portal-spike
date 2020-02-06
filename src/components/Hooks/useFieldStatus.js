import React, { useState } from 'react'


export default (initialState) => {
    const [fieldStatus, setState] = useState(initialState)

    const handleFieldStatus = (value, key) => {
        setState(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    return [
        fieldStatus,
        handleFieldStatus
    ]
}
