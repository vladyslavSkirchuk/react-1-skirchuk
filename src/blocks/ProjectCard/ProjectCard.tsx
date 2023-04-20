import React from 'react'

import './style.scss'

export interface IProjectData {
    id: number
    name: string
    description: string
    imageUrl: string
    contractTypeId?: number
    contractSignedOn?: string
    budget: number
    isActive: boolean
}

interface IData {
    data: IProjectData
}

const ProjectCard = (data: IData): React.ReactElement => {
    const project: IData = data
    const handleEditClick = (projectBeingEdited: IProjectData) => {
        console.log(projectBeingEdited)
    }
    return (
        <>
            <div className='name'>{project.data.name}</div>
            <p className='desc'>{project.data.description}</p>
            <img className='image' src={project.data.imageUrl} alt='bmwTop' />
            <div>Budget : {project.data.budget}</div>
            <div>{project.data.isActive}</div>
            <button
                onClick={() => {
                    handleEditClick(project.data)
                }}
                className='btn'
            >
                Edit
            </button>
        </>
    )
}

export default ProjectCard
