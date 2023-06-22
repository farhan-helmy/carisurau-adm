import {Delete, Route} from 'tsoa'
import { removeRating } from '../db/rating'

@Route('rating')
export default class RatingController {
    @Delete('/:id')
    public async deleteRating(id: string): Promise<any> {
        const data = await removeRating(id)
        return data
    }
}