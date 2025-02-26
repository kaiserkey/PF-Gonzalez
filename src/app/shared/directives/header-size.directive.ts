import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeaderSize]',
  standalone: false,
})
export class HeaderSizeDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setSize('2rem');
  }

  private setSize(size: string) {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', size);
  }

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.setSize('2.5rem');
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.setSize('2rem');
  // }
}
