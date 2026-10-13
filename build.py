import os
def card(t,tx):return f'<div class="card reveal mem-card"><div class="mem-face"><h2>{t}</h2><p class="mem-hint">Press me to open <span>✦</span></p></div><div class="mem-content"><p>{tx}</p></div></div>'
def page(n,t,body,cls=''):
    open(n+'.html','w').write(f'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0a1a3a"><title>{t}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="style.css"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet"></head><body class="{cls}" data-page="{n}"><main><h2 class=\"page-name\">{t}</h2>{body}</main><script src="script.js"></script></body></html>')

page('start','Start','''<section class="hero">
<p class="eyebrow seq">before you begin</p>
<h1 class="seq">I'm sorry, Charvi.</h1>
<p class="seq">This was never my college project. I lied to you.<br>It was built <span class="highlight">completely for you</span>.</p>
<h1 class="seq">This website was built by hand.</h1>
<h1 class="seq">No templates. No vibe coding.</h1>
<p class="seq">Just HTML, CSS and JavaScript, written line by line by me, over about <span class="highlight">6 months and 13 days</span>.</p>
<p class="seq">I'm not asking for much. Please read every line, and spend some time on every page.</p>
<p class="seq">Every page of this is <span class="highlight">dedicated to you, Charvi</span>.</p>
<p class="seq">Please take your time. If you're busy right now, come back when you're free before opening the next page, because this is <span class="highlight">very important to me</span>. Make sure you're free before you read it.</p>
<a class="btn seq" href="home.html">Enter →</a></section>''')

page('home','Home','''<section class="hero">
<p class="eyebrow seq">for Charvi</p>
<h1 class="seq">Before you read this, know that this isn't a proposal.</h1>
<h1 class="seq">It's a story.</h1>
<p class="seq">Not just a letter. A quiet story about sky-blue days, small moments, and things I never found the words for. Take your time. There is nothing you have to do at the end of it.</p>
<a class="btn seq" href="memories.html">Begin the story →</a></section>''')

page('memories','Memories',f'''<section class="wrap"><p class="eyebrow reveal">Chapter 1</p><h1 class="reveal">Where it began</h1>
<p class="reveal">I was in Class 9. You were in Class 7. I started liking you because you were so kind, and because of the playful, childlike way you moved through ordinary days. These are a few school moments that never left me.</p>
<div class="grid">
{card('The school bus','Games on the bus, noise, laughter, the kind of ride you only realise later was special.')}
{card('The dare game','During a dare, you "proposed" to me. It was a dare, it was funny, and I know exactly what it was: a silly childhood moment. I still smile when I remember it.')}
{card('Pongal, in blue','You wore a beautiful blue dress during Pongal. Blue is your colour, and that picture of you stayed in my mind more strongly than I can explain. It is why this whole site is sky blue.')}
{card("Teachers' Day",'I taught a lesson that day, playing the teacher. Small thing, but it belongs to those school years, and so do you.')}
{card('The circus trip','On the school trip to the circus, you ended up sitting in the seat right behind me. Totally by accident. A tiny moment, but I noticed, and I kept it.')}
{card('The dance','Go check my Instagram, there is a note waiting for you there. That song, and the way you danced to it, is still stuck in my mind.')}
</div>
<p class="quote reveal">Small moments. But somehow, they stayed.</p></section>''')

page('years','The Years','''<section class="wrap"><p class="eyebrow reveal">Chapter 2</p><h1 class="reveal">All these years</h1>
<p class="reveal">Life kept moving. Classes changed, schools changed, I grew up. But these feelings never completely went away. They just got quieter.</p>
<!-- No dates on purpose. Add your own inside any .tl block if you want. -->
<div class="timeline">
<div class="tl reveal"><h2>Class 9 · Class 7</h2><p>The beginning. Your kindness. Your playfulness. I didn't know it would last this long.</p></div>
<div class="tl reveal"><h2>The things I noticed</h2><p>Your dancing. Your speeches, the confidence, the way people listened. Your English, your maths, your languages. Little things you said that probably meant nothing to you and stayed with me for years.</p></div>
<div class="tl reveal"><h2>Our conversations</h2><p>Random talks, the way you behaved, moments from school. I remember them from your Grade 7 days until now.</p></div>
<div class="tl reveal"><h2>The quiet decision</h2><p>At one point I heard from a friend that you weren't interested in relationships. So I chose not to force my feelings into your life. I simply kept them to myself. Your space mattered more than my wish to say it.</p></div>
<div class="tl reveal"><h2>A new place</h2><p>Even after reaching a place I had worked so hard to get into, and meeting many new people there, my feelings didn't simply disappear. That's only my own experience. It's just true for me.</p></div>
</div>
<div class="note reveal">Nothing here is a complaint. Some memories just stayed, and I wanted you to know they were there.</div>
</section>''')

