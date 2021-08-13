import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReaderArch';
  public archList = [];
  public nameFile: string[] = [];
  public nameTxt: string = "";
 // public timeWait = 1000
 // public coefTimeWait = 1500 // Para cada 1500 reg teremos 1S para criar o arquivo final
  onChangeNovoArq(event:any){
    this.nameTxt = event.target.value
  }

  async onFolderSelected(event: any) {
    if (event.target.files.length > 0) {
      this.archList = event.target.files;
      var txtCustum: string[] = []
      this.nameFile = []
      //this.timeWait = Math.round(this.archList.length>this.coefTimeWait? eval(`${this.archList.length}/ ${this.coefTimeWait}`):1) * this.timeWait

      for (let i = 0; i < this.archList.length; i++) {
        await new Promise<boolean>((resolve, reject) => {
          setTimeout(() => {                     
            (<File>this.archList[i]).text()
            .then(async txt => {txtCustum.push(` ,${txt}\n `)})
            .then(x=> this.nameFile.push((<File>this.archList[i]).name));            
            //console.log("Gerando",txtCustum.length, new Date((<File>this.archList[i]).lastModified).toLocaleString());
            let objScroll = (<HTMLElement>document.getElementById("fileArea"));
            objScroll.scrollTop = objScroll.scrollHeight;            
            resolve(true)                      
          }, 100)
        });
      }      
      setTimeout(() => {        
        //console.log("Imprimindo",txtCustum.length)
        var txtArq = new Blob(txtCustum,
          { type: "text/plain;charset=utf-8" });
        saveAs(txtArq, this.nameTxt+".txt")
      }, 5000)    
    }
  }
}
