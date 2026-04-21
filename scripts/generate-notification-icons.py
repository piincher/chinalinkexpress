#!/usr/bin/env python3
"""Generate notification icons for service worker"""

from PIL import Image, ImageDraw

OUTPUT_DIR = "public/icons"

def create_badge(size):
    """Monochrome badge for notifications (Android)"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2
    scale = size / 72
    
    # Simple arrow pointing right
    arrow_length = int(40 * scale)
    arrow_head = int(16 * scale)
    arrow_width = max(3, int(8 * scale))
    
    draw.line([(cx - arrow_length//2, cy), (cx + arrow_length//2 - arrow_head, cy)],
              fill=(255, 255, 255, 255), width=arrow_width)
    draw.polygon([
        (cx + arrow_length//2, cy),
        (cx + arrow_length//2 - arrow_head, cy - arrow_head//2),
        (cx + arrow_length//2 - arrow_head, cy + arrow_head//2),
    ], fill=(255, 255, 255, 255))
    
    return img


def create_action_icon(size, symbol):
    """Action icons for notification buttons"""
    img = Image.new('RGBA', (size, size), (37, 99, 235, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2
    scale = size / 96
    white = (255, 255, 255)
    
    if symbol == "open":
        # Open/external link arrow
        arrow_size = int(30 * scale)
        draw.polygon([
            (cx + arrow_size//2, cy - arrow_size//2),
            (cx + arrow_size//2 + int(10*scale), cy - arrow_size//2),
            (cx + arrow_size//2 + int(10*scale), cy + arrow_size//2 + int(10*scale)),
            (cx + arrow_size//2, cy + arrow_size//2 + int(10*scale)),
            (cx + arrow_size//2, cy + arrow_size//2),
            (cx - arrow_size//2, cy + arrow_size//2),
            (cx - arrow_size//2, cy - arrow_size//2),
        ], fill=white)
    
    elif symbol == "close":
        # X mark
        line_len = int(20 * scale)
        line_w = max(3, int(6 * scale))
        draw.line([(cx - line_len, cy - line_len), (cx + line_len, cy + line_len)],
                  fill=white, width=line_w)
        draw.line([(cx + line_len, cy - line_len), (cx - line_len, cy + line_len)],
                  fill=white, width=line_w)
    
    return img


create_badge(72).save(f"{OUTPUT_DIR}/badge-72x72.png", "PNG")
create_action_icon(96, "open").save(f"{OUTPUT_DIR}/open-96x96.png", "PNG")
create_action_icon(96, "close").save(f"{OUTPUT_DIR}/close-96x96.png", "PNG")

print("Generated notification icons")
