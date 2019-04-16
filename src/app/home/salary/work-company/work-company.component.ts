import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkCompany } from 'src/app/entity/WorkCompany';
import { SalaryService } from 'src/app/home/salary/services/salary.service';
import { ApplicationManage } from 'src/app/services/application.manage';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { TipService } from 'src/app/services/tip.service';
import { Salary } from 'src/app/entity/Salary';

@Component({
  selector: 'app-work-company',
  templateUrl: './work-company.component.html',
  styleUrls: ['./work-company.component.css']
})
export class WorkCompanyComponent implements OnInit {
  validateForm: FormGroup;
  salaryValidateForm: FormGroup;
  isLoading: boolean;
  workCompany: WorkCompany;
  salary: Salary;
  workCompanies: WorkCompany[];
  addPanel = {
      active     : true,
      disabled   : false,
      name       : '添加任职公司信息',
      customStyle: {
        'background'   : '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border'       : '0px'
      }
  };
  salaryPanel = {
    active     : false,
    disabled   : false,
    name       : '添加薪资发放信息',
    customStyle: {
      'background'   : '#f7f7f7',
      'border-radius': '4px',
      'margin-bottom': '24px',
      'border'       : '0px'
    }
};
  constructor(private salaryService: SalaryService, private applicationManage: ApplicationManage, private tipService: TipService) { }

  ngOnInit() {
    this.clearWorkCompany();
    this.clearSalary();
    this.validateForm = new FormBuilder().group({
      name: ['', [ Validators.required]],
      address: ['', [ Validators.required]],
      enterDate: ['', [ Validators.required]],
      leaveDate: ['', [ ]],
      isWorking: ['', [ Validators.required ]],
    });

    this.salaryValidateForm = new FormBuilder().group({
      mount: ['', [ Validators.required]],
      deliverDate: ['', [ Validators.required]],
      cid: ['', [ Validators.required]],
    });

    this.loadWorkingCompany();
  }


  loadWorkingCompany() {
    this.isLoading = true;
    this.salaryService.getWorkCompany( this.applicationManage._account.id, '是').then(
      res => {
        if ( ResponseCode.SUCCESS === res.code ) {
            this.isLoading = false;
            this.workCompanies = res.object;
        } else {
          this.tipService.tip( `${res.msg}`, 3000  );
        }
      }
    ).catch(
      () => {
        this.isLoading = false;
        this.tipService.tip( '网络故障', 3000  );
      }
    );
  }

  submitForm() {
    this.isLoading = true;
    this.salaryService.addWorkCompany( this.workCompany, this.applicationManage._account.id).then(
      res => {
        this.isLoading = false;
        this.tipService.tip( res.msg, 3000 );
      }
    ).catch(
      () => {
        this.isLoading = false;
        this.tipService.tip( '网络故障', 3000  );
      }
    );
  }

  submitSalaryForm() {
    this.isLoading = true;
    this.salaryService.addSalary( this.salary, this.applicationManage._account.id).then(
      res => {
        this.isLoading = false;
        this.tipService.tip( res.msg, 3000 );
      }
    ).catch(
      () => {
        this.isLoading = false;
        this.tipService.tip( '网络故障', 3000  );
      }
    );
  }

  clearSalary() {
    this.salary = { deliverDate: new Date(), workCompany: {}  };
  }
  clearWorkCompany() {
    this.workCompany = { enterDate: new Date() };
  }

}
