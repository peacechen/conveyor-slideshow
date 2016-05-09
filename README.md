## Conveyor - a plain old Javascript slideshow / carousel

Simple manual slideshow. Plain Javascript / HTML5 / CSS.  No jQuery dependency!<BR>

This package is released as a UMD module. It may be consumed as a CommonJS module or used as a global.

Setup:

    npm install

Start the example project at port 8080 and open http://localhost:8080/example :

    npm run example

### Usage

Conveyor uses CSS classes to show, hide, and transition (TBD) the slides.  The HTML structure should be:
```
<div myContainer>
    <div class="conveyor">
        <div class="conveyor-display">
            <div class="item conveyor-current"> --- Slide 1 --- </div>
            <div class="item"> --- Slide 2 --- </div>
            ...
        </div>
    </div>
</div>
```
Conveyor will automatically add the dots and arrows to the container.  Their HTML structures are:
```
<ol class="dotsList">
    <li class="conveyor-dot conveyor-dot-current"></li>
    <li class="conveyor-dot"></li>
    ...
</ol>
```

```
<div class="conveyor-ctrl-left">
    <a class="conveyor-prev">
        <span class="icon icon-arrow-left"></span>
    </a>
</div>
```

```
<div class="conveyor-ctrl-right">
    <a class="conveyor-next">
        <span class="icon icon-arrow-right"></span>
    </a>
</div>
```

See example/example.css for styling examples.  
[ToDo: Sass version]


### To Do
Pull requests are welcome.
* Unit tests.
* Add transitions and other eye candy.
* Add more user-configurable options such as slide transitions, nav arrow images...
* Auto-play
* Navigate by clicking on dots.
* General code cleanup

### License
MIT
