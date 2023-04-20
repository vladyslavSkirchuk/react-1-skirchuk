import React from 'react'

import './style.scss'

import { data } from './data'

interface IProject {
    id: number
    name: string
    description: string
    imageUrl: string
    contractTypeId?: number
    contractSignedOn?: string
    budget: number
    isActive: boolean
}

const ProjectPage = (): React.ReactElement => {
    return (
        <div className='items--list'>
            {data.map((item: IProject) => (
                <div className='items--list-item'>
                    <div>{item.id}</div>
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                    <img className='image' src={item.imageUrl} alt='bmwTop' />
                    <div>{item.budget}</div>
                    <div>{item.isActive}</div>
                </div>
            ))}
        </div>
    )
}

export default ProjectPage
