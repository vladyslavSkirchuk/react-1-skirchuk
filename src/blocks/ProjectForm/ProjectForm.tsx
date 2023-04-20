import React, { useState } from 'react'
import { TData } from 'types/DataTypes'

import './style.scss'

interface IForm {
    onCancel: () => void
    onSave: (project: TData) => void
    project: TData
}

const ProjectForm = ({
    onCancel,
    onSave,
    project,
}: IForm): React.ReactElement => {
    const [data, setData] = useState<TData>({
        id: project.id,
        name: project.name,
        description: project.description,
        budget: project.budget,
        contractTypeId: project.contractTypeId,
        contractSignedOn: project.contractSignedOn,
        isActive: project.isActive,
        imageUrl: project.imageUrl,
    })
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    })

    const handleItem = (name: string, event: string | boolean): void => {
        setData({
            ...data,
            [name]: event,
        })
        setErrors(() => validate(data))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (!isValid()) return
        onSave(data)
    }

    const validate = (project: TData) => {
        const errors = { name: '', description: '', budget: '' }
        if (project.name.trim().length <= 0) {
            errors.name = 'Name is required'
        }
        if (project.name.trim().length > 0 && project.name.trim().length < 3) {
            errors.name = 'Name needs to be at least 3 characters.'
        }
        if (project.description.trim().length === 0) {
            errors.description = 'Description is required.'
        }
        if (project.budget <= 0) {
            errors.budget = 'Budget must be more than $0.'
        }
        return errors
    }

    const isValid = () => {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        )
    }

    const handleValidate = (
        name: string,
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setErrors(() => validate(data))
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='name'>Project Name</label>
            <input
                type='text'
                name='name'
                placeholder='Enter name'
                value={data.name}
                onChange={event => handleItem('name', event.target.value)}
                onBlur={event => handleValidate('name', event)}
            />
            {errors.name.length > 0 && (
                <div className='error'>{errors.name}</div>
            )}
            <label htmlFor='description'>Project Description</label>
            <textarea
                name='description'
                placeholder='Enter description'
                value={data.description}
                onChange={event =>
                    handleItem('description', event.target.value)
                }
                onBlur={event => handleValidate('description', event)}
            />
            {errors.description.length > 0 && (
                <div className='error'>{errors.description}</div>
            )}
            <label htmlFor='budget'>Project Budget</label>
            <input
                type='number'
                name='budget'
                placeholder='Enter budget'
                value={data.budget}
                onChange={event => handleItem('budget', event.target.value)}
                onBlur={event => handleValidate('budget', event)}
            />
            {errors.budget.length > 0 && (
                <div className='error'>{errors.budget}</div>
            )}
            <label htmlFor='isActive'>Active?</label>
            <input
                type='checkbox'
                className='checkbox'
                name='isActive'
                checked={data.isActive}
                onChange={event => handleItem('isActive', event.target.checked)}
            />
            <div className='buttons--group'>
                <button type='submit' className='save'>
                    Save
                </button>
                <span />
                <button onClick={onCancel} type='button' className='cancel'>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default ProjectForm
