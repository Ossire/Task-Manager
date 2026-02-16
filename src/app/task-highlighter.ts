import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTaskHighlighter]',
  standalone: true,
})
export class TaskHighlightDirective implements OnChanges {
  @Input() appTaskHighlighter = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.highlight(this.appTaskHighlighter);
  }

  private highlight(isCompleted: boolean) {
    if (isCompleted) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#1a2f23');

      this.renderer.setStyle(this.el.nativeElement, 'borderLeft', '4px solid #22c55e');

      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.7');

      this.renderer.setStyle(this.el.nativeElement, 'textDecoration', 'line-through');

      this.renderer.setStyle(this.el.nativeElement, 'color', '#64748b');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
      this.renderer.removeStyle(this.el.nativeElement, 'borderLeft');
      this.renderer.removeStyle(this.el.nativeElement, 'opacity');
      this.renderer.removeStyle(this.el.nativeElement, 'textDecoration');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }
}
