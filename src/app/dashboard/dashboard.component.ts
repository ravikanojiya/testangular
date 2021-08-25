import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators , FormArray , FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public datarow: any[] = [{
    id: 1,
    address: '',
    street: '',
    city: '',
    country: ''
  }];
  username: any;
  items:FormArray;
  filterform:FormGroup;
  todaysdate = new Date();
  memberData: any;
  perticularData: any;
  pertiresp: any;
  resp: any;
  qty: any;
  ptbyidresp: any;
  ptbyid: any;
  gtotal: any = 0;
 nettotal:any;

  constructor(private ds: DataService , private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('uname');

    // this.ds.createMember('123').subscribe(res=>{
    //   console.log(res);

    // })

    this.filterform= this.formBuilder.group({
      items: this.formBuilder.array([ this.createItem() ])
    })

    this.ds.getPerticular().subscribe((res) => {
      console.log(res);
      this.pertiresp = res;
      if (this.pertiresp.issuccess == true) {
        this.perticularData = this.pertiresp.data;
      }
    });
  }

  createItem():FormGroup{
    return this.formBuilder.group({
      srNo:'',
      particular:'',
      charge:'',
      qty:'',
      amount:''

    })
  }

  getMember(memno) {
    this.ds.createMember(memno.value).subscribe((res) => {
      this.resp = res;
      if (this.resp.issuccess == true) {
        this.memberData = this.resp.data[0];
        console.log(this.memberData);
      }
    });
  }
  get itemss():FormArray{
    return this.filterform.get('items') as FormArray;
  }
  getPericularById(event , index) {
    console.log(event.target.value , index , "Getting Value");
    this.ds.getPerticularById(event.target.value).subscribe((res) => {
      console.log(res, 'pert');
      this.ptbyidresp = res;
      if (this.pertiresp.issuccess == true) {
        this.ptbyid = this.ptbyidresp.data[0];
        this.itemss.controls[index].get('charge').patchValue(this.ptbyid.charges);
      }
    });
  }
  gettotal(index) {
    this.itemss.controls[index].get('amount').patchValue(parseFloat(this.itemss.controls[index].get('charge').value)*parseFloat(this.itemss.controls[index].get('qty').value));
    this.gtotal=0;
    this.filterform.get('items').value.forEach(x => {
      // this.selectedHead.push(parseInt(x.expense_head));
      if(x.qty != ''){
        this.gtotal= parseFloat(this.gtotal)+parseFloat(x.amount)
      }
    })

    // var total = this.ptbyid.charges * qty.value;
    // this.gtotal = total;
  }
  addDataArr() {
    this.items = this.filterform.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  removeDataArr(i: number) {
    // this.items.splice(i, 1);
  }

  logValue() {
    console.log(this.datarow);
  }
}
