import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  charCodes: string[] = [];
  employees: Employee[] = [];
  employeeSubscription: Subscription | undefined;

  constructor(private api: EmployeeService) {
    
  }
  ngOnInit(): void {
    this.createAlphabetButtons();
    this.employeeSubscription = this.api.getEmployees().subscribe(emp => {
      this.employees = emp;
      console.log(emp);
    })
  }
  createAlphabetButtons(): void {
    for (let i: number = 65; i <= 90; i++) {
      this.charCodes.push(String.fromCharCode(i));
    }
  }
}