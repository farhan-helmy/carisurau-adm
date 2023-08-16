import { Delete, Route } from 'tsoa'
import { removeRating } from '../db/rating'

export default class RatingController {
    public async deleteRating(id: string): Promise<any> {
        const data = await removeRating(id)
        return data
    }
}