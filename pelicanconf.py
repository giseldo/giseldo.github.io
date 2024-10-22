AUTHOR = 'Giseldo Neo'
SITENAME = 'Giseldo Neo'
SITEURL = "http://127.0.0.1:8000"

PATH = "content"
TIMEZONE = 'Europe/Rome'

# Tema utilizado
# https://kura.gg/eevee
# Cores do Tema
# https://getmdl.io/customize/index.html
THEME = "eevee"

THEME_PRIMARY = "indigo"
THEME_ACCENT = "blue"

OUTPUT_PATH='docs'

DEFAULT_LANG = 'pt'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

MENUITEMS = [
    ("Blog", "/"),
]

# Blogroll
#LINKS = (
#    ("Pelican", "https://getpelican.com/"),
#)

# Social widget
SOCIAL = (
    ("Instagram", "https://www.instagram.com/neogiseldo"),
    ("X", "https://x.com/giseldoneo"),
    ("GitHub", "https://github.com/giseldoneo"),
)

DISCLAIMER = False
COPYRIGHT = False
DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True