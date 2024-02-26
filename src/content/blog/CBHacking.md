---
title: Chromebook Hacking
date: 2/25/24
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

I was back home at my parent's one weekend in January and my dad had cleaned out his closet *(which used to be my old closet)*. He found a whole bunch of my old laptops. Four out of the five were massive pieces of junk all from Toshiba. **Do they even make laptops anymore?**

Anyway, the only one that was semi-modern and salvageable was my old Chromebook which was the laptop I started "programming" on. Just struggling through Code Academy. When I first started programming I realized that ChromeOS was locked down. I didn't know how to bypass all the restrictions they come with out of the box so when I tried to get more control over my development environment I just went and got aMacbook instead. FF 6 years and since I think I'm a little more advanced now and I began to dabble in using different flavors of Linux, I figured I could turn that Chromebook into a portable Linux machine to tinker with. How hard could it be?

This is going to be a short post that just details what I needed to do to remove ChromeOS from the machine. I might do a separate post on installing Arch but there is a whole-ass installation guide that I essentially just followed and then debugged my way through so I don't think I'll do one on that.  

### Day 1 

I arrive home full of glee. Thinking that I'll just quickly be able to burn an ISO, remove ChromeOS, and start tinkering. I was going to roll Ubuntu Cinnamon but I realized that was going to take up more memory than I had available in the machine so I figured I'd install Arch from scratch so I could use the meme and I read that the footprint was small to start but could be fully customized. 

Gotta find the name of your USB stick so you can write to it first. I just used this command to list out all the block devices attached to my machine. Block devices are just things that transfer a group of bytes at a time. Like your HDD, SSD, or your USB stick. 
```bash
lsblk
```

