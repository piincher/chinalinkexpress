#!/usr/bin/env python3
"""
Generate PWA icons for ChinaLink Express
Creates all required PNG sizes + maskable variants + SVG icons
"""

import os
from PIL import Image, ImageDraw

# Configuration
BRAND_COLOR = (37, 99, 235)  # #2563eb - theme blue
WHITE = (255, 255, 255)
OUTPUT_DIR = "public/icons"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def draw_logo(draw, size):
    """Draw a professional logistics-themed icon"""
    cx, cy = size // 2, size // 2
    scale = size / 512
    
    # Globe circle
    globe_radius = int(180 * scale)
    globe_width = max(2, int(16 * scale))
    
    draw.ellipse(
        [cx - globe_radius, cy - globe_radius, 
         cx + globe_radius, cy + globe_radius],
        outline=WHITE, width=globe_width
    )
    
    # Latitude line
    draw.arc(
        [cx - globe_radius, cy - globe_radius, 
         cx + globe_radius, cy + globe_radius],
        start=0, end=360, fill=WHITE, width=max(1, int(8 * scale))
    )
    
    # Longitude line
    long_width = max(2, int(12 * scale))
    draw.ellipse(
        [cx - globe_radius//2, cy - globe_radius, 
         cx + globe_radius//2, cy + globe_radius],
        outline=WHITE, width=long_width
    )
    
    # Arrow (shipping direction)
    arrow_y = cy + int(100 * scale)
    arrow_length = int(200 * scale)
    arrow_head = int(40 * scale)
    arrow_width = max(4, int(20 * scale))
    
    draw.line(
        [(cx - arrow_length//2, arrow_y), (cx + arrow_length//2 - arrow_head, arrow_y)],
        fill=WHITE, width=arrow_width
    )
    
    draw.polygon([
        (cx + arrow_length//2, arrow_y),
        (cx + arrow_length//2 - arrow_head, arrow_y - arrow_head//2),
        (cx + arrow_length//2 - arrow_head, arrow_y + arrow_head//2),
    ], fill=WHITE)
    
    # Container box
    box_size = int(50 * scale)
    box_x = cx - arrow_length//4
    draw.rectangle(
        [box_x - box_size//2, arrow_y - box_size//2 - int(10*scale),
         box_x + box_size//2, arrow_y + box_size//2 - int(10*scale)],
        outline=WHITE, width=max(2, int(6 * scale))
    )


def create_icon(size, maskable=False):
    """Create a single icon at the given size"""
    if maskable:
        pad = int(size * 0.1)
        padded_size = size + 2 * pad
        padded = Image.new('RGBA', (padded_size, padded_size), BRAND_COLOR + (255,))
        draw_padded = ImageDraw.Draw(padded)
        draw_logo(draw_padded, padded_size)
        return padded.crop((pad, pad, pad + size, pad + size))
    else:
        img = Image.new('RGBA', (size, size), BRAND_COLOR + (255,))
        draw = ImageDraw.Draw(img)
        draw_logo(draw, size)
        return img


def create_favicon(size):
    """Create a simple favicon"""
    img = Image.new('RGBA', (size, size), BRAND_COLOR + (255,))
    draw = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2
    scale = size / 64
    
    margin = int(12 * scale)
    draw.rectangle(
        [margin, margin, size - margin, size - margin],
        outline=WHITE, width=max(2, int(4 * scale))
    )
    
    arrow_size = int(16 * scale)
    draw.polygon([
        (cx + arrow_size//2, cy),
        (cx - arrow_size//4, cy - arrow_size//3),
        (cx - arrow_size//4, cy + arrow_size//3),
    ], fill=WHITE)
    
    return img


# Generate standard icon sizes
icon_sizes = [72, 96, 128, 144, 152, 192, 384, 512]
for s in icon_sizes:
    create_icon(s, maskable=False).save(f"{OUTPUT_DIR}/icon-{s}x{s}.png", "PNG")
    create_icon(s, maskable=True).save(f"{OUTPUT_DIR}/icon-{s}x{s}-maskable.png", "PNG")
    print(f"Generated {s}x{s} icons")

# Generate favicon sizes
for s in [16, 32]:
    create_favicon(s).save(f"{OUTPUT_DIR}/icon-{s}x{s}.png", "PNG")
    print(f"Generated favicon {s}x{s}")

# Apple touch icon
apple_img = create_icon(180, maskable=False)
apple_img.save(f"{OUTPUT_DIR}/apple-touch-icon.png", "PNG")
print("Generated apple-touch-icon.png")

print("\nAll PWA icons generated successfully!")
