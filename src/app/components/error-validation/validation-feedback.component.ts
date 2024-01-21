import { Component, Input } from '@angular/core';
import { Maybe } from '../../types';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-error-validation',
  standalone: true,
  imports: [FaIconComponent, NgClass],
  templateUrl: './validation-feedback.component.html',
  styleUrl: './validation-feedback.component.css',
})
export class ValidationFeedbackComponent {
  @Input({ required: true }) text!: string;
  @Input() icon: Maybe<IconProp>;
  @Input() textColor: Maybe<string>;
  @Input() textSize: Maybe<'text-sm' | 'text-base' | 'text-lg'>;
}
