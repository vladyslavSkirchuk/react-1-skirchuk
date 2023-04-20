import React from 'react'
import ProjectCard from 'blocks/ProjectCard/ProjectCard'
import ProjectForm from 'blocks/ProjectForm/ProjectForm'

import { data } from './data'

import './style.scss'

const ProjectPage = (): React.ReactElement => {
    return (
        <div className='project--page'>
            <div className='project--list'>
                {data.map(project => (
                    <span key={project.id}>
                        <div className='project--list-item'>
                            <ProjectCard data={project} />
                        </div>
                        <ProjectForm />
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ProjectPage
