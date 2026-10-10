import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  signal,
} from "@angular/core";
import type * as THREE from "three";

@Component({
  selector: "app-hero-scene",
  standalone: true,
  template: `
    <div #canvasHost class="hero-scene__canvas-host"></div>
    @if (fallback()) {
      <div class="hero-scene__fallback" aria-hidden="true">
        <span class="hero-scene__fallback-core"></span>
        <span class="hero-scene__fallback-ring hero-scene__fallback-ring--one"></span>
        <span class="hero-scene__fallback-ring hero-scene__fallback-ring--two"></span>
      </div>
    }
  `,
  styleUrl: "./hero-scene.component.scss",
})
export class HeroSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild("canvasHost", { static: true })
  private canvasHost!: ElementRef<HTMLDivElement>;

  protected readonly fallback = signal(false);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private composition?: THREE.Group;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private animationFrameId = 0;
  private lastFrameTime = 0;
  private pointerX = 0;
  private pointerY = 0;
  private isVisible = true;
  private isInitializing = false;
  private isDestroyed = false;
  private reducedMotionQuery!: MediaQueryList;
  private mobileQuery!: MediaQueryList;

  private readonly onPointerMove = (event: PointerEvent): void => {
    const bounds = this.canvasHost.nativeElement.getBoundingClientRect();
    this.pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    this.pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  };

  private readonly onMotionPreferenceChange = (): void => {
    if (this.reducedMotionQuery.matches) {
      this.cancelAnimation();
      this.renderFrame(0);
    } else {
      this.startAnimation();
    }
  };

  private readonly onMobilePreferenceChange = (): void => {
    this.fallback.set(this.mobileQuery.matches);
    if (this.mobileQuery.matches) {
      this.disposeRenderer();
    } else if (this.renderer) {
      this.startAnimation();
    } else {
      this.initializeScene();
    }
  };

  private readonly onContextLost = (event: Event): void => {
    event.preventDefault();
    this.fallback.set(true);
    this.disposeRenderer();
  };

  ngAfterViewInit(): void {
    this.reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.mobileQuery = window.matchMedia("(max-width: 767px)");
    this.fallback.set(this.mobileQuery.matches);
    this.mobileQuery.addEventListener("change", this.onMobilePreferenceChange);
    this.reducedMotionQuery.addEventListener("change", this.onMotionPreferenceChange);

    if (this.fallback()) return;
    this.initializeScene();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.mobileQuery.removeEventListener("change", this.onMobilePreferenceChange);
    this.reducedMotionQuery.removeEventListener("change", this.onMotionPreferenceChange);
    this.disposeRenderer();
    this.canvasHost.nativeElement.replaceChildren();
  }

  private async initializeScene(): Promise<void> {
    if (this.renderer || this.isInitializing || this.isDestroyed) return;
    this.isInitializing = true;
    let context: WebGL2RenderingContext | null = null;

    try {
      const canvas = document.createElement("canvas");
      context = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      if (!context) {
        this.fallback.set(true);
        return;
      }

      const three = await import("three");
      if (this.isDestroyed || this.mobileQuery.matches) {
        context.getExtension("WEBGL_lose_context")?.loseContext();
        return;
      }

      const renderer = new three.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setClearColor(0x000000, 0);
      this.renderer = renderer;
      this.canvasHost.nativeElement.appendChild(renderer.domElement);
      renderer.domElement.addEventListener("webglcontextlost", this.onContextLost);
      this.createScene(three);
      this.resizeObserver = new ResizeObserver(() => this.resizeScene());
      this.resizeObserver.observe(this.canvasHost.nativeElement);
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) this.startAnimation();
        else this.cancelAnimation();
      });
      this.intersectionObserver.observe(this.canvasHost.nativeElement);
      this.canvasHost.nativeElement.addEventListener("pointermove", this.onPointerMove, {
        passive: true,
      });
      this.resizeScene();

      if (this.reducedMotionQuery.matches) this.renderFrame(0);
      else this.startAnimation();
    } catch (error) {
      if (this.isDestroyed) return;
      console.warn("Unable to initialize the hero WebGL scene; using the static graphic.", error);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
      this.disposeRenderer();
      this.fallback.set(true);
    } finally {
      this.isInitializing = false;
    }
  }

  private createScene(THREE: typeof import("three")): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(0, 0, 6.2);

    const composition = new THREE.Group();
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.08, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0x13294b,
        metalness: 0.55,
        roughness: 0.24,
        clearcoat: 0.8,
        clearcoatRoughness: 0.25,
        flatShading: true,
      }),
    );
    composition.add(core);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x42d9ff,
      metalness: 0.72,
      roughness: 0.28,
      emissive: 0x06384a,
      emissiveIntensity: 0.8,
    });
    const ringSpecs = [
      { radius: 1.55, tube: 0.018, rotation: [0.35, 0.15, 0.2] },
      { radius: 1.83, tube: 0.012, rotation: [1.05, 0.45, -0.4] },
      { radius: 1.35, tube: 0.012, rotation: [-0.55, 0.8, 0.9] },
    ] as const;

    for (const spec of ringSpecs) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(spec.radius, spec.tube, 6, 96),
        ringMaterial,
      );
      ring.rotation.set(spec.rotation[0], spec.rotation[1], spec.rotation[2]);
      composition.add(ring);
    }

    const ambientLight = new THREE.AmbientLight(0x8da9d6, 1.2);
    const keyLight = new THREE.PointLight(0x64e4ff, 24, 12);
    keyLight.position.set(2.8, 2.5, 3.5);
    const fillLight = new THREE.PointLight(0x8157ff, 18, 10);
    fillLight.position.set(-3, -1.5, -1);
    scene.add(composition, ambientLight, keyLight, fillLight);

    this.scene = scene;
    this.camera = camera;
    this.composition = composition;
  }

  private isDisposableMesh(object: THREE.Object3D): object is THREE.Mesh {
    return object.type === "Mesh" || object.type === "InstancedMesh";
  }

  private resizeScene(): void {
    if (!this.renderer || !this.camera) return;
    const { width, height } = this.canvasHost.nativeElement.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;

    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderFrame(0);
  }

  private startAnimation(): void {
    if (
      !this.renderer ||
      !this.isVisible ||
      this.reducedMotionQuery.matches ||
      this.mobileQuery.matches ||
      this.animationFrameId
    ) {
      return;
    }

    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
  }

  private animate(time: number): void {
    this.animationFrameId = 0;
    if (!this.renderer || !this.isVisible || this.mobileQuery.matches) return;

    if (time - this.lastFrameTime >= 1000 / 30) {
      this.lastFrameTime = time;
      this.renderFrame(time);
    }
    this.animationFrameId = requestAnimationFrame((nextTime) => this.animate(nextTime));
  }

  private renderFrame(time: number): void {
    if (!this.renderer || !this.scene || !this.camera || !this.composition) return;
    const elapsed = time * 0.00015;
    this.composition.rotation.y = elapsed + this.pointerX * 0.12;
    this.composition.rotation.x = Math.sin(elapsed * 1.4) * 0.06 + this.pointerY * 0.07;
    this.composition.position.y = Math.sin(elapsed * 1.8) * 0.06;
    this.renderer.render(this.scene, this.camera);
  }

  private cancelAnimation(): void {
    if (!this.animationFrameId) return;
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = 0;
  }

  private disposeRenderer(): void {
    this.cancelAnimation();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.resizeObserver = undefined;
    this.intersectionObserver = undefined;
    this.canvasHost.nativeElement.removeEventListener("pointermove", this.onPointerMove);

    const materials = new Set<THREE.Material>();
    this.scene?.traverse((object) => {
      if (!this.isDisposableMesh(object)) return;
      object.geometry.dispose();
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
      objectMaterials.forEach((material) => materials.add(material));
    });
    materials.forEach((material) => material.dispose());

    this.renderer?.domElement.removeEventListener("webglcontextlost", this.onContextLost);
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
    this.renderer?.domElement.remove();
    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.composition = undefined;
    this.lastFrameTime = 0;
  }
}
