import {
  AfterViewInit,
  Component,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import * as crypto from 'crypto-js';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  sha3: string;
  sha2: string;
  sha1: string;
  md5: string;
  @ViewChild('input', { static: true }) input: ElementRef;

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((e: KeyboardEvent) => e.keyCode === 13),
        tap(async (event: KeyboardEvent) => {
          // console.log(this.input.nativeElement.value);
          this.md5 = crypto
            .MD5(this.input.nativeElement.value)
            .toString(crypto.enc.Base64);

          this.sha1 = crypto
            .SHA1(this.input.nativeElement.value)
            .toString(crypto.enc.Base64);

          this.sha2 = crypto
            .SHA512(this.input.nativeElement.value)
            .toString(crypto.enc.Base64);

          this.sha3 = crypto
            .SHA3(this.input.nativeElement.value)
            .toString(crypto.enc.Base64);
        })
      )
      .subscribe();
  }
}
