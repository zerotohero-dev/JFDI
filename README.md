![JFDI Travis CI Build Status](https://api.travis-ci.org/v0lkan/JFDI.png) &nbsp;
![JFDI NPM version](https://badge.fury.io/js/jfdi.png) &nbsp;
![Dependency Info](https://david-dm.org/v0lkan/JFDI.png)
<pre>
                    ___         ___           ___
                   /\  \       /\  \         /\  \          ___
                   \:\  \     /::\  \       /::\  \        /\  \
               ___ /::\__\   /:/\:\  \     /:/\:\  \       \:\  \
              /\  /:/\/__/  /::\~\:\  \   /:/  \:\__\      /::\__\
              \:\/:/  /    /:/\:\ \:\__\ /:/__/ \:|__|  __/:/\/__/
               \::/  /     \/__\:\ \/__/ \:\  \ /:/  / /\/:/  /
                \/__/           \:\__\    \:\  /:/  /  \::/__/
                                 \/__/     \:\/:/  /    \:\__\
                                            \::/__/      \/__/
</pre>

# A Hacker's Way of Getting $#!% Done

## Every Saga Has a Beginning

It all started with
[the **JFDI** Methodology](https://gist.github.com/v0lkan/2694911) and
[the **JFDI** Manifesto](https://gist.github.com/v0lkan/2731233)

> **JFDI** is a *command line interface* to help you focus what goals
you can achieve **right now**.

## Why A Command Line Interface?

Because, we geeks live in the terminal. And using something that is already
open, and is most of the time in front of your eyes, will help you beat the
inertia of launching a separate app, to manage your goals.

> Adding a **JFDI** goal is as simple as `jfdi save the world`. You don't have
> to wait for your shiny dandy GTD desktop app to launch; index its tasks;
> connect to the Internet; sync recent data; render a pretty UI; and then
> wait for you to click the "add task" button.
>
> You just type your goal, hit **enter** and **bang!** it's there.

No process can be less interruptive, and faster than this!

The main aim of the application is to help you **what need to be get done
today**. So unlike other productivity <stike>pron</stike> apps, in **JFDI**
you will not find dates, schedules, reminders, labels&hellip; to distract
yo away.

### Why Right Now?

Because it's f\*cking "**JFDI**" !

## Planning Is a Bummer

Admit it, most of the time you don't plan launching manless spaceships to the
moon. Your typical is something like

* Fix bug id UNP9959: Unicorns and ponies should live together.
* Remember the milk.
* Save the world.

Why torture your brain by setting *due dates* weeks from now
to those simple tasks?! Just bump it to tomorrow, and **JFDI** what you can do
**right now**.

> Every day, your tomorrow goals will be carriead over to the bottom of your
**today** queue; and you will deal with themm when when their time comes.
If a goal will neither be done today, nor in a foreseeable future you can move
it to a **later** queue and **JFDI** won't bother you until you have time for
that goal.

* *TODO://* the above feature is not implemented yet; it is in our **JFDI**
queue.

## It is Plain Text Files, Baby

Do you know what is universally reachable, and modifiable, withouth needing
to download special software? A plain text file. You can edit your text file
on your Mac, on your PC, in your smart phone, in your tablet&hellip; Text files
are damn fast to edit; **they do not distract you**.

What **JFDI** does is similar. It maintains *plain text files* in a sync
directory of your choice. So if you set your sync directory to something like

`/home/procrastinator/Dropbox/JFDI/`

(being /home/procrastinator/Dropbox/ your [Dropbox](http://dropbox.com/) folder)

then you can edit these files wherever you want. You can sort your priorities
even when you are offline. And once you are done, they will be syncronized
everywhere.

**JFDI** is a **command line interface** that maintains three text files:

* **today.txt**,
* **tomorrow.txt**,
* and **done.txt**;

and it gives you the liberty to modify them however you like.

It will play nicely, as long as you remmember to keep each goal in a separate
line.

> So you can edit you goals even without using **JFDI**; and it it won't blow
up anything.

## Setup

### Setup for Linux / Mac

Setting up your **JFDI** environment is easy.

You should have [Node.JS](http://nodejs.org/) installed, first.

Once you have **Node.JS** installed, just run:

    sudo npm install -g jfdi

and you will have **JFDI** installed globally.

### Setup for Windows

It is similar to Linux setup. After having installed **Node.JS**, just run.

    npm install -g jfdi

and you are done.

## Configuration

> **Tip**:
>
> For Linux users setting up an alias like `alias j="sudo jfdi";`
> may save you a few keystrokes.

> **Tip**:
>
> You might need root privileges to use **JFDI**.
> If the command examples given below do not work for you, replace
> `jfdi` with `sudo jfdi`, and try them again.
>
> If they still fail, [file a bug report](https://github.com/v0lkan/JFDI/issues/new).

To configure your **JFDI**, just type `jfdi` to the terminal.

    $: jfdi

And you will get a prompt similar to this:

    ### Set Your JFDI for the First Time ###

        It looks like this is the first time you are using JFDI.
        Dont't worry, it's easy.

        The only thing you need to configure is a folder to
        store your JFDI data.

        Where do you want to store your JFDI data?
        Enter the full path ( like: /home/ninja/Dropbox/JFDI/ ).

    prompt: path:

Just type in the **full path** of a valid folder on your system.

    prompt: path:  /home/procrastinator/Dropbox/JFDI/

and then press enter. You will get this notification upon success:

    ### Yay! ####

        Ready to go! You can use JFDI now.

        Visit

        https://github.com/v0lkan/JFDI/blob/master/README.md

        for usage examples.

You can further verify everything is set up by checking your **JFDI** data
directory:

    root@localhost:~/PROJECTS/JFDI# ls /root/Dropbox/JFDIExample/ -al
    total 8
    drwxr-xr-x  2 root root 4096 Sep 10 17:22 .
    drwx------ 11 root root 4096 Sep 10 13:50 ..
    -rw-r--r--  1 root root    0 Sep 10 17:22 done.txt
    -rw-r--r--  1 root root    0 Sep 10 17:22 today.txt
    -rw-r--r--  1 root root    0 Sep 10 17:22 tomorrow.txt

If everything is set up correctly, once you run `jfdi` once more, you will
get this message:

    $: jfdi

    ### JFDI List For Today ###

       *Zero Inbox* for today! Hooray!

       Sample Usage:
           Add a Goal       : jfdi [-a] "Save the world; one goal at a time."
           List Goals       : jfdi -l
           List All Commands: jfdi -h

Which means that you are all set! Congratulations!

## Usage

### Displaying Help

    $: jfdi -h

### Adding a Goal

Use

    $: jfdi Save the cheerleader, save the world.

Or you can use quotes if you have special characters in your goal:

    $: jfdi "Save the cheerleader, (save the world)."

Here is a sample response:

    $: jfdi Save the cheerleader, save the world.

Will output the updated goals list.

    ### JFDI List For Today ###

    0 Save the cheerleader, save the world.

### Listing Goals

Just type `jfdi`.

    $: jfdi

will output:

    ### JFDI List For Today ###

    ### JFDI List For Today ###

    0 learn kung-fu
    1 buy milk.
    2 Save the cheerleader, save the world.

### Deferring a Goal

Use `jfdi -d <goal id>`.

For the above list

    $: jfdi -d 1

Will output:

    ### JFDI List For Today ###

    0 learn kung-fu
    1 Save the cheerleader, save the world.

(*note that "buy milk" goal for id 1 has been moved*)

### Listing Deferred Goals

Use `jfdi tomorrow`.

For the above case, using

    $: jfdi tomorrow

will output:

    ### Upcoming JFDI Stuff ###

    0 buy milk.

### Moving a Goal Back to Today's Queue

Use `jfdi -e <id>`.

For the above **tomorrow** queue, using

    $: jfdi -e 0

will output:

    ### JFDI List For Today ###

    0 buy milk.
    1 learn kung-fu
    2 Save the cheerleader, save the world.

You can see that "buy milk" goal has been moved to the top of your tomorrow's
queue.

### Marking a Goal as Done

It's as easy as `jfdi <id>`.

For the above example, using

    $: jfdi 1

will output

    ### JFDI List For Today ###

    0 buy milk.
    1 Save the cheerleader, save the world.

Now you know kung fu!

### Searching for Goals

* Use `jfdi -f <phrase>` for today's goals.
* Use `jfdi -f <phrase> tomorrow` for tomorrow's goals.

For the above example

    $: jfdi -f milk

or

    $: jfdi -f "milk"

will output:

    ### "milk" for Today ###

    0 buy milk.

And

    $: jfdi -f ponies tomorrow

will output:

    ### "ponies" for Tomorrow ###

    0 find ponies and rainbows

(*given that there exists such a goal in your tomorrow's queue*)

...

That's a basic summary of what you can do with **JFDI**. There are many
aliases to the above commands, so, for example, instead of using `jfdi -e <id>`
you can use `jfdi --expedite <id>`, too. Type `jfdi --help` for more information
on the available commands that you can use.

### Things to Be Implemented

* Listing "done" Goals
* Undoing a "done" Goal
* Prioritizing Goals
* Automatic goal carry over from tomorrow.txt to today.txt at midnight.
* [file an issue if you want more stuff](https://github.com/v0lkan/JFDI/issues/new)

### Other Links

* You can also read
[this o2js.com blog post](http://o2js.com/jfdi-a-hackers-way-to-get-stuff-done) for usage examples, and installation details.

--------------------------------------------------------------------------------

**Below is highly draft:**



### Contribute

This program in its very early development.

Feel free to contribute.

### Other

versioning:

//TODO: this might need to be rephrased a little

//TODO: look at semantic versioning document, and make the terminology more consistent, and link the document here too.

The versions of the program are in the form main.major.minor.

Each minor version change means that there is no obvious functionality difference

Each major version change means a bugfix or an addition of functionality.

Each main version change is a point in time that we can consider the product mature enough.

There will not be breaking changes in minor versions, however there might be usage differences

and breaking changes between main version.