page('reunion','Reunion','''<section class="wrap"><p class="eyebrow reveal">Chapter 3</p><h1 class="reveal">Two years, and a bag of books</h1>
<p class="reveal">You were preparing for JEE Main. I had my old JEE preparation books, and I decided to give them to you. They were useful, so they should be with someone who could use them. Some feelings are easier to express through actions.</p>
<p class="reveal" style="margin-top:30px">It had been around two years since I had seen you. I was extremely nervous before coming to your home.</p>
<p class="reveal">Then you made me feel comfortable. You smiled. We had fun. The nervousness slowly melted, and it felt easy.</p>
<div class="dark gold reveal"><h2>About those books</h2><p>I promise I never used JEE, or those books, to try to impress you or get anything out of it. I gave them to you the way a brother would, with no hidden intention. I know how much studying matters, because back when I needed it, I didn't have any IIT seniors, brothers or sisters, to guide me.</p></div>
<div class="dark reveal"><h2>The chocolate</h2><p>I had brought your favourite chocolate. And I was so nervous that I didn't give it to you. It stayed with me the whole time. So, sorry, chocolate. You deserved a better ending.</p></div>
<p class="quote reveal">For me, seeing you again after those two years gave me a happiness I can hardly compare to anything else, even the happiness I felt when I got my IIT seat.</p>
<div class="note reveal">That is only how it felt for me. I'm not measuring it against anything. It was just a very happy day.</div></section>''')

page('efforts','What I Did','''<section class="wrap"><p class="eyebrow reveal">Chapter 4</p><h1 class="reveal">The stupid things I did</h1>
<div class="note reveal">This isn't a list of favours, and it isn't a bill. You don't owe me anything for any of it. These are simply things I did because you mattered to me.</div>
<ul class="list reveal"><li>Kept my feelings to myself instead of pushing them on you</li><li>Remembered small things about you</li><li>Came to meet you after around two years</li><li>Tried to learn Badugu, your language, back in Class 9 and 10. I don't really know why, even now</li><li>Brought your favourite chocolate (even if I froze)</li><li>Travelled back to Coimbatore hoping to see you</li><li>Kept caring, through distance and a busy college life</li><li>Missed two weeks of IIT orientation, because I postponed going just so I could see you in person first</li><li>Lied to you about a few small things, like saying I was at VIT, just to keep things simple</li><li>Spent more than ₹60,000 on this website and a personal server to host it. Probably too much, but it doesn't matter. It was meant to be something personal, just for you.</li></ul>
<div class="dark reveal"><h2>Coimbatore, the temple, Ooty</h2>
<p>After a long time, I came back to my hometown, Coimbatore. I hoped I might see you at the temple festival.</p>
<p>I couldn't get a reserved train seat, so I travelled unreserved. It was a hard journey, but I kept thinking: maybe I'll see her there.</p>
<p>But you had gone to Ooty. So I didn't get to see you, and I felt very disappointed.</p>
<div class="note">This story is not about blame. You did nothing wrong. You didn't know I was hoping to see you, and you had every right to be wherever you were. That day just showed me how much simply seeing you had come to mean to me.</div></div>
<h2 class="reveal">Distance and busy days</h2>
<p class="reveal">I'm in my first year of college now, more than 500 km away, with projects, semester exams, internships, and lots of responsibilities. Life got busier and the distance got greater, but somehow you still remained one of the people with a special place in my thoughts.</p></section>''')

page('time','The Time','''<section class="wrap" style="text-align:center">
<p class="eyebrow reveal">one more chapter, before the last</p>
<h1 class="reveal">The Time</h1>
<p class="reveal">Three clocks. Three different kinds of waiting. None of them are exact to the second, but none of them have stopped either.</p>

<div class="card reveal time-card"><h2>Since It Began</h2>
<p class="time-sub">From the day I first noticed you, Class 7, until this very second.</p>
<div class="clock">
<div><span class="num" id="c1y">0</span><label>Years</label></div>
<div><span class="num" id="c1d">0</span><label>Days</label></div>
<div><span class="num" id="c1h">00</span><label>Hrs</label></div>
</div></div>

<div class="card reveal time-card"><h2>Building This For You</h2>
<p class="time-sub">Every line of this site, written slowly and carefully, just so you'd have something real to read.</p>
<div class="clock">
<div><span class="num" id="c2mo">0</span><label>Months</label></div>
<div><span class="num" id="c2d">0</span><label>Days</label></div>
</div></div>

<div class="card reveal time-card"><h2>Since I Last Saw You</h2>
<p class="time-sub">Still running. Still counting. Even now, while you read this.</p>
<div class="clock">
<div><span class="num" id="c3d">0</span><label>Days</label></div>
<div><span class="num" id="c3h">00</span><label>Hrs</label></div>
</div></div>

<p class="quote reveal">These aren't just numbers.<br>I waited for you.</p>
</section>''')

