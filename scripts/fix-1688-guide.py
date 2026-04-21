import re
path = 'src/app/[locale]/guides/acheter-sur-1688-depuis-le-mali/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all remaining 1688 mentions
content = content.replace('1688', 'Alibaba')
content = content.replace('Guide1688Page', 'GuideAlibabaPage')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated 1688 guide page')
