import { Component } from '@angular/core';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
  ) {  }

  onLoaded(img: string) {
    console.log('Log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Jenn',
      email: 'jenn@mail.com',
      password: '1234'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  downloadPDF() {
    this.filesService.getFile('my-pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
    //'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
  }
}
