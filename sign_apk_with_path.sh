#!/bin/bash
export JAVA_HOME=/nix/store/j29aw4vdyzglbwbx7gv3bb4nn6zxwwls-openjdk-17.0.17+10/lib/openjdk
export PATH=$JAVA_HOME/bin:$PATH
~/.android/sdk/build-tools/34.0.0/apksigner sign --ks NearAura_Complete/NearAura/app/keystore.jks --out app-release-signed.apk NearAura_Complete/NearAura/app/build/outputs/apk/release/app-release-unsigned.apk