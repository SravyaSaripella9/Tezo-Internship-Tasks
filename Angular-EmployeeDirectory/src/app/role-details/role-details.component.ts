import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent implements OnInit{
  @Input() id!: string;


  employees: Employee[] = [];
  employeeSubscription: Subscription | undefined;

  constructor(private api: EmployeeService) {
    
  }
  ngOnInit(): void {
    this.employeeSubscription = this.api.getEmployees().subscribe(employee => {
      // if(employee.roleId == this.id)
      {
        this.employees = employee;
        console.log(employee);
      }
    })
  }
}
