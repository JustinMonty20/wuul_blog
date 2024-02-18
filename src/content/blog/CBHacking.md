---
title: Chromebook Hacking
date: 2/17/24
category: 
tags: 
  - Linux
  - ChromeOS
isDraft: false 
description: Long live Mrchomebox.tech and chromebook_kid !
tldr: Installing Linux distros on a Chromebook with ChromeOS is way harder than it should be. 
seoKeywords:
 - one
slug: chromebook-hacking
---
## Chromebook Hacking

I was back home at my parents one weekend in January and my dad had cleaned out his closet *(which used to be my old closet)*. He found a whole bunch of my old laptops. Four out of the five were massive pieces of junk all from Toshbia. **Do they even make laptops anymore?**

Anyway the only one that was semi-modern and salvagable was my old Chromebook which was the laptop I started "programming" on. Really just struggling through Codeacademy. When I first started programming I realized that ChromeOS was really locked down. I didn't know how to bypass all the restrictions they come with out of the box so when I tried to get more control over my development environment I just went and got a Macbook instead. FF 6 years and since I think I'm a little more advanced now and I began to dabble in using different flavors of Linux, I figured I could turn that Chromebook into a portable Linux machine to tinker with. How hard could it be?

This is going to be a short post that just details what I needed to do in order to remove ChromeOS from the machine. I might do a separate post on installing Arch but there is a whole ass installation guide that I essentially just followed and then debugged my way through so I don't think I'll do one on that. 

### Day 1 

I arrive home full of glee. Thinking that I'll just quickly be able to burn an ISO, remove ChromeOS and start tinkering. I was going to roll Ubuntu w/ Cinnamon but I realized that was going to take up more memory than I really had available in machine so I figured I'd install Arch from scratch so I could use the meme and I read that it was small and was bare-bones

Gotta find the name of your USB stick so you can write to first. I just used this command to list out all the block devices using the command below. blockdevices are just things that transfer a group of bytes at a time. Like your HDD, SSD, or your USB stick 
```bash
lsblk
```

I burn the ISO onto a USB stick using the [dd](https://ss64.com/bash/dd.html) core utility. If you don't wanna read that link its a utility whose primary pupose is to copy and file and then optionally convert it during the copy process.

```bash
dd bs=4M if=/home/root/Download/someiso.iso of=/dev/dist/sda conv=fsync oflag=direct status=progress
```
+ **bs** -> Block size, both rw number of bytes at a time. 
+ **if** -> Input file
+ **of** -> Output file
+ **conv** -> Conversion format. Arch Linux doc had fsync; but the dd man page doesn't saying about fsync. 
+ **oflag** -> 'direct' because we don't want to add anything extra to output data
+ **status** -> Shows the status of the data transfer. Without this you won't see anything.

After I burned the ISO file. I went into research mode figuring out how I could wipe this Chromebook when I came across our first hero: [MrChromebox.tech](https://mrchromebox.tech/#fwscript). This stud is someone who knows all about rolling different OS' on Chromebooks and is a centralized location on all helpful items needed to do whatever is you want with your Chromebox.

From there I was able to figure out how to boot into [developer mode](https://mrchromebox.tech/#devmode). Which is the first step needed since the regularboot mode will lock you out of the shell that we need. I'm not going to go into firmware too heavily but if you are interested there is a cool section [All About Firmware](https://mrchromebox.tech/#firmware) that talks about the firmware used to create ChromeOS. 

After booting into developer mode there are two ways to get a root capable shell: 

1. CTRL - ALT - F2 (Right Arrow on ChromeOS keyboards). Then you can login with the user 'chronos'
2. CTRL - ALT - T (but only with a browser window open). Then type ```shell``` and press Enter

At this point you can do whatever it is you came here to do. For me I was going to flash the firmware which would remove ChromeOS and make the machine like any regular run of the mill laptop. 

Again Mrchomebox is a legend. He has an easy Firmware Utility Script that is able to do just what I needed.
