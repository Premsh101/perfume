"""Download the stock photographs and pinned Three.js dependency before serving dist/."""
import json
import urllib.request
from pathlib import Path
root = Path(__file__).resolve().parent
assets = root / "public" / "assets"
assets.mkdir(parents=True, exist_ok=True)
for name, source in json.loads((root / "asset-sources.json").read_text()).items():
    print("Downloading", name)
    urllib.request.urlretrieve(source["url"], assets / name)
print("Ready. Run the app with the documented runtime commands.")
