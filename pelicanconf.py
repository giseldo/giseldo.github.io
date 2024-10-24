AUTHOR = 'Giseldo Neo'
SITENAME = 'giseldo'
SITEURL = "https://giseldo.github.io/"

PATH = "content"
TIMEZONE = 'Europe/Rome'

# Tema utilizado
# https://kura.gg/eevee
# Cores do Tema
# https://getmdl.io/customize/index.html
#THEME = "eevee"
#THEME = "nikhil-theme"
#THEME = "aboutwilson"
#THEME = "chunk"
#THEME = "genus"
THEME = "pelican_themes/MinimalXY"

SITETITLE ="NeoIA"
SITESUBTITLE = "Um Blog sobre Inteligência Artificial"

THEME_PRIMARY = "indigo"
THEME_ACCENT = "blue"

OUTPUT_PATH='docs'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

#Menu
#MENUITEMS = (
#    ('Categories', '/' + CATEGORIES_SAVE_AS),
#    ('Archive', '/' + ARCHIVES_SAVE_AS),
#)

DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False
MENUITEMS = [
    ("Blog", "/category/blog"),
    ("Livros", "/pages/livros"),
    ("Produtos", "/pages/produtos"),
    ("Sobre", "/pages/sobre"),
]

#Blogroll
#LINKS = (
#    ("Produtos", "/pages/produtos"),
#    ("Livros", "/pages/livros"),
#    ("Sobre", "/pages/sobre"),
#    ("Blog", "/"),
#)

SOCIAL = (
    ('facebook', 'http://www.facebook.com/giseldoneo'),
    ('twitter', 'https://x.com/giseldoneo'),
    ('github', 'https://github.com/giseldo'),
    ('linkedin', 'https://www.linkedin.com/in/giseldo-neo-65b252b/'),
    ("Instagram", "https://www.instagram.com/neogiseldo"),
)

DISCLAIMER = False
COPYRIGHT = False
DEFAULT_PAGINATION = 10

PLUGIN_PATHS = ['../pelican-plugins/']
PLUGINS = ['disqus_static']

DISQUS_SITENAME = u'giseldo'
DISQUS_SECRET_KEY = u'fJ5p14YDOc0hF6aEOSdcmCGLyn2PDC9h1NjCvZd9D2hC2zbBe5Nb7iscFQ2QMnNL'
DISQUS_PUBLIC_KEY = u'3ozrYsRuwR7uXIKYwU8tkmp7BPQRZ0Swy0rtFCjQ1cjxlQmdFoa7auKyxRePOqaq'

# Theme customizations
#MINIMALXY_CUSTOM_CSS = 'static/custom.css'
#MINIMALXY_FAVICON = 'favicon.ico'
#MINIMALXY_START_YEAR = 2009
#MINIMALXY_CURRENT_YEAR = date.today().year

# Author
AUTHOR_INTRO = 'Inteligência Artificial Descomplicada'
AUTHOR_DESCRIPTION = 'É pesquisador e Professor de informática.'
AUTHOR_AVATAR = "https://0.gravatar.com/avatar/bfb31708333e29b57ed2284eb347ebe10b82b63bae2bfb08c3d80b000103e3aa?size=256"
#AUTHOR_WEB = 'http://giseldo.github.com'

# Services
#GOOGLE_ANALYTICS = 'UA-12345678-9'

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True