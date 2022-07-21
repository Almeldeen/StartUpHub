import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/backend/models';
import { InternProfile } from 'app/core/backend/models/intern-profile';
import { GeneralService, PhotosService } from 'app/core/backend/services';
import { InternService } from 'app/core/backend/services/intern.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class InternLocalService {
  $internProfile = new BehaviorSubject<InternProfile| null>(null);
  $public = new BehaviorSubject<boolean>(true);
  $publicUserId = new BehaviorSubject<string>('');
  constructor(
    private internService: InternService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private accService: AccountService,
    ) {
    
   }

  getProfile(profileId: string){
    this.accService.getAuthenticationState().subscribe({
      next: (usr) => {
        if(usr.id === profileId){
          this.$public.next(false);
          this.internService.getInternProfile().subscribe((res) => {
           
            this.$internProfile.next(res);
          });
        }else{
          this.internService.getInternProfile({
            userId: profileId
          }).subscribe((res) => {
            this.$internProfile.next(res);
            this.$public.next(true);
            this.$publicUserId.next(profileId);
          }, () => {
            this.toastr.error('Error has been occurred!');
            this.$internProfile.next(null);
          });

        }

      }
    })
  }
  
}
@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss']
})
export class InternComponent implements OnInit {

  uploadingImage = false;
  uploadingImageCover = false;

  profile:InternProfile;
  acc: Account;
  gettingProfile = false;
  constructor(private internService: InternLocalService, 
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private generalService: GeneralService,
    private accService: AccountService,
    private photosService: PhotosService,
    ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.gettingProfile = true;
      this.internService.$internProfile.next(null);
      this.internService.getProfile(params['id']);
      this.internService.$internProfile.subscribe((res) => {
        if(res){
          this.profile = res;
          this.gettingProfile = false;
        }
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
    this.internService.$publicUserId.pipe(first(),).subscribe(id => {
    this.generalService.sendFollow({
      userId: id
    }).subscribe(() => {
      if(event && event.target){
        event.target.disabled = false;
      }
      if(this.internService.$internProfile){
        this.internService.$internProfile.next({...this.internService.$internProfile.value, followedHim: true,
          followersCount:this.internService.$internProfile.value.followersCount + 1})
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
    this.internService.$publicUserId.pipe(first(),).subscribe(id => {
      this.generalService.unfollow({
        userId: id
      }).subscribe(() => {
        if(event && event.target){
          event.target.disabled = false;
        }
        if(this.internService.$internProfile){
          this.internService.$internProfile.next({...this.internService.$internProfile.value, followedHim: false,
             followersCount:this.internService.$internProfile.value.followersCount - 1 })
        }
      }, () => {
        if(event && event.target){
          event.target.disabled = false;
        }
      })
      
    })
  }

}
