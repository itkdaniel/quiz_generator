import { Component, OnInit, Input } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 // @Input() currentUser = 'John Doe';

  constructor(public user:LoginServiceService) { }

  ngOnInit() {
  }

}
