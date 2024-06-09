import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/servies/crud.service';
import { SharedService } from 'src/app/servies/shared.service';
import { UpdateuserComponent } from '../updateuser/updateuser.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  displayedColumns: string[] = ['id', 'reg_no', 'name', 'father', 'email', 'mobile_no', 'photo', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  url: string = ''

  constructor(
    private _crud: CrudService,
    private _routing: Router,
    private _shared: SharedService,
    private _dilog: MatDialog

  ) { 

    this._shared.imgUrl.subscribe(
    (res:any)=>{
      this.url =  res
    }
    )
  }

  ngOnInit() {
    this._crud.get_user().subscribe(
      (res: any) => {
        console.log(res);
        
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);

      }
    )
  }

  applyFilter(data: any) {

  }


  onDelete(data: any) {
    console.log(data);
    
  }

  onPrint(data: any) {

    this._shared.print_data.next(data)
    this._routing.navigate(['printpage'])

  }

  onEdit(data: any) {
    console.log(data);
    this._dilog.open(UpdateuserComponent,{
      data:data
    })
  }


}
