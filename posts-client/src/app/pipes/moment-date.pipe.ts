import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {

    // string is what the server is sending, 
    // would like to handle in case numbers are used for this pipe at any point
    transform(date: string | number, ...args: unknown[]): string {
        return moment(+date).format('MMMM Do YYYY, h:mm:ss a');
    }

}
