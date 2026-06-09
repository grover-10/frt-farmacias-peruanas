import { NgOptimizedImage } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  imports: [NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.scss',
})
export class SplashScreen { }
