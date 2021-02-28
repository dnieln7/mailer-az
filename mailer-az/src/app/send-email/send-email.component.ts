import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmailService} from '../service/email.service';
import {Email} from '../model/email';
import * as moment from 'moment';
import {ToastService} from '../service/toast.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  @ViewChild('dangerTpl') dangerTpl: ElementRef | undefined;

  public email = '';
  public message = '';
  public validEmail = false;

  constructor(private emailService: EmailService, private toastService: ToastService) {
  }

  ngOnInit(): void {
  }

  public validateEmail(): void {
    this.validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email);
  }

  private showSuccess(message: string): void {
    this.toastService.show(message, {classname: 'bg-success text-light', delay: 3000});
  }

  private showDanger(error: string): void {
    this.toastService.show(error, {classname: 'bg-danger text-light', delay: 5000});
  }

  private resetForm(): void {
    this.email = '';
    this.message = '';
    this.validateEmail();
  }

  public sendEmail(): void {
    this.validateEmail();
    if (this.validEmail && this.message.length > 0) {
      const format = 'YYYY-MM-DDTHH:mm';
      const now = moment(new Date(), format);
      const email = new Email(this.email, this.message, now.toISOString());

      this.emailService.send(email).subscribe(response => {
        if (response.success) {
          this.showSuccess(response.message);
          this.resetForm();
        } else {
          this.showDanger(response.message);
        }
      });
    }
  }
}
