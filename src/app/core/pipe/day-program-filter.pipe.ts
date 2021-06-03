import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progDayFilter',
  pure: false
})
export class ProgDayFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter || !filter.dayOrder) {
      return items;
    }


    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.dayOrder === filter.dayOrder);
  }

}

