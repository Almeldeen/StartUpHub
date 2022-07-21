import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/backend/models/account';
import { CompanyProfile } from 'app/core/backend/models/company-profile';
import { GeneralService, PhotosService } from 'app/core/backend/services';
import { CompanyService } from 'app/core/backend/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CompanyLocalService {
  $companyProfile = new BehaviorSubject<CompanyProfile| null>(null);
  $public = new BehaviorSubject<boolean>(true);
  $publicUserId = new BehaviorSubject<string>('');
  constructor(
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private accService: AccountService,
    ) {
    
   }

  getProfile(profileId: string){
    this.accService.identity().subscribe({
      next: (usr) => {
        if(usr.id === profileId){
          this.$public.next(false);
          this.companyService.getCompanyProfile().subscribe((res) => {
           
            this.$companyProfile.next(res);
          });
        }else{

          this.companyService.getCompanyProfile({
            userId: profileId
          }).subscribe((res) => {
            this.$companyProfile.next(res);
            this.$public.next(true);
            this.$publicUserId.next(profileId);
          }, () => {
            this.toastr.error('Error has been occurred!');
            this.$companyProfile.next(null);
          });

        }

      }
    })
  }
  
}
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  uploadingImage = false;
  uploadingImageCover = false;

  profile:CompanyProfile;
  acc: Account;
  gettingProfile = false;
  constructor(private companyService: CompanyLocalService, 
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private generalService: GeneralService,
    private accService: AccountService,
    private photosService: PhotosService,
    ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.companyService.$companyProfile.next(null);
      this.companyService.getProfile(params['id']);
      this.gettingProfile = true;
      this.companyService.$companyProfile.subscribe((res) => {
        if(res){
          this.profile = res;
          this.gettingProfile = false;
        }
      }, () => {
        this.gettingProfile = false;

      });

    })
    

    this.accService.getAuthenticationState().subscribe((user) => {
      this.acc = user;
    })
    
  }

  uploadImageProfile(image: File){
    if(image){
      this.uploadingImage = true;
      this.photosService.changePhotos({
        body: {
          image: image,
          type: 'Profile'
        }
      }).subscribe({
        next: (data) => {
          this.uploadingImage = false;
          this.accService.identity(true).subscribe();
          this.profile.userImg = data;

          this.toastr.success("Image has been changed");
        },
        error: (err) => {
          this.uploadingImage = false;
          this.toastr.error("Error has been occurred!");
        } 
      })
    }
  }

  uploadImageCover(image: File){
    if(image){
      this.uploadingImageCover = true;
      this.photosService.changePhotos({
        body: {
          image: image,
          type: 'Cover'
        }
      }).subscribe({
        next: (data) => {
          this.uploadingImageCover = false;
          this.profile.coverImg = data;
          this.toastr.success("Image has been changed");
        },
        error: (err) => {
          this.uploadingImageCover = false;
          this.toastr.error("Error has been occurred!");
        } 
      })
    }
  }


  follow(event){
    event.target.disabled = true;
    this.companyService.$publicUserId.pipe(first(),).subscribe(id => {
    this.generalService.sendFollow({
      userId: id
    }).subscribe(() => {
      if(event && event.target){
        event.target.disabled = false;
      }
      if(this.companyService.$companyProfile){
        this.companyService.$companyProfile.next({...this.companyService.$companyProfile.value, followedHim: true,
          followersCount:this.companyService.$companyProfile.value.followersCount + 1})
      }
    }, () => {
      if(event && event.target){
        event.target.disabled = false;
      }
    })
  });
  }
  unFollow(event){
    if(event && event.target){
      event.target.disabled = true;
    }
    this.companyService.$publicUserId.pipe(first(),).subscribe(id => {
      this.generalService.unfollow({
        userId: id
      }).subscribe(() => {
        if(event && event.target){
          event.target.disabled = false;
        }
        if(this.companyService.$companyProfile){
          this.companyService.$companyProfile.next({...this.companyService.$companyProfile.value, followedHim: false,
             followersCount:this.companyService.$companyProfile.value.followersCount - 1 })
        }
      }, () => {
        if(event && event.target){
          event.target.disabled = false;
        }
      })
      
    })
  }
}
