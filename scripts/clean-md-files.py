#!/usr/bin/env python3
"""Remove all mentions of 1688, Taobao, and WeChat from markdown files"""

import os
import re

MD_DIRS = ["."]
MD_FILES = []

for d in MD_DIRS:
    for root, _, files in os.walk(d):
        # Skip node_modules and .next
        if "node_modules" in root or ".next" in root:
            continue
        for f in files:
            if f.endswith(".md"):
                MD_FILES.append(os.path.join(root, f))

def clean_line(line):
    # Remove 1688, Taobao, WeChat mentions
    line = re.sub(r'1688\.com', '', line, flags=re.IGNORECASE)
    line = re.sub(r'1688', '', line, flags=re.IGNORECASE)
    line = re.sub(r'Taobao', '', line, flags=re.IGNORECASE)
    line = re.sub(r'WeChat Pay', '', line, flags=re.IGNORECASE)
    line = re.sub(r'WeChat', '', line, flags=re.IGNORECASE)
    line = re.sub(r'wechat', '', line, flags=re.IGNORECASE)
    
    # Clean up double commas, extra spaces
    line = re.sub(r',\s*,', ',', line)
    line = re.sub(r'\(\s*\)', '', line)
    line = re.sub(r'\s+', ' ', line)
    line = line.strip()
    
    return line

for filepath in MD_FILES:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    content = clean_line(content)
    
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Cleaned {filepath}")

print(f"\nProcessed {len(MD_FILES)} markdown files")
