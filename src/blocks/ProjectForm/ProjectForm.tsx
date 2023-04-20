import React, { useState } from 'react'
import { TData } from 'types/dataTypes'

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
        name: project.name,
        description: project.description,
        budget: project.budget,
        id: project.id,
    })

    const handleItem = (name: string, event: string | boolean): void => {
        setData({
            ...data,
            [name]: event,
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        onSave(data)
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
            />
            <label htmlFor='description'>Project Description</label>
            <textarea
                name='description'
                placeholder='Enter description'
                value={data.description}
                onChange={event =>
                    handleItem('description', event.target.value)
                }
            />
            <label htmlFor='budget'>Project Budget</label>
            <input
                type='number'
                name='budget'
                placeholder='Enter budget'
                value={data.budget}
                onChange={event => handleItem('budget', event.target.value)}
            />
            <label htmlFor='isActive'>Active?</label>
            <input type='checkbox' className='checkbox' name='isActive' />
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
