from __future__ import annotations

import json
from pathlib import Path

import fitz
from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[2]
PDF_PATH = Path.home() / "Desktop" / "APE26.pdf"
DATA_PATH = PROJECT_ROOT / "public" / "data" / "menu-data.json"
ASSETS_DIR = PROJECT_ROOT / "public" / "menu-assets"
RENDER_SCALE = 2

STATIC_ASSETS = {
    "hero": (1, (30, 20, 1160, 245)),
    "footer": (2, (18, 1070, 1174, 1642)),
}


def render_page(page: fitz.Page) -> Image.Image:
    pixmap = page.get_pixmap(matrix=fitz.Matrix(RENDER_SCALE, RENDER_SCALE), alpha=False)
    mode = "RGB"
    size = (pixmap.width, pixmap.height)
    return Image.frombytes(mode, size, pixmap.samples)


def normalize_padding(padding: int | list[int] | tuple[int, ...]) -> tuple[int, int, int, int]:
    if isinstance(padding, int):
        return (padding, padding, padding, padding)
    if len(padding) == 4:
        left, top, right, bottom = padding
        return (left, top, right, bottom)
    raise ValueError(f"Padding non valido: {padding}")


def crop_with_padding(image: Image.Image, rect: list[int], padding: int | list[int] | tuple[int, ...]) -> Image.Image:
    left, top, right, bottom = rect
    pad_left, pad_top, pad_right, pad_bottom = normalize_padding(padding)
    width, height = image.size
    crop_box = (
        max(0, left - pad_left),
        max(0, top - pad_top),
        min(width, right + pad_right),
        min(height, bottom + pad_bottom),
    )
    return image.crop(crop_box)


def main() -> None:
    if not PDF_PATH.exists():
        raise SystemExit(f"PDF non trovato: {PDF_PATH}")
    if not DATA_PATH.exists():
        raise SystemExit(f"Dati menu non trovati: {DATA_PATH}")

    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    items_dir = ASSETS_DIR / "items"
    items_dir.mkdir(parents=True, exist_ok=True)
    data = json.loads(DATA_PATH.read_text())

    with fitz.open(PDF_PATH) as pdf:
        rendered_pages: dict[int, Image.Image] = {}
        for asset_name, (page_number, box) in STATIC_ASSETS.items():
            image = rendered_pages.get(page_number)
            if image is None:
                image = render_page(pdf[page_number - 1])
                rendered_pages[page_number] = image

            cropped = image.crop(box)
            output_path = ASSETS_DIR / f"{asset_name}.png"
            cropped.save(output_path, quality=95)
            print(f"Creato {output_path}")

        for section in data["sections"]:
            for item in section["items"]:
                page_number = item["page"]
                image = rendered_pages.get(page_number)
                if image is None:
                    image = render_page(pdf[page_number - 1])
                    rendered_pages[page_number] = image

                base_rect = item.get("cropRect", item["rect"])
                cropped = crop_with_padding(image, base_rect, item.get("cropPadding", 10))
                output_path = items_dir / f"{item['id']}.png"
                cropped.save(output_path, quality=95)
                print(f"Creato {output_path}")


if __name__ == "__main__":
    main()
