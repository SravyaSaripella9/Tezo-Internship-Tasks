import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  roles: Role[] = [];
  roleSubscription: Subscription | undefined;

  constructor(private api: RoleService) {
    
  }
  ngOnInit(): void {
    this.roleSubscription = this.api.getRoles().subscribe(role => {
      this.roles = role;
      console.log(role);
    })
  }
}
