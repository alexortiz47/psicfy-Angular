import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return value.charAt(0).toUpperCase() + value.substring(1);
    // charAt(n): coge el caracter posicionado en n, y substring(n-n2), coge las letras del string desde la pos n hasta n2, o si queremeos que coja todo el restom solo ponemos n.

    // let words = value.split(' ');
    // let wordsCapitalize = words.map(item => this.capitalizeWord(item));
    // return wordsCapitalize.join(' ');
    return value.split(' ').map(item => this.capitalizeWord(item)).join(' '); // Lo mismo pero en una linea

  }

  capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

}