I burn the ISO onto a USB stick using the [dd](https://ss64.com/bash/dd.html) core utility. If you don't wanna read that link it's a utility whose primary purpose is to copy a file and then optionally convert it during the copy process.

```bash
dd bs=4M if=/home/root/Download/someiso.iso of=/dev/dist/sda conv=fsync oflag=direct status=progress
```
+ **bs** -> Block size, both rw number of bytes at a time. 
+ **if** -> Input file
+ **of** -> Output file
+ **conv** -> Conversion format. Arch Linux doc had fsync, but the dd man page doesn't say anything about fsync. 
+ **oflag** -> 'direct' because we don't want to add anything extra to output data
+ **status** -> Shows the status of the data transfer. Without this, you won't see anything.

After I burned the ISO file. I went into research mode figuring out how I could wipe this Chromebook when I came across our first hero: [MrChromebox.tech](https://mrchromebox.tech/#home). This stud knows all about rolling different OS' on Chromebooks and created a centralized location for all the resources you'll need to mess around with your Chromebook. 

From there I was able to figure out how to boot into [developer mode](https://mrchromebox.tech/#devmode). This is the first step needed since the regular boot mode will lock you out of the shell that we need. I'm not going to go into firmware too heavily but if you are interested there is a cool section [All About Firmware](https://mrchromebox.tech/#firmware) that talks about the firmware used to create ChromeOS. 

After booting into developer mode there are two ways to get a root-capable shell: 

1. CTRL - ALT - F2 (Right Arrow on ChromeOS keyboards). Then you can login with the user 'chronos'
2. CTRL - ALT - T (but only with a browser window open). Then type ```shell``` and press Enter

At this point you can do whatever it is you came here to do. For me, I was going to flash the firmware which would remove ChromeOS and make the machine like any regular run-of-the-mill laptop. 

How does one do that you ask? Beats me lol. However, Mrchromebox swoops in again with a [Firmware utility script](https://mrchromebox.tech/#fwscript). This script simplifies the common functions most users need when interfacing with the firmware on a ChromeOS device. To run the script here was the command from the docs and for my machine, I needed to run the script from #1 above since there they parched begin able to run it from the crosh shell which is option #2 above. It was late at night and I was ready to keep this moving so I followed the command in the ```chronos``` shell.

```bash
cd; curl -LO mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh
```

I didn't encounter any issues with the script and I landed here after executing the command in my elevated terminal. ![Screenshot of the executed MrchromeboxFirmware Utility Script](../../../public/blog-images/fmware-script.png)

I was going for **2)** in the screenshot. I wanted to do a full replacement of the firmware and then boot directly into UEFI mode which would make my PC "regular" which means no more ChromeOS. Sweet right? 

EXCEPT when I tried to select the second option I was getting error messages telling me that WP was enabled still and that I needed to disable it before I could fully update the firmware. 

Naturally, I started googling and then found I could disable the WP *most likely* in one of two ways. Either crack open this bad boy and mess with the battery or if my model supported it I could do something called CCD (Closed Case Debugging). 

It was already running later and I did not feel like splitting this mfer open so I looked more into CCD. Using yet another Mrchomebox link I found my model here under [Supported Devices](https://mrchromebox.tech/#devices): *SNAPPY*, so an HP Chromebook. The WP or Write Protect method is confirmed on my batter. Clicking on the CR50 link on that page brought me to the Mrchromebox wiki that dives into [how firmware write protect works](https://wiki.mrchromebox.tech/Firmware_Write_Protect#Hardware_Write_Protection). 

Coming to the bottom of this guide I saw that I needed a special cable called a Suzy Q cable. When I googled it, looked exactly like a regular USB-A-> USB connector. I figured I'd give it a go with a regular cable that I used to charge my keyboard; no luck and I wasted about 20 mins trying that twice before I the ole dusty Google trail and found a Reddit post saying that even though it looked exactly like a run of the mill USB A -> USB C connector, the pins underneath the USB C port were different and on top of that you couldn't buy them online from the usually Suzy Q plug since they stopped making them for whatever reason. Bummer. I shut off my office machine and headed to my kitchen for some buttered Biscoff toast as I was mulling over my options:

+ Roll my own Cable? 
  + Someone posted the schematics but I had no idea where tf to start with that and it would be a huge timesuck
+ Let it collect dust in my office forever. 

### Day 2

In comes the next hero of our story which is: [chromebook_kid](https://ebay.com/usr/chromebook_kid). Remember when I said we needed a special cable that seemed to be discontinued in order to disable the Write Protect on my Chromebook? If I didn't want to pop open the Chromebook. This person in California makes a USB-C connector that will take any USB-C head and make it the correct wiring we need in order to do the closed-cased debugging. I ordered [GSC DebugBoard](https://ebay.com/itm/335130747039?var=544363912166) without a cable and blazingly fast it was packaged and shipped to me for a reasonable price. I think it was 15 USD after shipping. My debug board was arriving in about 2 weeks and I was buzzing to get my hands on it.

### Day 14ish ? 

Around two weeks later I got my debug board and after I finished up my workday I was read to get back onto MrChromebox and disabled the WP so I could run the firmware util script again. I can't recommend the chromebook_kid enough. If you stumbled upon the post trying to do the same thing check out the links in the paragraph above and support him.

Starting from scratch now, here is what I needed to do in order

1. Enable Developer Mode (to get my admin shell)
2. Changing the CCD state from 'closed' to 'open' to allow for modifications
3. Turn off the WP (Write Protect) so I can run the MrChromebox firmware utility script.

I won't be going back over the Developer mode bit since we already talked and I linked to that above, so we'll start at number 2. All of these steps I followed from this [link](https://wiki.mrchromebox.tech/Firmware_Write_Protect), just documenting them quickly here as well.

#### Open CCD state 

+ Open the admin shell called 'crosh' using CTRL - ALT - T
+ Check the CCD state. Should be closed
```bash 
sudo gsctool -a -I
```
+ Set the CCD state to open:
```bash
sudo gsctool -a -o
```
+ At this point just follow the prompt on the screen to keep mashing the power button over the next couple of minutes you will keep doing that until the device reboots and then it will exit Developer Mode so you'll need to hop right back in.

#### Disable WP 
Bring out the Cable with our connector acquired from chromebook_kid. USB-C with the connector should be plugged into the left rear port, because that is usually the debug port. The USB-A end can be plugged into any open port. 

+ Verify the cable connection. Should return 3 items. ttyUSB0, ttyUSB1, and ttyUSB2. If not then double-check where the USB-C connector is plugged in and make sure it's not upside down.
```bash
ls /dev/ttyUSB*
```
+ Get a root shell w/ ```sudo bash```
+ Disable the hardware write protect 
```bash
echo "wp false" > /dev/ttyUSB0

echo "wp false atboot" > /dev/ttyUSB0
```
+ Enable all CCD functionality
```bash
echo "ccd reset factory" > /dev/ttyUSB0
```
+ Verify the changes
```bash
gsctool -a -I
```
CCD state should now be open, and the current value for all CCD flags should be set to Y/Always

At this point, we are done and let MrChromebox take us home with his Firmware Utility Script that we talked about above. Now the #2 option on that script won't be disabled and we can flash the firmware to make our laptop just a regular machine so we can do whatever we want with it. For me it was to install Arch so I could take the cool cli picture to send to my friends and then visit the FOSS site to buy an 'I use arch btw shirt' 

If you made it this far. Thanks for reading the post. See ya.