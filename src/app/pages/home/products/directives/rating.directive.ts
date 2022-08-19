import { Directive, HostListener, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
@Directive({
  selector: '[appRating]',
})
export class RatingDirective {
  @Input()
  appRating: number = 0;
  faStar = faStar;
  faStarHalf = faStarHalf;
  // doesn't pass input correctly if  you call the function in constructor
  constructor(private el: FaIconComponent) {

  }
  // can't bind icon property correctly
  private addIcon(appRating: number) {
    console.log(this.appRating);
    if (this.appRating >= 1) {
      this.el.renderedIconHTML = faStar;
      this.el.styles = { color: 'gold' };
    } else if (this.appRating < 1 && this.appRating > 0) {
      this.el.renderedIconHTML = faStarHalf;
      this.el.styles = { color: 'gold' };
    } else {
      this.el.icon = faStar;
      this.el.styles = { color: 'silver' };
    }
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.addIcon(this.appRating);
  }
}
