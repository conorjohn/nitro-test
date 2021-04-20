import { IPost } from "../types/post.interface";
import * as faker from 'faker';

export function mockPostsFactory(): Array<IPost> {
    return [{
        id: 0,
        author: faker.name.firstName(),
        time: new Date().getUTCMilliseconds(),
        location: 'Dublin',
        text: faker.random.words(50),
        week: 14
    }, {
        id: 1,
        author: faker.name.firstName(),
        time: new Date().getUTCMilliseconds(),
        location: 'Inchicore',
        text: faker.random.words(50),
        week: 14
    }]
}