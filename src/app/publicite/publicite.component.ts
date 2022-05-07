import { Component, OnInit } from '@angular/core';
import {PubliciteService} from "../services/publicite.service";
import {ToastrService} from "ngx-toastr";
import {Publicite} from "../models/Publicite";

import Swal from "sweetalert2";


@Component({
  selector: 'app-publicite',
  templateUrl: './publicite.component.html',
  styleUrls: ['./publicite.component.css']
})
export class PubliciteComponent implements OnInit {
  publicite:Publicite[];
  pubs =new Publicite();
  productDialog: boolean;
  NewDialog =false ;

  constructor(private publiciteService:PubliciteService ,private toast: ToastrService) { }

  ngOnInit(): void {
    this.getallpubs()


  }
  getallpubs(){
    this.publiciteService.getPub().subscribe(data=>{
        console.table(data)
        this.publicite=data;
      },

      error =>{
        console.log(error)
      })

  }


  openNew() {
    this.pubs =new Publicite();
    this.NewDialog = true;

  }

  save(pubs: Publicite) {
    this.publiciteService.addPub(pubs).subscribe(res => {
        this.toast.success("done")
        this.ngOnInit()
        this.NewDialog = false
      },
      error => this.toast.error('some things wrong')
    )


  }

  openDialog(publicite:Publicite) {
    this.pubs = publicite;
    this.productDialog = true;
  }

  Ondelete(id: number) {
    Swal.fire({
      title: 'Etes-vous sur?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui!'
    }).then((result) => {

      //let confirm = window.confirm('do you want to delete this GC')
      if (result.value) {
        this.publiciteService.removePub(id).subscribe(data => {
            console.table(data)

            this.ngOnInit()

            this.toast.success('pub supprimé avec succés ');

          },
          error => {

            console.log(error)
          })

      }
    })
  }
  editpub(publicite:any) {
    this.publiciteService.updatePub(publicite.id, publicite).subscribe(data => {
        this.toast.success('done');
        this.productDialog = false;
      },
      error => this.toast.error('some things wrong'))


  }
}
