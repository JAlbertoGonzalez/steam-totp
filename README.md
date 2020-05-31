﻿# Steam TOTP

## What is TOTP?

TOTP stands for Time-based One-Time Password, a multifactor security algorithm to generate unique passwords based on time.

## What is Steam TOTP

Steam Store uses this two-factor method to ensure security when an user authenticates in a new device, or a new order is made in the Store.

Steam uses his own algorithm to generate the codes and must be enabled by the user.

The secret code and the algorithm doesn't follow the standar conventions of a two-factor authenticator, so you cannot store your code into common apps as Google Authenticator or Authy. Instead, Steam enforces you to download and configure his own mobile app, the "Steam Guard".

## How to use

You need your secret key in order to generate TOTP codes. You can configure the Steam app into a rooted Android and get the password exporting the file located at:

/data/data/com.valvesoftware.android.steam.community/f/Steamguard-STEAMID64

Once you have your secret key, you can use this script to get the codes

## Installation

### Prerequisites

Type node --version in console to ensure.

## Installation

Download or clone this repository.

Open the command line.

Place yourself to the root folder of the project.

Type: npm install

Type: npm link

## Usage

steam-totp [enter-your-secret-code]
