import { Component, OnInit, Input} from '@angular/core';
import { Content } from '../../../model/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() model: Content;
  constructor() { }

  ngOnInit() {
  }

}
