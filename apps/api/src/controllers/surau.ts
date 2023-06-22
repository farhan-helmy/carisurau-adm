import {Delete, Get, Patch, Route} from 'tsoa'
import { getAllSurau, updateSurau, removeSurau, getSurau } from '../db/surau'

type SurauResponse = {
    name: string
    unique_name: string
    is_approved: boolean
    created_at: Date
    is_approved_at: Date
    state: string
    district: string
    mall: string
    brief_direction: string
} | undefined

@Route('surau')
export default class SurauController {
    @Get('/')
    public async getSurau(): Promise<SurauResponse[]> {
        const data = await getAllSurau()
        return data
    }
    @Get('/:id')
    public async getOneSurau(id: string): Promise<SurauResponse> {
        const data = await getSurau(id)
        return data
    }
    @Patch('/:id')
    public async patchSurau(id: string): Promise<SurauResponse[]> {
        const data = await updateSurau(id)
        return data
    }
    @Delete('/:id')
    public async deleteSurau(id: string): Promise<SurauResponse[]> {
        const data = await removeSurau(id)
        return data
    }
}