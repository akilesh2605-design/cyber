WEBSITE: HOW TO EDIT
1. Open index.html in a browser. It is the SIGN-IN page (electronics theme). After a correct sign-in it goes to start.html, the short note before the story begins.
   SIGN-IN ID AND PASSWORD: edit the first lines of signin.js (CREDENTIALS, HINT). The page itself is index.html + signin.css + signin.js (build.py does not touch them).
   Note: this is a front door, not a lock. The ID and password sit in signin.js, so anyone who views the page source can read them.
2. BADUGU: the message is already filled in on letter.html. Search "badugu reveal" there if you want to edit it further.
3. YOUR NAME: already set to Akilesh on letter.html. Search "— Akilesh" there if you want to change it.
4. COLOURS: edit the --sky / --navy / --gold values at the top of style.css.
5. build.py regenerates all HTML pages if you prefer editing text in one place (python build.py).
6. START PAGE OPENING: the colourful intro is in script.js (search "start page intro", words are in WORDS, length is the 12800 timer and the delays in style.css) and style.css (search "colourful opening"). It cannot be skipped, so the surprise lasts.
