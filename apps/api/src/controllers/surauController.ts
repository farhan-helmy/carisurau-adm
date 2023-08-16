import { getAllSurau, updateSurau, removeSurau, getSurau, addSurau } from '../db/surau'
import { Surau } from '../types/surau'

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

export default class SurauController {

    public async getSurau(): Promise<SurauResponse[]> {
        const data = await getAllSurau()
        return data
    }

    public async getOneSurau(id: string): Promise<SurauResponse> {
        const data = await getSurau(id)
        return data
    }

    public async postSurau(surauData: Surau): Promise<SurauResponse> {
        const data = await addSurau(surauData)
        return data
    }

    public async patchSurau(id: string): Promise<SurauResponse[]> {
        const data = await updateSurau(id)
        return data
    }

    public async deleteSurau(id: string): Promise<SurauResponse[]> {
        const data = await removeSurau(id)
        return data
    }
}