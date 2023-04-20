import React, { useEffect, useState } from 'react'
import ProjectCard from 'blocks/ProjectCard/ProjectCard'
import ProjectForm from 'blocks/ProjectForm/ProjectForm'

import { TData } from 'types/DataTypes'

import { projectAPI } from 'projectAPI'

import './style.scss'
import { Project } from 'Project'

const ProjectPage = (): React.ReactElement => {
    const [projectBeingEdited, setProjectBeingEdited] = useState<TData | null>(
        null,
    )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null | undefined>(undefined)
    const [projects, setProjects] = useState<TData[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        async function loadProjects() {
            setLoading(true)
            try {
                const data = await projectAPI.get(currentPage)
                setError(null)
                setProjects(data)
                if (currentPage === 1) {
                    setProjects(data)
                } else {
                    setProjects(projects => [...projects, ...data])
                }
            } catch (e: unknown) {
                setError((e as Error).message)
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [currentPage])

    const handleEdit = (project: TData) => {
        setProjectBeingEdited(project)
    }

    const handleMoreClick = () => {
        setCurrentPage(currentPage => currentPage + 1)
    }

    const handleSave = (updatedProject: TData) => {
        projectAPI
            .put(updatedProject)
            .then(updatedProject => {
                setProjects(prevProjects =>
                    prevProjects.map(p =>
                        p.id === updatedProject.id
                            ? new Project(updatedProject)
                            : p,
                    ),
                )
                console.log('Saving project: ', updatedProject)
                setProjectBeingEdited(null)
            })
            .catch(e => {
                setError(e.message)
            })
    }

    const cancelEditing = () => {
        setProjectBeingEdited(null)
    }
    return (
        <div className='project--page'>
            {projectAPI ? (
                <div className='project--list'>
                    {projects.map((project, index) => (
                        <span key={index}>
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
            ) : (
                <div>
                    {loading && (
                        <div className='center-page'>
                            <p>Loading...</p>
                        </div>
                    )}
                    {error && (
                        <div className='row'>
                            <div className='card large error'>
                                <section>
                                    <p>{error}</p>
                                </section>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!loading && !error && (
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='button-group fluid'>
                            <button
                                className='button default'
                                onClick={handleMoreClick}
                            >
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectPage
