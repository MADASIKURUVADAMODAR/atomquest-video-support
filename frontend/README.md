# AtomQuest Video Support Platform

## Problem Statement

Customer support teams often struggle to resolve issues through voice calls alone. Customers need a simple way to share visual information and communicate with support agents in real time.

## Solution

AtomQuest Video Support Platform enables support agents to create support sessions and invite customers through a secure session link.

## Features

### Session Management

* Create unique support sessions
* Join via invite link
* End session functionality
* Session history tracking

### Real-Time Communication

* Real-time chat using Socket.IO
* Participant count tracking
* Instant message delivery

### Video Support

* Browser webcam access
* Audio and video permission handling
* No application installation required

### Session History

* Session creation timestamp
* Queryable history endpoint
* Session tracking

## Technology Stack

Frontend:

* React
* React Router
* Axios

Backend:

* Node.js
* Express.js
* Socket.IO

Communication:

* WebSockets

## Architecture

Agent Browser
↕
React Frontend
↕
Socket.IO
↕
Node.js + Express Backend
↕
Session Store

Customer Browser

## Future Enhancements

* Server-routed media using Mediasoup SFU
* File sharing
* Call recording
* Admin dashboard
* Monitoring and observability

## How To Run

Backend:

npm install
node server.js

Frontend:

npm install
npm run dev

Open:

http://localhost:5173
