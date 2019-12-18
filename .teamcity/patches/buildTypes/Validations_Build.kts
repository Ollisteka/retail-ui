package patches.buildTypes

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.CommitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.PullRequests
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.pullRequests
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.swabra
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.vcs
import jetbrains.buildServer.configs.kotlin.v2018_2.ui.*

/*
This patch script was generated by TeamCity on settings change in UI.
To apply the patch, change the buildType with id = 'Validations_Build'
accordingly, and delete the patch script.
*/
changeBuildType(RelativeId("Validations_Build")) {
    triggers {
        remove {
            vcs {
                branchFilter = "+:pull/*"
            }
        }
    }

    features {
        remove {
            swabra {
                forceCleanCheckout = true
            }
        }
        remove {
            pullRequests {
                provider = github {
                    authType = token {
                        token = "credentialsJSON:37119025-2749-4abf-8ed8-ff4221b59d50"
                    }
                    filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
                }
            }
        }
        val feature1 = find<CommitStatusPublisher> {
            commitStatusPublisher {
                publisher = github {
                    githubUrl = "https://api.github.com"
                    authType = personalToken {
                        token = "credentialsJSON:37119025-2749-4abf-8ed8-ff4221b59d50"
                    }
                }
                param("github_oauth_user", "wKich")
            }
        }
        feature1.apply {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:2e60a13b-65b3-4f80-b342-2cb770ad7a7d"
                }
            }
            param("github_oauth_user", "")
        }
    }
}
