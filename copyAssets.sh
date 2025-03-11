#!/usr/bin/env bash
rm -f ./src/main/webapp/assetPacks/desktop/sounds/*.*;
rm -f ./src/main/webapp/assetPacks/mobile/sounds/*.*;
rm -f ./src/main/webapp/assetPacks/tablet/sounds/*.*;

rm -f ./src/main/webapp/assetPacks/desktop/splash/*.*;
rm -f ./src/main/webapp/assetPacks/mobile/splash/*.*;
rm -f ./src/main/webapp/assetPacks/tablet/splash/*.*;

rm -f ./src/main/webapp/assetPacks/desktop/spine/*.*;
rm -f ./src/main/webapp/assetPacks/mobile/spine/*.*;
rm -f ./src/main/webapp/assetPacks/tablet/spine/*.*;

rm -f ./src/main/webapp/assetPacks/desktop/fonts/*.*;
rm -f ./src/main/webapp/assetPacks/mobile/fonts/*.*;
rm -f ./src/main/webapp/assetPacks/tablet/fonts/*.*;

cp -f ./src/audio/*.json ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.ogg ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.m4a ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.mp3 ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.json ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.ogg ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.m4a ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.mp3 ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.json ./src/main/webapp/assetPacks/tablet/sounds;
cp -f ./src/audio/*.ogg ./src/main/webapp/assetPacks/tablet/sounds;
cp -f ./src/audio/*.m4a ./src/main/webapp/assetPacks/tablet/sounds;
cp -f ./src/audio/*.mp3 ./src/main/webapp/assetPacks/tablet/sounds;

cp -f ./src/main/webapp/assetPacks/mobile/sounds/*.*;
cp -f ./src/main/webapp/assetPacks/tablet/sounds/*.*;


cp -f ./src/art/LoaderTitleLandscape.png ./src/main/webapp/assetPacks/desktop/splash/LoaderTitleLandscape.png;
cp -f ./src/art/LoaderTitleLandscape.png ./src/main/webapp/assetPacks/mobile/splash/LoaderTitleLandscape.png;
cp -f ./src/art/LoaderTitleLandscape.png ./src/main/webapp/assetPacks/tablet/splash/LoaderTitleLandscape.png;

cp -f ./src/art/LoaderTitlePortrait.png ./src/main/webapp/assetPacks/desktop/splash/LoaderTitlePortrait.png;
cp -f ./src/art/LoaderTitlePortrait.png ./src/main/webapp/assetPacks/mobile/splash/LoaderTitlePortrait.png;
cp -f ./src/art/LoaderTitlePortrait.png ./src/main/webapp/assetPacks/tablet/splash/LoaderTitlePortrait.png;

cp -f ./src/art/flaxLogo.png ./src/main/webapp/assetPacks/desktop/splash/flaxLogo.png;
cp -f ./src/art/flaxLogo.png ./src/main/webapp/assetPacks/mobile/splash/flaxLogo.png;
cp -f ./src/art/flaxLogo.png ./src/main/webapp/assetPacks/tablet/splash/flaxLogo.png;


cp -f ./src/art/spine/*.* ./src/main/webapp/assetPacks/desktop/spine;
cp -f ./src/art/spine/*.* ./src/main/webapp/assetPacks/mobile/spine;
cp -f ./src/art/spine/*.* ./src/main/webapp/assetPacks/tablet/spine;

cp -f ./src/art/fonts/*.* ./src/main/webapp/assetPacks/desktop/fonts;
cp -f ./src/art/fonts/*.* ./src/main/webapp/assetPacks/mobile/fonts;
cp -f ./src/art/fonts/*.* ./src/main/webapp/assetPacks/tablet/fonts;

# #uncomment to OVERWRITE all locale configs and game.jsons
# for x in src/main/webapp/i18n/*/**;
# do
#     if [[ $x != src/main/webapp/i18n/default/default ]]; 
#     then
#         while true;
#         do
#             read -p "overwrite $x/config.json?" yn
#             case $yn in
#                 [Yy]* ) cp src/main/webapp/i18n/default/default/config.json $x/config.json; break;;
#                 [Nn]* ) break;;
#                 [Cc]* ) exit;;
#                 * ) echo "Please answer yes, no, or cancel.";;
#             esac
#         done
#         while true;
#         do
#             read -p "overwrite $x/game.json?" yn
#             case $yn in
#                 [Yy]* ) cp src/main/webapp/i18n/default/default/game.json $x/game.json; break;;
#                 [Nn]* ) break;;
#                 [Cc]* ) exit;;
#                 * ) echo "Please answer yes, no, or cancel.";;
#             esac
#         done
#         while true;
#         do
#             read -p "overwrite $x/splash.json?" yn
#             case $yn in
#                 [Yy]* ) cp src/main/webapp/i18n/default/default/splash.json $x/splash.json; break;;
#                 [Nn]* ) break;;
#                 [Cc]* ) exit;;
#                 * ) echo "Please answer yes, no, or cancel.";;
#             esac
#         done
#     fi
# done