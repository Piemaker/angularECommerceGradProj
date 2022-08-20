import { Component, Input, OnInit } from '@angular/core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  //TODO handle why toast doesn't show after first error
  @Input()
  message: string = '';
  @Input()
  isError = true;
  faWarning = faWarning;
  faCheck = faCheck;
  constructor() {}

  ngOnInit(): void {}
  hideToast() {
    this.message = '';
  }
}
