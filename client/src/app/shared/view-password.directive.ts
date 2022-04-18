import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from "@angular/core";

// @Directive({
//   selector: "[appViewPassword]",
// })
// export class ViewPassword implements OnInit {
//   @HostBinding("type.text") type = "password";

//   constructor(private element: ElementRef) {}

//   @HostListener("click") showPassword() {}
//   ngOnInit(): void {}
// }
@Directive({
  selector: "[appShowPassword]",
})
export class ViewPasswordDirective {
  //   defaultColor: string = "yellow";
  //   highlightColor: string = "red";
  //   @HostBinding("style.backgroundColor") backgroundColor: string;

  //   constructor(private el: ElementRef, private renderer: Renderer2) {}

  //   @HostListener("mouseenter") onMouseEnter(eventData: Event) {
  //     this.backgroundColor = this.highlightColor;
  //   }

  //   @HostListener("mouseleave") onMouseLeave(eventData: Event) {
  //     this.backgroundColor = this.defaultColor;
  //   }
  //   ngOnInit(): void {}
  constructor(private el: ElementRef) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.highlight("password");
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.highlight("text");
  }

  private highlight(type: string) {
    this.el.nativeElement.type = type;
  }
}
