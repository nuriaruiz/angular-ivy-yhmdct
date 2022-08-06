import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { EMPTY, Observable } from 'rxjs';
import { BannerService } from './banner.service';
import { IBanner } from './types/banner-data';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, OnDestroy{
    bannerImage!: SafeStyle;
    
    errorMessage!: string;
    showLoading = true;
    banner$: any;

    ngOnInit(): void {
        this.getBanner();
    }

    getBanner(): void{
        this.banner$ = this.bannerService.getBanner()
        .subscribe({
            next: (banner) => {
                this.bannerImage = this.sanitizer.bypassSecurityTrustStyle(
                    `url('data:image/png;base64, ${banner.data}')`
                );
            },
            error: (error) => {
                console.log('error '+error);
                this.errorMessage = error;
                return EMPTY;
            },
            complete: () => {
              this.showLoading = false;
            }
        });
    }
  
    constructor(private bannerService: BannerService, private sanitizer: DomSanitizer) {}
    ngOnDestroy(): void {
        console.log('implement ondestroy')
    }


}
