#!/bin/bash
export JAVA_HOME=/nix/store/j29aw4vdyzglbwbx7gv3bb4nn6zxwwls-openjdk-17.0.17+10/lib/openjdk
# export ANDROID_HOME=/home/user/android-sdk-custom
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

echo "--- Clearing Potential Cache Conflicts ---"
# find $HOME/.gradle/caches/ -name "*card-stack-view*" -exec rm -rf {} +

echo "--- Validating SDK Licenses ---"
yes | # # sdkmanager --licenses > /dev/null

echo "--- Initializing Orchard Build ---"
cd NearAura_Complete/NearAura_Complete/NearAura
./gradlew --no-daemon -Dorg.gradle.daemon=false clean :app:assembleRelease --refresh-dependencies
