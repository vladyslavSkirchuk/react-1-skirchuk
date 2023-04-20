import React from 'react'

import { TData } from 'types/dataTypes'

import './style.scss'

interface IData {
    project: TData
    onEdit: (edit: TData) => void
}

const ProjectCard = (data: IData): React.ReactElement => {
    const { project, onEdit } = data

    const handleEditClick = (projectBeingEdited: TData) => {
        onEdit(projectBeingEdited)
    }

    return (
        <>
            <div className='name'>{project.name}</div>
            <p className='desc'>{project.description}</p>
            <img className='image' src={project.imageUrl} alt='bmwTop' />
            <div>Budget : {project.budget}</div>
            <div>{project.isActive}</div>
            <button
                onClick={() => {
                    handleEditClick(project)
                }}
                className='btn'
            >
                Edit
            </button>
        </>
    )
}

export default ProjectCard
