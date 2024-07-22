import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input() heading: string = "";
  mediaType:string = "";
  @Output() onDropdownClick = new EventEmitter<Event>;
  @Output() onAddTaskEvent = new EventEmitter<string>();

  constructor(private router: Router, private mediaService: MediaService) {}

  ngOnInit(): void {
    this.mediaType=this.mediaService.onResize();
  }

  onChange(event: Event): void{
    this.onDropdownClick.emit(event);
  }

  addTask(): void{
    this.onAddTaskEvent.emit();
  }

  signout(): void{
    localStorage.removeItem('Authentication Token');
    this.router.navigate(['/signin']);
  }
}