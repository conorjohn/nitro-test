import { MomentDatePipe } from './moment-date.pipe';
import * as moment from 'moment'
describe('MomentDatePipe', () => {
    const pipe = new MomentDatePipe();
    
    const timestampNum: number = 1616955115;
    const timestampString: string = "1616955115";
    const toUnix = (formattedDate: string) => moment(formattedDate, 'MMMM Do YYYY, h:mm:ss a').unix();
    
    beforeEach(() => {});

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should accept a Number timestamp and get a string formated MMMM Do YYYY, h:mm:ss a', () => {
        const formattedDate = pipe.transform(timestampNum);

        expect(typeof formattedDate).toBe("string");
    });

    it('should accept a Number timestamp and get a string formated MMMM Do YYYY, h:mm:ss a', () => {
        const formattedDate = pipe.transform(timestampString);

        expect(typeof formattedDate).toBe("string");
    });

    it('should get the same timestamp back based on format MMMM Do YYYY, h:mm:ss a', () => {
        const formattedDate = pipe.transform(timestampNum);

        expect(timestampNum).toEqual(toUnix(formattedDate));
    });

});
