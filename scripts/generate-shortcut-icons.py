#!/usr/bin/env python3
"""Generate shortcut icons for PWA manifest"""

from PIL import Image, ImageDraw

OUTPUT_DIR = "public/icons"

def create_shortcut_icon(size, color, symbol):
    img = Image.new('RGBA', (size, size), color + (255,))
    draw = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2
    scale = size / 96
    white = (255, 255, 255)
    
    if symbol == "calculator":
        # Calculator rectangle with buttons
        w, h = int(50 * scale), int(60 * scale)
        draw.rectangle([cx - w//2, cy - h//2, cx + w//2, cy + h//2], 
                      outline=white, width=max(2, int(4*scale)))
        # Display
        draw.line([(cx - w//2 + int(8*scale), cy - h//2 + int(12*scale)),
                   (cx + w//2 - int(8*scale), cy - h//2 + int(12*scale))],
                  fill=white, width=max(2, int(3*scale)))
        # Buttons
        btn_size = int(8 * scale)
        for row in range(2):
            for col in range(3):
                bx = cx - w//2 + int(12*scale) + col * int(14*scale)
                by = cy - h//2 + int(22*scale) + row * int(14*scale)
                draw.rectangle([bx, by, bx + btn_size, by + btn_size], fill=white)
    
    elif symbol == "contact":
        # Chat bubble
        bubble_w, bubble_h = int(56 * scale), int(40 * scale)
        draw.rounded_rectangle([cx - bubble_w//2, cy - bubble_h//2, 
                                cx + bubble_w//2, cy + bubble_h//2],
                               radius=int(8*scale), outline=white, 
                               width=max(2, int(4*scale)))
        # Bubble tail
        draw.polygon([
            (cx - int(8*scale), cy + bubble_h//2),
            (cx + int(8*scale), cy + bubble_h//2),
            (cx, cy + bubble_h//2 + int(10*scale))
        ], fill=white)
        # Two dots inside
        dot_r = int(4 * scale)
        draw.ellipse([cx - int(12*scale) - dot_r, cy - dot_r,
                      cx - int(12*scale) + dot_r, cy + dot_r], fill=white)
        draw.ellipse([cx + int(12*scale) - dot_r, cy - dot_r,
                      cx + int(12*scale) + dot_r, cy + dot_r], fill=white)
    
    elif symbol == "pricing":
        # Price tag
        tag_w, tag_h = int(50 * scale), int(40 * scale)
        draw.polygon([
            (cx - tag_w//2, cy - tag_h//2),
            (cx + tag_w//2, cy - tag_h//2),
            (cx + tag_w//2, cy + tag_h//4),
            (cx, cy + tag_h//2),
            (cx - tag_w//2, cy + tag_h//4),
        ], outline=white, width=max(2, int(4*scale)))
        # Hole in tag
        hole_r = int(4 * scale)
        draw.ellipse([cx - hole_r, cy - tag_h//2 - hole_r//2,
                      cx + hole_r, cy - tag_h//2 + hole_r*2], fill=white)
        # Dollar sign
        draw.text((cx - int(6*scale), cy - int(8*scale)), "$", 
                 fill=white)  # fallback if no font
    
    return img


# Generate shortcut icons at 96x96
create_shortcut_icon(96, (16, 185, 129), "calculator").save(f"{OUTPUT_DIR}/calculator-96x96.png", "PNG")
create_shortcut_icon(96, (139, 92, 246), "contact").save(f"{OUTPUT_DIR}/contact-96x96.png", "PNG")
create_shortcut_icon(96, (245, 158, 11), "pricing").save(f"{OUTPUT_DIR}/pricing-96x96.png", "PNG")

print("Generated shortcut icons")
