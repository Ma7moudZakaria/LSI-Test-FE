import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ExportationService {

  constructor(public translatService:TranslateService) { }

  exportCSV(data: any, filename='data', headers: any, headersLabels: any) {
    // let csvData = this.ConvertToCSV(data, ['name','age', 'average', 'approved', 'description']);
    let csvData = this.ConvertToCSV(data, headers, headersLabels);
    //console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}
ConvertToCSV(objArray: string, headerList: { [x: string]: any; }, headersLabels: { [x: string]: string; }) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = this.translatService.currentLang == 'en-US' ? 'S.No,' : 'التسلسل,';
for (let index in headersLabels) {
         row += headersLabels[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         for (let index in headerList) {
            let head = headerList[index];
line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }

  exportExcel(data: any, name: string,headersLabels: any[]) {
    import("xlsx").then(xlsx => {

      const worksheet = xlsx.utils.json_to_sheet(data)

      var headerCells = Object.getOwnPropertyNames(worksheet).filter(c => c.substr(c.length - 1) == '1' && c.length == 2)
      for (var i = 0; i < headerCells.length; i++) {
        worksheet[headerCells[i]].v = headersLabels[i];
      }

      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, name);
    });
  }

saveAsExcelFile(buffer: any, fileName: string) {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
}