page('letter','The Truth','''<section class="wrap"><div style="text-align:center"><p class="eyebrow reveal">The last chapter</p><h1 class="reveal">What I never said</h1>
<p class="reveal">Tap the envelope when you're ready. There's no hurry.</p>
<div class="env-wrap"><div class="env-halo"></div><div class="env" role="button" tabindex="0" aria-label="Open the letter"><div class="env-letter">🩵</div><span>For Charvi<br>✉ tap to open</span></div></div></div>
<div class="paper hidden">
<p class="reveal">I don't know what you'll feel after reading all this.</p>
<p class="reveal">Maybe you'll see me only as a friend. Maybe you need time. Maybe you don't feel the same way. And that is completely okay.</p>
<p class="reveal">I don't want this to pressure you. You don't owe me anything, not a reply, not a relationship, not for any book or journey or chocolate. I only wanted you to know what has been in my heart for all these years.</p>
<p class="reveal">You have been a special person in my life for a very long time. I value our friendship.</p>
<p class="reveal">And if you're comfortable giving me a chance, I'd really like to see where this could go.</p>
<p class="quote reveal">Thank you for being one of the most beautiful chapters of my story.</p>
<div class="dark reveal"><h2>Something else, honestly</h2>
<p>If I'm being honest, I'm an introvert. Maybe a little too innocent for my age, genuine to a fault, and easier to hurt than I usually let on.</p>
<p>I'm really only good at two things: studying, and building things like this.</p>
<p>I talk to plenty of people, at IIT, in internships, on projects, but none of it has ever come close to how I feel about you. You cross my mind more often than I'd probably admit, even on the hard days.</p>
<p>I know all of this might look like a lot, maybe even a bit much to you. That's okay. I just wanted to be honest.</p>
<p>I think I'm mature, and I think you are too. I'm not here expecting a cringe relationship. I want to be your next big brother, a second father, a good friend, someone you can share everything with, and who cares for you the way you care back. A really good bond, between two mature kids.</p></div>
<p class="reveal">I'm really afraid of your answer, because I'm really into you.</p>
<p class="reveal">After you read this, text me on Instagram. Even if it's 12 o'clock, I'll be waiting, because we need to talk, Charvi. Just say what you feel.</p>
<!-- BADUGU MESSAGE: type your own exact wording between the tags below, replacing the placeholder. Not generated on purpose. -->
<div class="badugu reveal">Yenaga ondhu vaipu thandharaya...</div>
<p class="quote reveal">Whatever your answer is, I'll respect it.</p>
<!-- PERSONAL DETAILS: put your name below -->
<p class="reveal">— Akilesh</p>
</div></section>''','night')

open('README.txt','w').write('''WEBSITE: HOW TO EDIT
1. Open index.html in a browser. It is the SIGN-IN page (electronics theme). After a correct sign-in it goes to start.html, the short note before the story begins.
   SIGN-IN ID AND PASSWORD: edit the first lines of signin.js (CREDENTIALS, HINT). The page itself is index.html + signin.css + signin.js (build.py does not touch them).
   Note: this is a front door, not a lock. The ID and password sit in signin.js, so anyone who views the page source can read them.
2. BADUGU: the message is already filled in on letter.html. Search "badugu reveal" there if you want to edit it further.
3. YOUR NAME: already set to Akilesh on letter.html. Search "— Akilesh" there if you want to change it.
4. COLOURS: edit the --sky / --navy / --gold values at the top of style.css.
5. build.py regenerates all HTML pages if you prefer editing text in one place (python build.py).
6. START PAGE OPENING: the colourful intro is in script.js (search "start page intro", words are in WORDS, length is the 12800 timer and the delays in style.css) and style.css (search "colourful opening"). It cannot be skipped, so the surprise lasts.
''')
