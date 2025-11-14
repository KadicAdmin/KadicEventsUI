import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';

@Directive({
    selector: '[assetsSrc]',
    standalone: true,
})
export class AssetsSrcDirective {
    private readonly elementRef = inject(ElementRef<HTMLElement>);
    private readonly renderer = inject(Renderer2);
    public readonly path = input<string | null | undefined>(undefined, {
        alias: 'assetsSrc',
    });

    private readonly assetsBaseUrl =
        API_CONFIG.assetsBaseUrl ?? API_CONFIG.baseUrl.replace(/\/api\/?$/, '');

    constructor() {
        effect(() => {
            this.updateSrc(this.path());
        });
    }

    private updateSrc(path?: string | null) {
        const resolved = this.resolveAssetUrl(path);

        if (resolved) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'src', resolved);
            return;
        }

        this.renderer.removeAttribute(this.elementRef.nativeElement, 'src');
    }

    private resolveAssetUrl(path?: string | null): string | null {
        if (!path) {
            return null;
        }

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        return `${this.assetsBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    }
}

