@echo off
rem ==============================================================================
rem DNS Exit Dynamic IP Updater for yokBangun (yokbangun.work.gd)
rem Target IP: 111.94.7.240
rem ==============================================================================

set API_KEY=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo
set HOST=yokbangun.work.gd
set TARGET_IP=111.94.7.240

echo [%date% %time%] Updating DNS Exit record for %HOST% to %TARGET_IP%...
curl.exe -s "https://api.dnsexit.com/dns/ud/?apikey=%API_KEY%" -d "host=%HOST%" -d "myip=%TARGET_IP%"
echo.
echo DNS update executed.
