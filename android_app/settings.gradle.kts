pluginManagement {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") } // 🔱 TOHLE PŘIDEJ
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") } // CORRECTED SYNTAX
    }
}
rootProject.name = "NearAura"
include(":app") // CORRECTED SYNTAX