import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.24"
    id("java-gradle-plugin")
    kotlin("plugin.serialization") version "1.9.10"
}

repositories {
    mavenCentral()
}

gradlePlugin {
    plugins {
        create("reactSettingsPlugin") {
            id = "com.facebook.react.settings"
            implementationClass = "expo.plugins.ReactSettingsPlugin"
        }
    }
}
