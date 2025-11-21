import { Component } from '@angular/core';
import { NewImageGallery } from "@shared/components/organisms/new-image-gallery/new-image-gallery";
import { ImageGalleryUploadComponent } from "@shared/components/molecules/image-gallery-upload";
import { HeaderTextComponent } from "@shared/components/atoms/header-text/header-text";

@Component({
  selector: 'app-gallery-template',
  imports: [NewImageGallery, ImageGalleryUploadComponent, HeaderTextComponent],
  templateUrl: './gallery-template.html',
})
export class GalleryTemplate { }
