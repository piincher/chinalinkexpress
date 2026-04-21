#!/usr/bin/env python3
"""Remove all mentions of 1688, Taobao, and WeChat from i18n locale files"""

import json
import re
import os

LOCALES_DIR = "src/i18n/locales"
LOCALES = ["fr", "en", "zh", "ar"]

replacements = [
    # French
    (r'Alibaba ou 1688', 'Alibaba'),
    (r'Alibaba/1688', 'Alibaba'),
    (r'Alibaba, 1688', 'Alibaba'),
    (r'Alibaba et 1688', 'Alibaba'),
    (r'1688', ''),
    (r'Taobao', ''),
    (r'WeChat Pay', ''),
    (r'WeChat', ''),
    (r'wechat', ''),
    (r'Alipay, ,', 'Alipay,'),
    (r'Alipay,  et', 'Alipay et'),
    (r'Alipay,  et', 'Alipay et'),
    (r' et ,', ''),
    (r', ,', ','),
    (r',  ', ' '),
    (r'  ', ' '),
]

def clean_text(text):
    if not isinstance(text, str):
        return text
    
    # Remove specific patterns first
    text = re.sub(r'Alibaba ou 1688', 'Alibaba', text, flags=re.IGNORECASE)
    text = re.sub(r'Alibaba/1688', 'Alibaba', text, flags=re.IGNORECASE)
    text = re.sub(r'Alibaba, 1688 et Taobao', 'Alibaba', text, flags=re.IGNORECASE)
    text = re.sub(r'Alibaba, 1688 et', 'Alibaba et', text, flags=re.IGNORECASE)
    text = re.sub(r'Alibaba, 1688', 'Alibaba', text, flags=re.IGNORECASE)
    text = re.sub(r'Alibaba et 1688', 'Alibaba', text, flags=re.IGNORECASE)
    text = re.sub(r'1688\.com', '', text, flags=re.IGNORECASE)
    text = re.sub(r'1688', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Taobao', '', text, flags=re.IGNORECASE)
    text = re.sub(r'WeChat Pay', '', text, flags=re.IGNORECASE)
    text = re.sub(r'WeChat', '', text, flags=re.IGNORECASE)
    text = re.sub(r'wechat', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Alipay,\s*,', 'Alipay,', text)
    text = re.sub(r'Alipay,\s*et', 'Alipay et', text)
    text = re.sub(r'et\s*,\s*', 'et ', text)
    text = re.sub(r',\s*,', ',', text)
    text = re.sub(r',\s*\.', '.', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r',\s*et\s*,', ' et ', text)
    text = re.sub(r'\(\s*\)', '', text)
    text = re.sub(r'\[\s*\]', '', text)
    text = text.strip()
    text = re.sub(r'^,\s*', '', text)
    text = re.sub(r',\s*$', '', text)
    text = re.sub(r'\s+', ' ', text)
    
    return text

def process_json(obj):
    if isinstance(obj, dict):
        return {k: process_json(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [process_json(item) for item in obj]
    elif isinstance(obj, str):
        return clean_text(obj)
    return obj

for locale in LOCALES:
    filepath = os.path.join(LOCALES_DIR, locale, "common.json")
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (not found)")
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    data = process_json(data)
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Cleaned {filepath}")

print("\nAll locale files cleaned!")
