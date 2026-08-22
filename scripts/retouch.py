"""Cinematic product retouch while preserving original ceramic pixels."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SRC = Path(r"C:\Ario Vibe Coding\FERBM\_preview_convert")
OUT = Path(r"C:\Ario Vibe Coding\FERBM\public\images")


def to_np(img: Image.Image) -> np.ndarray:
    return np.asarray(img.convert("RGB")).astype(np.float32) / 255.0


def from_np(arr: np.ndarray) -> Image.Image:
    clipped = np.clip(arr, 0.0, 1.0)
    return Image.fromarray((clipped * 255.0).round().astype(np.uint8), "RGB")


def lift_shadows(arr: np.ndarray, amount: float = 0.12) -> np.ndarray:
    luma = arr[..., 0] * 0.2126 + arr[..., 1] * 0.7152 + arr[..., 2] * 0.0722
    shadow = np.clip(1.0 - luma * 2.4, 0.0, 1.0)[..., None]
    return arr + shadow * amount * (1.0 - arr)


def roll_off_highlights(arr: np.ndarray, amount: float = 0.18) -> np.ndarray:
    luma = arr[..., 0] * 0.2126 + arr[..., 1] * 0.7152 + arr[..., 2] * 0.0722
    hi = np.clip((luma - 0.72) / 0.28, 0.0, 1.0)[..., None]
    return arr - hi * amount * arr


def teal_amber_grade(arr: np.ndarray, strength: float = 0.08) -> np.ndarray:
    luma = arr[..., 0] * 0.2126 + arr[..., 1] * 0.7152 + arr[..., 2] * 0.0722
    shadows = np.clip(1.0 - luma * 1.8, 0.0, 1.0)[..., None]
    highlights = np.clip((luma - 0.45) / 0.55, 0.0, 1.0)[..., None]
    teal = np.array([0.72, 0.92, 1.08], dtype=np.float32)
    amber = np.array([1.08, 0.98, 0.86], dtype=np.float32)
    graded = arr * (1.0 + shadows * (teal - 1.0) * strength * 1.4)
    graded = graded * (1.0 + highlights * (amber - 1.0) * strength)
    return graded


def vignette(arr: np.ndarray, strength: float = 0.28) -> np.ndarray:
    h, w = arr.shape[:2]
    y, x = np.ogrid[:h, :w]
    cy, cx = (h - 1) / 2.0, (w - 1) / 2.0
    dist = np.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2)
    mask = np.clip(dist, 0.0, 1.4) / 1.4
    falloff = (mask**1.6)[..., None] * strength
    return arr * (1.0 - falloff)


def unsharp(img: Image.Image, radius: float = 1.4, percent: int = 115, threshold: int = 2) -> Image.Image:
    return img.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=threshold))


def cinematic(img: Image.Image, *, shadow: float, highlight: float, grade: float, vig: float) -> Image.Image:
    img = ImageOps.exif_transpose(img)
    arr = to_np(img)
    arr = lift_shadows(arr, shadow)
    arr = roll_off_highlights(arr, highlight)
    arr = teal_amber_grade(arr, grade)
    arr = vignette(arr, vig)
    out = from_np(arr)
    out = ImageEnhance.Color(out).enhance(1.12)
    out = ImageEnhance.Contrast(out).enhance(1.08)
    out = ImageEnhance.Brightness(out).enhance(1.02)
    return unsharp(out)


PRESETS: dict[str, dict[str, float]] = {
    "preview.jpg": {"shadow": 0.14, "highlight": 0.22, "grade": 0.11, "vig": 0.22},
    "preview (1).jpg": {"shadow": 0.12, "highlight": 0.24, "grade": 0.10, "vig": 0.20},
    "preview (2).jpg": {"shadow": 0.16, "highlight": 0.20, "grade": 0.12, "vig": 0.24},
    "preview (3).jpg": {"shadow": 0.10, "highlight": 0.12, "grade": 0.07, "vig": 0.18},
    "preview (4).jpg": {"shadow": 0.10, "highlight": 0.16, "grade": 0.09, "vig": 0.18},
    "preview (5).jpg": {"shadow": 0.14, "highlight": 0.18, "grade": 0.10, "vig": 0.22},
    "preview (6).jpg": {"shadow": 0.16, "highlight": 0.20, "grade": 0.11, "vig": 0.24},
    "preview (7).jpg": {"shadow": 0.08, "highlight": 0.14, "grade": 0.06, "vig": 0.16},
    "unnamed (11).jpg": {"shadow": 0.10, "highlight": 0.16, "grade": 0.05, "vig": 0.20},
}

NAMES = {
    "preview.jpg": "stalagmite-holder.jpg",
    "preview (1).jpg": "trio-bowls.jpg",
    "preview (2).jpg": "flame-bowl.jpg",
    "preview (3).jpg": "star-vessel.jpg",
    "preview (4).jpg": "crumpled-cups.jpg",
    "preview (5).jpg": "guardian-vessel.jpg",
    "preview (6).jpg": "midnight-form.jpg",
    "preview (7).jpg": "watchful-totem.jpg",
    "unnamed (11).jpg": "fereshte-portrait.jpg",
}


def composite_on_studio(subject: Image.Image, bg_tone: tuple[int, int, int], size: tuple[int, int]) -> Image.Image:
    canvas = Image.new("RGB", size, bg_tone)
    # soft radial studio wash
    wash = Image.new("L", size, 0)
    arr = np.zeros((size[1], size[0]), dtype=np.float32)
    y, x = np.ogrid[: size[1], : size[0]]
    cy, cx = size[1] * 0.42, size[0] * 0.5
    dist = np.sqrt(((x - cx) / (size[0] * 0.42)) ** 2 + ((y - cy) / (size[1] * 0.42)) ** 2)
    arr = np.clip(1.0 - dist, 0.0, 1.0) ** 1.3
    wash = Image.fromarray((arr * 38).astype(np.uint8), "L")
    highlight = Image.new("RGB", size, (255, 244, 228))
    canvas = Image.composite(highlight, canvas, wash)

    subject = subject.convert("RGBA")
    sw, sh = subject.size
    max_h = int(size[1] * 0.86)
    max_w = int(size[0] * 0.82)
    scale = min(max_w / sw, max_h / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    subject = subject.resize((nw, nh), Image.Resampling.LANCZOS)
    x0 = (size[0] - nw) // 2
    y0 = size[1] - nh - int(size[1] * 0.05)
    canvas_rgba = canvas.convert("RGBA")
    canvas_rgba.alpha_composite(subject, (x0, y0))
    return canvas_rgba.convert("RGB")


def try_cutout(path: Path) -> Image.Image | None:
    try:
        from rembg import remove
    except Exception:
        return None
    raw = Image.open(path).convert("RGBA")
    return remove(raw)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    messy = {"preview (3).jpg", "preview (7).jpg"}

    for src_name, dest_name in NAMES.items():
        src = SRC / src_name
        img = Image.open(src)
        preset = PRESETS[src_name]

        if src_name in messy:
            cut = try_cutout(src)
            if cut is not None:
                bg = (18, 16, 15) if src_name == "preview (7).jpg" else (236, 229, 218)
                size = (1080, 1620)
                img = composite_on_studio(cut, bg, size)

        out = cinematic(img, **preset)
        dest = OUT / dest_name
        out.save(dest, "JPEG", quality=94, optimize=True, progressive=True)
        print(f"wrote {dest.name} {out.size}")


if __name__ == "__main__":
    main()
