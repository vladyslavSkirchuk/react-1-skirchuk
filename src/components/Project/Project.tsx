import React, { useState } from 'react'
import ProjectCard from 'blocks/ProjectCard/ProjectCard'
import ProjectForm from 'blocks/ProjectForm/ProjectForm'

import { TData } from 'types/dataTypes'

import { data } from 'mockedData/data'

import './style.scss'

const ProjectPage = (): React.ReactElement => {
    const [projectBeingEdited, setProjectBeingEdited] = useState<TData | null>(
        null,
    )
    const [projects, setProjects] = useState<TData[]>(data)

    const handleEdit = (project: TData) => {
        setProjectBeingEdited(project)
    }

    const handleSave = (updatedProject: TData) => {
        const updateState = projects.map((item): TData => {
            if (item.id === updatedProject.id) {
                return {
                    ...item,
                    name: updatedProject.name,
                    description: updatedProject.description,
                    budget: updatedProject.budget,
                }
            }
            return item
        })
        console.log('Saving project: ', updatedProject)
        setProjects(updateState)
        setProjectBeingEdited(null)
    }

    const cancelEditing = () => {
        setProjectBeingEdited(null)
    }
    return (
        <div className='project--page'>
            <div className='project--list'>
                {projects.map(project => (
                    <span key={project.id}>
                        {projectBeingEdited &&
                        projectBeingEdited.id === project.id ? (
                            <ProjectForm
                                onCancel={cancelEditing}
                                onSave={handleSave}
                                project={project}
                            />
                        ) : (
                            <div className='project--list-item'>
                                <ProjectCard
                                    project={project}
                                    onEdit={handleEdit}
                                />
                            </div>
                        )}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ProjectPage
