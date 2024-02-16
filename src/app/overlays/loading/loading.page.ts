import { Component, OnInit, ElementRef } from "@angular/core";
import lottie from "lottie-web";
import { animationPath } from "./loading.animation";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.page.html",
  styleUrls: ["./loading.page.scss"],
})
export class LoadingPage implements OnInit {
  private animationDuration: number = 4000; // Animation duration in milliseconds
  private animation: any; // Declare animation variable

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const animationContainer = this.elementRef.nativeElement.querySelector('#lottie-container');
    this.animation = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: animationPath
    });
    this.playAnimationWithDuration();
  }

  private playAnimationWithDuration() {
    this.animation.play();
    setTimeout(() => {
      console.log('Animation completed!');
    }, this.animationDuration);
  }
}
