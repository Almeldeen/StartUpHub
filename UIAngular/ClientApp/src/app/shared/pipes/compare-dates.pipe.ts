import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compareDates'
})
export class CompareDatesPipe implements PipeTransform {

  transform(date1: string, date2: string | null, withNow?: boolean): 1 | -1 | 0 {
    if(withNow){
      const date = new Date();
      const comparedDate = new Date(date1);
      if(comparedDate === date ){
        return 0 ;
      }
      return comparedDate > date ? 1 : -1;
    }else{
      const comparedDate1 = new Date(date1);
      const comparedDate2 = new Date(date2);
      if(comparedDate1 === comparedDate2 ){
        return 0 ;
      }
      return comparedDate1 > comparedDate2 ? 1 : -1;
    }
  }

}
