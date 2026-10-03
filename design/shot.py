"""Screenshot the desk scene for visual checks against design/desk-reference.png.

Usage:
  python design/shot.py out.png                 # whole scene, sitting height
  python design/shot.py out.png --raise 1.6     # hold the desk "up" key for N seconds first
  python design/shot.py out.png --focus right   # zoom into a screen (left|right)
  python design/shot.py out.png --clip 600,150,700,400   # crop x,y,w,h (viewport px)

Viewport is 1440x900, where one stage unit is 0.9 viewport px.
"""
import argparse
import sys

from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("out")
parser.add_argument("--url", default="http://localhost:3001/")
parser.add_argument("--raise", dest="raise_s", type=float, default=0)
parser.add_argument("--focus", choices=["left", "right"])
parser.add_argument("--refocus", choices=["left", "right"], help="zoom into a screen, then back out")
parser.add_argument("--clip")
parser.add_argument("--width", type=int, default=1440)
parser.add_argument("--height", type=int, default=900)
parser.add_argument("--scale", type=float, default=1, help="device pixel ratio, for sharper close-ups")
parser.add_argument("--wait", type=int, default=2400, help="ms to wait after load (the tile intro takes ~1.8s)")
parser.add_argument("--load", default="networkidle", help="goto wait_until; use 'commit' to catch the intro")
args = parser.parse_args()

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": args.width, "height": args.height}, device_scale_factor=args.scale)
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.goto(args.url, wait_until=args.load, timeout=120000)
    page.wait_for_timeout(args.wait)
    if args.raise_s:
        page.keyboard.down("ArrowUp")
        page.wait_for_timeout(int(args.raise_s * 1000))
        page.keyboard.up("ArrowUp")
        page.wait_for_timeout(900)
    if args.focus:
        page.click(f'[data-screen="{args.focus}"] .desk-screen-hit')
        page.wait_for_timeout(1500)
    if args.refocus:
        page.click(f'[data-screen="{args.refocus}"] .desk-screen-hit')
        page.wait_for_timeout(1500)
        page.keyboard.press("Escape")
        page.wait_for_timeout(2500)
    shot = {"path": args.out}
    if args.clip:
        x, y, w, h = (int(v) for v in args.clip.split(","))
        shot["clip"] = {"x": x, "y": y, "width": w, "height": h}
    page.screenshot(**shot)
    browser.close()
    if errors:
        print("Browser errors:\n  " + "\n  ".join(errors[:10]), file=sys.stderr)
print("saved", args.out)
