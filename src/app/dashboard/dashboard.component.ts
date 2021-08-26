import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public datarow: any[] = [
    {
      id: 1,
      address: '',
      street: '',
      city: '',
      country: '',
    },
  ];
  username: any;
  items: FormArray;
  filterform: FormGroup;
  todaysdate = new Date();
  memberData: any;
  perticularData: any;
  pertiresp: any;
  srno: any = [1];
  resp: any;
  qty: any;
  ptbyidresp: any;
  ptbyid: any;
  gtotal: any = 0;
  nettotal: any;
  billresp: any;
  billdata: any;

  constructor(
    private ds: DataService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('uname');

    // this.ds.createMember('123').subscribe(res=>{
    //   console.log(res);

    // })

    this.filterform = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()]),
    });

    this.ds.getPerticular().subscribe((res) => {
      console.log(res);
      this.pertiresp = res;
      if (this.pertiresp.issuccess == true) {
        this.perticularData = this.pertiresp.data;
      }
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      srNo: '',
      particular: '',
      charge: '',
      qty: '',
      amount: '',
    });
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
  get itemss(): FormArray {
    return this.filterform.get('items') as FormArray;
  }
  getPericularById(event, index) {
    console.log(event.target.value, index, 'Getting Value');
    this.ds.getPerticularById(event.target.value).subscribe((res) => {
      console.log(res, 'pert');
      this.ptbyidresp = res;
      if (this.pertiresp.issuccess == true) {
        this.ptbyid = this.ptbyidresp.data[0];
        this.itemss.controls[index]
          .get('charge')
          .patchValue(this.ptbyid.charges);
      }
    });
  }
  gettotal(index) {
    this.itemss.controls[index]
      .get('amount')
      .patchValue(
        parseFloat(this.itemss.controls[index].get('charge').value) *
          parseFloat(this.itemss.controls[index].get('qty').value)
      );
    this.gtotal = 0;
    this.filterform.get('items').value.forEach((x) => {
      // this.selectedHead.push(parseInt(x.expense_head));
      if (x.qty != '') {
        this.gtotal = parseFloat(this.gtotal) + parseFloat(x.amount);
      }
    });

    // var total = this.ptbyid.charges * qty.value;
    // this.gtotal = total;
  }
  addDataArr() {
    this.items = this.filterform.get('items') as FormArray;
    this.items.push(this.createItem());
    this.srno.push(this.srno.length + 1);
  }
  removeDataArr(i: number) {
    this.gtotal = this.gtotal - this.items.controls[i]?.get('amount').value;
    this.items.removeAt(i);
    console.log(this.items);


    console.log(this.gtotal, '------------------------------------');
  }

  logValue() {
    console.log(this.datarow);
  }
  saveBill() {
    var daat = [];
    this.filterform.get('items').value.forEach((x) => {
      console.log(x, '---------------------');
      daat.push({
        srno: x.srNo,
        rSrNo: 1, // [0, bill loaded srno]
        seqNo: 0, // [0]
        itemSrno: x.particular, // [item selected]
        itemname: 'a', //‘a’
        qty: x.qty, //[screen qty]
        rate: x.charge, //[screen rate]
        amount: x.amount, //[screen amount]
      });
    });

    var body = {
      rSrNo: 1, //(0 for first time)
      prefix: '2021', //‘2021’
      refNo: 0, // [0,what your received]
      trnType: 0,
      entDate: this.datepipe.transform(this.todaysdate, 'MM/dd/yyyy hh:mm:ss'), // [screen date]
      memSrNo: this.memberData?.srNo, //[loaded member.srno]
      amount: this.gtotal, //[from screen]
      payMode: 0, //‘0’
      payRefNo: '', //‘’
      payDate: this.datepipe.transform(this.todaysdate, 'MM/dd/yyyy hh:mm:ss'), // [today date]
      remark: 'string',
      ptname: null,
      userID: 'string',
      insertDT: this.datepipe.transform(this.todaysdate, 'MM/dd/yyyy hh:mm:ss'),
      trn_ReceiptChildren: daat,
    };
    this.ds.billsaved(body).subscribe((res) => {
      alert('bill saved...');
      console.log(res, 'bill saved');
    });
    console.log(body, 'Bill save');
  }
  getList() {
    this.ds.getBillList().subscribe((res) => {
      console.log(res, 'billlist');
      this.billresp = res.data;
      this.billdata = this.billresp;
    });
  }
  clearBill() {
    // this.filterform.reset();
    this.gtotal = 0;
    this.ngOnInit();
  }
}
