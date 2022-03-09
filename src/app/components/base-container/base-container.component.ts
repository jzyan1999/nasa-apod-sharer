import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApodSharerService } from 'src/app/services/apod-sharer/apod-sharer.service';
import { FEEDTYPE, LIKED_EMPTY, REGULAR_EMPTY } from 'src/app/constants';
import { NASAImage } from 'src/app/interfaces';
import { LikedMediaService } from 'src/app/services/liked-media/liked-media.service';

@Component({
  selector: 'app-base-container',
  templateUrl: './base-container.component.html',
  styleUrls: ['./base-container.component.scss']
})
export class BaseContainerComponent implements OnInit {
  @ViewChild('menuOpenButton') menuOpenButton: ElementRef | undefined;
  @ViewChild('menuButton') menuButton: ElementRef | undefined;

  forYouLabel = "For You";
  likedPostsLabel = "Liked Posts";

  feedReg = FEEDTYPE.REGULAR;
  feedLiked = FEEDTYPE.LIKED;

  // Open, close menu
  public openMenu: boolean = false;

  // Scroll to top message
  public scrollTopMsg: string = "Scroll to top of feed";
  // Refresh feed message
  public refreshMsg: string = "Refresh feed contents";
  // Switch lighting message
  public lightingMsg: string = "Change lighting mode";

  // array of posts corresponding to regular feed
  public feedImages: NASAImage[] = [];
  // array of posts that have been liked
  public likedImages: NASAImage[] = [];
  // When to show skeleton loader (when images haven't loaded in yet from apod api)
  public mediaLoaded: boolean = false;
  // When to show skeleton loader (when additional images haven't loaded in yet)
  public scrollingLoaded: boolean = true;

  // Empty message for For You feed
  public forYouEmpty: string = REGULAR_EMPTY;
  // Empty message for Liked feed
  public likedEmpty: string = LIKED_EMPTY;

  constructor(
    private apodService: ApodSharerService,
    private likedMedService: LikedMediaService,
  ) {
    // apodService.getMedia();
  }

  // When initialized, get liked posts from local storage and retrieve initial posts from apod service
  ngOnInit(): void {
    this.likedImages = this.likedMedService.getLikedImages();
    // this.getMediaFeed(this.apodService.getInitialAPOD());
    
    // Get initial images
    this.getImages();
  }

  getImages(isInitial: boolean = true): void {
    this.apodService.getMedia(isInitial)
    .subscribe(
      data => {
        this.feedImages = this.feedImages.concat(data);

        this.mediaLoaded = true;
        this.scrollingLoaded = true;
      },
    );
  }

  // Retrieve initial posts from apod service
  // getMediaFeed(service: Observable<Object>): void {
  //   service.subscribe({
  //     next: (res: any) => {
  //       let newImages: NASAImage[] = res;

  //       // Looping through images from api call to add liked property and checking if it is already liked
  //       for (let i = 0; i < newImages.length; i++) {
          
  //         newImages[i].liked = false;

  //         for (let j = 0; j < this.likedImages.length; j++) {
  //           if (newImages[i].date === this.likedImages[j].date) {
  //             newImages[i].liked = true;
  //             break;
  //           }
  //         }

  //         if (!newImages[i].copyright) {
  //           newImages[i].copyright = 'NASA Public Domain';
  //         }
  //       }
        
  //       // Sort by date descending
  //       newImages.sort((a, b) => (a.date < b.date) ? 1 : -1);
  //       // Remove skeleton loader once everything is finished
  //       this.mediaLoaded = true;
  //       this.scrollingLoaded = true;

  //       // Adding new posts to regular feed
  //       this.feedImages = this.feedImages.concat(newImages);
  //     },
  //     error: (err: any) => {
  //       console.log(err)
  //     }
  //   })
  // }

  // Method called when like button clicked on posts either in regular or liked feeds
  updateLikedList(image: NASAImage) {
    // Find image in regular feed and update liked property
    let foundIndex = this.feedImages.findIndex(x => x.date === image.date);
    this.feedImages[foundIndex].liked = !this.feedImages[foundIndex].liked;

    // If post has been liked, add to liked feed and toggle liked property to true
    if (image.liked) {
      this.likedImages.push(image);
    }
    // If post has been unliked, remove from liked feed
    else {
      this.likedImages = this.likedImages.filter(({ date }) => date !== image.date); 
    }

    // Saving liked media to localStorage
    this.likedMedService.saveLikedImages(this.likedImages);
  }

  getApodService() {
    return this.apodService;
  }

  // Called when infinite scroll triggered to add more posts to regular feed
  updateFeed() {
    this.scrollingLoaded = false;
    // this.getMediaFeed(this.apodService.getScrollingImages());
    this.getImages(false);
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  returnToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.openMenu = !this.openMenu;
  }

  refreshFeed() {
    this.returnToTop();
    this.mediaLoaded = false;
    
    // this.getMediaFeed(this.apodService.getInitialAPOD());
    this.getImages();
  }
}
