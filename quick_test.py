import requests
import json

response = requests.get("http://localhost:8001/api/menu")
data = response.json()

print('📊 Menu Test Results:')
print(f'Total items: {len(data)}')
items_with_images = [item for item in data if item.get('image_url')]
print(f'Items with images: {len(items_with_images)}/{len(data)}')
print()
print('🔍 First 3 items with image status:')
for i, item in enumerate(data[:3]):
    url = item.get('image_url', 'NO URL')
    format_type = 'JPG' if url.endswith('.jpg') else 'WEBP' if url.endswith('.webp') else 'UNKNOWN'
    has_image = 'YES' if url != 'NO URL' else 'NO'
    print(f'{i+1}. {item["name"]} - {format_type} - {has_image}')
    if has_image == 'YES':
        print(f'    URL: {url[:60]}...')