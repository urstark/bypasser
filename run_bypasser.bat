@echo off
title StudyStark Bypasser
if not exist node_modules (
    echo [System] First time setup detected. Installing dependencies...
    npm install
    echo [System] Setup complete!
    echo.
)
node bypasser.js
pause
